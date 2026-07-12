import os
import tempfile

# Configure a throwaway SQLite DB BEFORE importing the app (engine is built at import).
_db_fd, _db_path = tempfile.mkstemp(suffix=".db")
os.close(_db_fd)
os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{_db_path}"
os.environ["TELEGRAM_BOT_TOKEN"] = ""
os.environ["TELEGRAM_CHAT_ID"] = ""

import httpx  # noqa: E402
import pytest_asyncio  # noqa: E402

from app.db import init_db  # noqa: E402
from app.main import _hits, app  # noqa: E402


@pytest_asyncio.fixture
async def client():
    await init_db()
    _hits.clear()
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


def valid_payload(**overrides):
    data = {
        "name": "Иван",
        "contact": "ivan@example.com",
        "company": "ООО Ромашка",
        "business_sphere": "Логистика",
        "task": "Автоматизировать заявки",
        "budget": "100–300 тыс",
        "source": "hero",
        "consent_personal": True,
        "consent_marketing": False,
        "website": "",
    }
    data.update(overrides)
    return data
