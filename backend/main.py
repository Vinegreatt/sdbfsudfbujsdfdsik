import asyncio
import hashlib
import hmac
import os
import sqlite3
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware

from x3_web import X3Web


def _env(name: str, default: Optional[str] = None) -> str:
    value = os.getenv(name, default)
    if value is None:
        raise RuntimeError(f"Missing required env var: {name}")
    return value


SQLITE_DB_PATH = _env("SQLITE_DB_PATH", "/home/bot/sqlite3.db")
TELEGRAM_BOT_TOKEN = _env("TELEGRAM_BOT_TOKEN")
SESSION_SECRET = _env("JWT_SECRET")
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"


class TelegramAuthPayload(BaseModel):
    id: int
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    photo_url: Optional[str] = None
    auth_date: int
    hash: str


class TelegramSession(BaseModel):
    id: int
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    photo_url: Optional[str] = None


app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key=SESSION_SECRET,
    same_site="lax",
    https_only=COOKIE_SECURE,
    session_cookie="rvpn_session",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"],
)


def verify_telegram_payload(payload: TelegramAuthPayload) -> bool:
    data = payload.model_dump(exclude={"hash"}, exclude_none=True)
    data_check_string = "\n".join(
        f"{key}={value}" for key, value in sorted(data.items())
    )
    secret_key = hashlib.sha256(TELEGRAM_BOT_TOKEN.encode()).digest()
    calculated_hash = hmac.new(
        secret_key,
        data_check_string.encode(),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(calculated_hash, payload.hash)


async def fetch_sqlite_row(query: str, params: tuple) -> Optional[Dict[str, Any]]:
    def _query() -> Optional[Dict[str, Any]]:
        connection = sqlite3.connect(SQLITE_DB_PATH)
        connection.row_factory = sqlite3.Row
        try:
            cursor = connection.execute(query, params)
            row = cursor.fetchone()
            return dict(row) if row else None
        finally:
            connection.close()

    return await asyncio.to_thread(_query)


async def fetch_sqlite_rows(query: str, params: tuple) -> List[Dict[str, Any]]:
    def _query() -> List[Dict[str, Any]]:
        connection = sqlite3.connect(SQLITE_DB_PATH)
        connection.row_factory = sqlite3.Row
        try:
            cursor = connection.execute(query, params)
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        finally:
            connection.close()

    return await asyncio.to_thread(_query)


def require_session(request: Request) -> TelegramSession:
    telegram = request.session.get("telegram")
    if not telegram:
        raise HTTPException(status_code=401, detail="Требуется авторизация")
    return TelegramSession(**telegram)


def _parse_iso_z(dt_str: str | None) -> datetime | None:
    if not dt_str:
        return None
    return datetime.fromisoformat(dt_str.replace("Z", "+00:00"))


def _days_left(expire_at: datetime | None) -> int | None:
    if not expire_at:
        return None
    now = datetime.now(timezone.utc)
    delta = expire_at - now
    return max(0, int(delta.total_seconds() // 86400))


def _detect_plan(user: dict) -> str | None:
    ext = user.get("externalSquadUuid")
    trial_lte = os.getenv("TRIAL_LTE_EXTERNAL_SQUAD")
    trial_wifi = os.getenv("TRIAL_WIFI_EXTERNAL_SQUAD")
    paid_lte = os.getenv("PAID_LTE_EXTERNAL_SQUAD")
    paid_wifi = os.getenv("PAID_WIFI_EXTERNAL_SQUAD")

    if ext and trial_lte and ext == trial_lte:
        return "lte"
    if ext and paid_lte and ext == paid_lte:
        return "lte"
    if ext and trial_wifi and ext == trial_wifi:
        return "wifi"
    if ext and paid_wifi and ext == paid_wifi:
        return "wifi"
    return None


@app.post("/api/auth/telegram/callback")
async def telegram_callback(payload: TelegramAuthPayload, request: Request) -> Dict[str, bool]:
    if not verify_telegram_payload(payload):
        raise HTTPException(status_code=401, detail="Некорректная подпись Telegram")

    request.session["telegram"] = {
        "id": payload.id,
        "username": payload.username,
        "first_name": payload.first_name,
        "last_name": payload.last_name,
        "photo_url": payload.photo_url,
    }
    request.session["telegram_id"] = payload.id

    return {"ok": True}


@app.post("/api/auth/logout")
async def logout(request: Request) -> Dict[str, bool]:
    request.session.clear()
    return {"ok": True}


@app.get("/api/me")
async def get_me(request: Request) -> Dict[str, Any]:
    telegram_id = request.session.get("telegram_id")
    if not telegram_id:
        raise HTTPException(status_code=401, detail="Требуется авторизация")

    user = await X3Web().get_user_by_username(str(telegram_id))
    if not user:
        raise HTTPException(
            status_code=403,
            detail="Подписка не найдена, обратитесь в поддержку",
        )

    status = (user.get("status") or "").upper()
    revoked_at = user.get("subRevokedAt")
    if status not in ("ACTIVE",) or revoked_at:
        raise HTTPException(status_code=403, detail="Подписка не активна")

    expire_at = _parse_iso_z(user.get("expireAt"))
    plan = _detect_plan(user)

    limit_bytes = user.get("trafficLimitBytes")
    used_bytes = (user.get("userTraffic") or {}).get("usedTrafficBytes")

    return {
        "telegram_id": telegram_id,
        "username": user.get("username"),
        "status": status,
        "plan": plan,
        "expire_at": user.get("expireAt"),
        "days_left": _days_left(expire_at),
        "device_limit": user.get("hwidDeviceLimit"),
        "subscription_link": user.get("subscriptionUrl")
        or (
            f"https://subscription.realityvpn.ru/{user.get('shortUuid')}"
            if user.get("shortUuid")
            else None
        ),
        "traffic_limit_bytes": limit_bytes,
        "traffic_used_bytes": used_bytes,
        "internal_squads": user.get("activeInternalSquads") or [],
    }


@app.get("/api/devices")
async def get_devices(request: Request) -> Dict[str, Any]:
    telegram_id = request.session.get("telegram_id")
    if not telegram_id:
        raise HTTPException(status_code=401, detail="Требуется авторизация")

    user = await X3Web().get_user_by_username(str(telegram_id))
    if not user:
        raise HTTPException(
            status_code=403,
            detail="Подписка не найдена, обратитесь в поддержку",
        )
    devices = await X3Web().devices_by_user_id(int(user["id"]))
    return {"devices": devices}


@app.delete("/api/devices/{hwid}")
async def delete_device(hwid: str, request: Request) -> Dict[str, Any]:
    telegram_id = request.session.get("telegram_id")
    if not telegram_id:
        raise HTTPException(status_code=401, detail="Требуется авторизация")

    user = await X3Web().get_user_by_username(str(telegram_id))
    if not user:
        raise HTTPException(
            status_code=403,
            detail="Подписка не найдена, обратитесь в поддержку",
        )
    await X3Web().delete_device_by_user_id(int(user["id"]), hwid)
    devices = await X3Web().devices_by_user_id(int(user["id"]))
    return {"devices": devices}
