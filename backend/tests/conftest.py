import os
import tempfile

_db_fd, _db_path = tempfile.mkstemp(suffix=".db")
os.close(_db_fd)
os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{_db_path}"
os.environ["TELEGRAM_BOT_TOKEN"] = ""
os.environ["TELEGRAM_CHAT_ID"] = ""
os.environ["ALLOWED_ORIGINS_CSV"] = "https://hihol.ru"

import httpx  # noqa: E402
import pytest_asyncio  # noqa: E402

from app.db import Base, engine  # noqa: E402
from app.main import _hits, app  # noqa: E402


@pytest_asyncio.fixture
async def client():
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.drop_all)
        await connection.run_sync(Base.metadata.create_all)
    _hits.clear()
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(
        transport=transport,
        base_url="http://test",
        headers={"origin": "https://hihol.ru", "x-forwarded-for": "203.0.113.10"},
    ) as test_client:
        yield test_client


def valid_payload(**overrides):
    data = {
        "process": "Менеджер вручную переносит заявки из почты в CRM и проверяет статусы.",
        "desired_result": "Автоматически создавать карточку и показывать ошибки человеку.",
        "frequency": "несколько раз в день",
        "time_spent": "1–5 часов в неделю",
        "current_tools": "Почта и Bitrix24",
        "constraints": "Передача клиентских данных во внешние AI-сервисы запрещена",
        "budget": "150–320 тыс. ₽",
        "name": "Иван",
        "contact": "ivan@example.com",
        "company": "ООО Ромашка",
        "consent_personal": True,
        "source": "ai_hero",
        "service_context": "ai-crm",
        "website": "",
    }
    data.update(overrides)
    return data
