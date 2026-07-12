# hihol form API

Сбор заявок с hihol.ru. FastAPI + PostgreSQL, размещается на РФ-хосте (гейт D16).
Наружу не публикуется — фронт (Next.js) обращается по внутренней Docker-сети `coolify`.

## Эндпоинты
- `POST /leads` — приём заявки (валидация, обязательное согласие на ПДн, honeypot, троттлинг). Уведомление в Telegram.
- `GET /health` — проверка живости.

## Локальный запуск
```
python -m venv .venv && . .venv/bin/activate
pip install -e ".[dev]"
granian --interface asgi app.main:app --host 0.0.0.0 --port 8000   # SQLite по умолчанию
pytest                                                             # тесты (SQLite in-file)
ruff check . && mypy app
```

## Env (в проде — только через Coolify, не в репо)
- `DATABASE_URL` — `postgresql+asyncpg://…` (в проде); по умолчанию SQLite для dev/тестов.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — уведомления (пусто = выключено).
- `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_SECONDS` — троттлинг.

## Заметки
- Схема БД создаётся автоматически при старте (`init_db`), Alembic не используется (одна таблица `leads`).
- Троттлинг — in-memory, на один инстанс. При масштабировании >1 реплики вынести в Redis.
- Секреты только в Coolify env; `.env.example` — заглушки.
