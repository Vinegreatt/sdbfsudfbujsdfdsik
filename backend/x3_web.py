import os
import httpx


class X3Web:
    def __init__(self):
        self.base = os.environ.get("REMNAWAVE_BASE_URL")
        self.token = os.environ.get("REMNAWAVE_TOKEN")

        if not self.base:
            raise RuntimeError("REMNAWAVE_BASE_URL is not set")
        if not self.token:
            raise RuntimeError("REMNAWAVE_TOKEN is not set")

        self.headers = {
            "Authorization": f"Bearer {self.token}"
        }

    async def get_user(self, telegram_id: str) -> dict:
        url = f"{self.base.rstrip('/')}/api/users/by-username/{telegram_id}"
        async with httpx.AsyncClient(timeout=20) as c:
            r = await c.get(url, headers=self.headers)
            r.raise_for_status()
            return r.json()["response"]
