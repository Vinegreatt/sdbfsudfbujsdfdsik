import os
import httpx

REMNAWAVE_BASE_URL = os.getenv("REMNAWAVE_BASE_URL", "").rstrip("/")
REMNAWAVE_TOKEN = os.getenv("REMNAWAVE_TOKEN", "")
SUB_BASE_URL = os.getenv(
    "REMNAWAVE_SUBSCRIPTION_BASE_URL",
    "https://subscription.realityvpn.ru",
).rstrip("/")


class X3Web:
    def __init__(self):
        if not REMNAWAVE_BASE_URL:
            raise RuntimeError("REMNAWAVE_BASE_URL is not set")
        if not REMNAWAVE_TOKEN:
            raise RuntimeError("REMNAWAVE_TOKEN is not set")

    def _headers(self):
        return {"Authorization": f"Bearer {REMNAWAVE_TOKEN}"}

    async def get_subscription_link(self, telegram_id: str) -> str:
        """
        В Remnawave username == telegram_id.
        Пытаемся получить пользователя по username и достать shortUuid.
        """
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.get(
                f"{REMNAWAVE_BASE_URL}/api/users/by-username/{telegram_id}",
                headers=self._headers(),
            )
            if r.status_code == 404:
                return ""
            r.raise_for_status()
            data = r.json()

        # shortUuid может лежать по-разному
        short_uuid = (
            data.get("shortUuid")
            or data.get("short_uuid")
            or (data.get("user") or {}).get("shortUuid")
            or (data.get("user") or {}).get("short_uuid")
        )
        if not short_uuid:
            return ""
        return f"{SUB_BASE_URL}/{short_uuid}"

    async def devices(self, telegram_id: str):
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.get(
                f"{REMNAWAVE_BASE_URL}/api/users/{telegram_id}/devices",
                headers=self._headers(),
            )
            r.raise_for_status()
            return r.json()

    async def delete_device(self, telegram_id: str, hwid: str):
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.delete(
                f"{REMNAWAVE_BASE_URL}/api/users/{telegram_id}/devices/{hwid}",
                headers=self._headers(),
            )
            r.raise_for_status()
            return r.json()
