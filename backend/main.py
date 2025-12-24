import asyncio
import hashlib
import hmac
import os
import sqlite3
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware

from X3 import X3


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

    return {"ok": True}


@app.post("/api/auth/logout")
async def logout(request: Request) -> Dict[str, bool]:
    request.session.clear()
    return {"ok": True}


@app.get("/api/me")
async def get_me(request: Request) -> Dict[str, Any]:
    session = require_session(request)
    telegram_id = session.id

    link = await X3().link(str(telegram_id))
    short_uuid = None
    if link:
        short_uuid = link.rstrip("/").split("/")[-1]

    user_row = await fetch_sqlite_row(
        """
        SELECT Ref, Is_delete, Is_block, Is_tarif, subscription_end_date,
               subscription_type, device_limit_expires_at, auto_payment_enabled
        FROM users
        WHERE User_id = ?
        """,
        (telegram_id,),
    )

    if user_row is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    is_block = bool(user_row.get("Is_block"))
    is_delete = bool(user_row.get("Is_delete"))

    if is_block or is_delete:
        raise HTTPException(
            status_code=403,
            detail="Доступ ограничен: аккаунт заблокирован или удалён",
        )

    payment_rows = await fetch_sqlite_rows(
        """
        SELECT amount, status, created_at, processed_at, duration, device_count,
               subscription_type, payment_id
        FROM payments
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 100
        """,
        (telegram_id,),
    )

    return {
        "telegram": session.model_dump(),
        "connection": {
            "url": link,
            "short_id": short_uuid,
        },
        "subscription": {
            "blocked": is_block,
            "deleted": is_delete,
            "is_tarif": bool(user_row.get("Is_tarif")),
            "end_date": user_row.get("subscription_end_date"),
            "type": user_row.get("subscription_type"),
            "device_limit_expires_at": user_row.get("device_limit_expires_at"),
            "auto_payment_enabled": bool(user_row.get("auto_payment_enabled")),
        },
        "payments": payment_rows,
    }


@app.get("/api/devices")
async def get_devices(request: Request) -> Dict[str, Any]:
    session = require_session(request)
    devices = await X3().devices(str(session.id))
    return {"devices": devices}


@app.delete("/api/devices/{hwid}")
async def delete_device(hwid: str, request: Request) -> Dict[str, Any]:
    session = require_session(request)
    await X3().delete_device(str(session.id), hwid)
    devices = await X3().devices(str(session.id))
    return {"devices": devices}
