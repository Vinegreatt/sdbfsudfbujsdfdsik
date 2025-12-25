import os
import httpx

REMNAWAVE_BASE_URL = os.getenv("REMNAWAVE_BASE_URL", "").rstrip("/")
REMNAWAVE_TOKEN = os.getenv("REMNAWAVE_TOKEN", "")


class X3Web:
    def __init__(self):
        if not REMNAWAVE_BASE_URL:
            raise RuntimeError("REMNAWAVE_BASE_URL is not set")
        if not REMNAWAVE_TOKEN:
            raise RuntimeError("REMNAWAVE_TOKEN is not set")

    def _headers(self):
        return {"Authorization": f"Bearer {REMNAWAVE_TOKEN}"}

    async def get_user_by_username(self, telegram_id: str) -> dict | None:
        """
        В Remnawave username == telegram_id (строка).
        Возвращает dict из поля response или None если 404.
        """
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.get(
                f"{REMNAWAVE_BASE_URL}/api/users/by-username/{telegram_id}",
                headers=self._headers(),
            )
            if r.status_code == 404:
                return None
            r.raise_for_status()
            data = r.json()
            return data.get("response") or data

    async def devices_by_user_id(self, user_id: int) -> dict:
        """
        Предпочтительно работать через numeric id из Remnawave (у вас id=7000).
        Если эндпоинт отличается — поправим по 404 из логов.
        """
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.get(
                f"{REMNAWAVE_BASE_URL}/api/users/{user_id}/devices",
                headers=self._headers(),
            )
            r.raise_for_status()
            return r.json()

    async def delete_device_by_user_id(self, user_id: int, hwid: str) -> dict:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.delete(
                f"{REMNAWAVE_BASE_URL}/api/users/{user_id}/devices/{hwid}",
                headers=self._headers(),
            )
            r.raise_for_status()
            return r.json()
