import logging

import httpx

from .config import settings
from .db import Lead

logger = logging.getLogger("hihol.intake.notify")


def format_notification(lead: Lead) -> str:
    source = lead.source
    if lead.service_context:
        source = f"{source} · {lead.service_context}"
    return "\n".join(
        [
            "🔔 Новая заявка AI-диагностики",
            f"ID: {lead.id}",
            f"Источник: {source}",
            "Содержание доступно только в защищённой базе.",
        ]
    )


async def notify_telegram(lead: Lead) -> None:
    """Send a PII-free technical signal. Notification failure never loses the lead."""
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        logger.warning("Telegram notification is not configured")
        return
    url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                url,
                json={"chat_id": settings.telegram_chat_id, "text": format_notification(lead)},
            )
            response.raise_for_status()
    except Exception as exc:  # noqa: BLE001 - notification must never break persistence
        logger.error("Telegram notification failed: %s", type(exc).__name__)
