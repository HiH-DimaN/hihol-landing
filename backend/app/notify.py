import logging

import httpx

from .config import settings
from .db import Lead

logger = logging.getLogger("hihol.notify")


def _format(lead: Lead) -> str:
    lines = [
        "🔔 Новая заявка с hihol.ru",
        f"Имя: {lead.name}",
        f"Контакт: {lead.contact}",
    ]
    if lead.company:
        lines.append(f"Компания: {lead.company}")
    if lead.business_sphere:
        lines.append(f"Сфера: {lead.business_sphere}")
    if lead.task:
        lines.append(f"Задача: {lead.task}")
    if lead.budget:
        lines.append(f"Бюджет: {lead.budget}")
    src = lead.source or "—"
    if lead.service_context:
        src = f"{src} · {lead.service_context}"
    lines.append(f"Источник: {src}")
    lines.append(f"Рассылка: {'да' if lead.consent_marketing else 'нет'}")
    return "\n".join(lines)


async def notify_telegram(lead: Lead) -> None:
    """Send a lead notification to Telegram. Fail-soft: never raises."""
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        logger.warning("Telegram not configured; skipping notification")
        return
    url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                url,
                json={"chat_id": settings.telegram_chat_id, "text": _format(lead)},
            )
            resp.raise_for_status()
    except Exception as exc:  # noqa: BLE001 - notification must never break the request
        logger.error("Telegram notification failed: %s", exc)
