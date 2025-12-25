import hashlib
import hmac
import os
from typing import Any, Dict, Optional

import httpx
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
    allow_methods=["*"],
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
async def get_me(request: Request):
    telegram = request.session.get("telegram")

    if not telegram:
        raise HTTPException(status_code=401, detail="Требуется авторизация")

    telegram_id = str(telegram["id"])

    try:
        user = await X3Web().get_user(telegram_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "telegram": telegram,
        "subscription": {
            "blocked": user["status"] != "ACTIVE",
            "deleted": user["subRevokedAt"] is not None,
            "is_tarif": True,
            "type": "lte",
            "end_date": user["expireAt"].replace("T", " ").replace("Z", ""),
        },
        "connection": {
            "url": user.get("subscriptionUrl"),
            "short_id": user.get("shortUuid"),
        },
        "payments": [],
    }


@app.get("/api/devices")
async def get_devices(request: Request) -> Dict[str, Any]:
    telegram_id = request.session.get("telegram_id")
    if not telegram_id:
        raise HTTPException(status_code=401, detail="Требуется авторизация")

    x3 = X3Web()
    user = await x3.get_user(str(telegram_id))
    user_id = user["id"]

    async with httpx.AsyncClient(timeout=20) as client:
        r = await client.get(
            f"{x3.base.rstrip('/')}/api/users/{user_id}/devices",
            headers=x3.headers,
        )
        r.raise_for_status()
        devices = r.json()

    return {"devices": devices}


@app.delete("/api/devices/{hwid}")
async def delete_device(hwid: str, request: Request) -> Dict[str, Any]:
    telegram_id = request.session.get("telegram_id")
    if not telegram_id:
        raise HTTPException(status_code=401, detail="Требуется авторизация")

    x3 = X3Web()
    user = await x3.get_user(str(telegram_id))
    user_id = user["id"]

    async with httpx.AsyncClient(timeout=20) as client:
        r = await client.delete(
            f"{x3.base.rstrip('/')}/api/users/{user_id}/devices/{hwid}",
            headers=x3.headers,
        )
        r.raise_for_status()
        devices = r.json()

    return {"devices": devices}
