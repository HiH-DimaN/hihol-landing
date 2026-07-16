from datetime import UTC, datetime, timedelta

from sqlalchemy import func, select

from app.config import settings
from app.db import Lead, SessionLocal, cleanup_expired_leads
from app.notify import format_notification

from .conftest import valid_payload


async def lead_count() -> int:
    async with SessionLocal() as session:
        result = await session.scalar(select(func.count()).select_from(Lead))
        return int(result or 0)


async def test_health(client):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


async def test_valid_lead_is_stored_without_network_identifiers(client):
    response = await client.post("/leads", json=valid_payload())
    assert response.status_code == 200
    assert response.json()["id"] > 0

    async with SessionLocal() as session:
        lead = await session.scalar(select(Lead))
        assert lead is not None
        assert lead.contact == "ivan@example.com"
        assert not hasattr(lead, "ip")
        assert not hasattr(lead, "user_agent")


def test_created_at_has_retention_index():
    indexed_columns = {
        column.name
        for index in Lead.__table__.indexes
        for column in index.columns
    }
    assert "created_at" in indexed_columns


async def test_consent_is_required(client):
    response = await client.post("/leads", json=valid_payload(consent_personal=False))
    assert response.status_code == 422


async def test_required_text_cannot_be_blank(client):
    response = await client.post("/leads", json=valid_payload(process=" " * 20))
    assert response.status_code == 422


async def test_ranges_are_allowlisted(client):
    response = await client.post("/leads", json=valid_payload(budget="без ограничений"))
    assert response.status_code == 422


async def test_source_is_a_safe_slug(client):
    response = await client.post("/leads", json=valid_payload(source="<script>"))
    assert response.status_code == 422


async def test_foreign_origin_is_rejected(client):
    response = await client.post(
        "/leads",
        json=valid_payload(),
        headers={"origin": "https://attacker.example"},
    )
    assert response.status_code == 403


async def test_honeypot_returns_synthetic_success_without_storage(client):
    response = await client.post("/leads", json=valid_payload(website="https://spam.example"))
    assert response.status_code == 200
    assert response.json()["id"] == 0
    assert await lead_count() == 0


async def test_rate_limit_is_per_ephemeral_ip(client):
    response = None
    for _ in range(settings.rate_limit_max + 1):
        response = await client.post("/leads", json=valid_payload())
    assert response is not None
    assert response.status_code == 429


async def test_declared_oversized_payload_is_rejected(client):
    response = await client.post(
        "/leads",
        content=b"{}",
        headers={
            "content-type": "application/json",
            "content-length": str(settings.max_request_bytes + 1),
        },
    )
    assert response.status_code == 413


async def test_chunked_oversized_payload_is_rejected(client):
    async def body_chunks():
        yield b'{"padding":"'
        yield b"x" * settings.max_request_bytes
        yield b'"}'

    response = await client.post(
        "/leads",
        content=body_chunks(),
        headers={"content-type": "application/json"},
    )
    assert response.status_code == 413


async def test_retention_cleanup_removes_expired_leads(client):
    payload = valid_payload()
    async with SessionLocal() as session:
        expired = Lead(
            **{key: value for key, value in payload.items() if key not in {"website"}},
            created_at=datetime.now(UTC) - timedelta(days=settings.retention_days + 1),
        )
        session.add(expired)
        await session.commit()
        await cleanup_expired_leads(session)
        await session.commit()
    assert await lead_count() == 0


def test_telegram_notification_contains_no_lead_pii():
    lead = Lead(
        id=42,
        source="guide",
        service_context="kak-vnedrit-rag",
        process="Секретный процесс клиента",
        desired_result="Секретный результат",
        frequency="ежедневно",
        time_spent="1–5 часов в неделю",
        current_tools="Секретная CRM",
        constraints="NDA",
        budget="150–320 тыс. ₽",
        name="Иван",
        contact="ivan@example.com",
        company="ООО Ромашка",
        consent_personal=True,
    )
    message = format_notification(lead)
    assert "ID: 42" in message
    assert "guide · kak-vnedrit-rag" in message
    for secret in ["Иван", "ivan@example.com", "Ромашка", "Секретный", "NDA", "150–320"]:
        assert secret not in message
