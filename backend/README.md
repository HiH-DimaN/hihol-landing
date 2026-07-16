# hihol AI intake API

Внутренний FastAPI-сервис собственной анкеты `hihol.ru/ai-diagnostika`. В production он доступен только через same-origin маршрут Caddy `/api/*`; наружный порт `8000` и PostgreSQL не публикуются.

## Поток данных

`Browser -> hihol.ru/api/leads -> Caddy -> FastAPI -> PostgreSQL на РФ-хосте`.

Сохраняются ответы анкеты, имя, контакт, компания (если указана), источник и факт согласия. IP и User-Agent используются только для обработки запроса/ограничения частоты и не сохраняются. Telegram получает только ID заявки и безопасный slug источника — без контакта и ответов.

## Эндпоинты

- `POST /leads` — валидация, обязательное согласие, honeypot, ограничение размера и частоты, удаление заявок старше `RETENTION_DAYS`, сохранение.
- `GET /health` — liveness.

Очистка просроченных заявок выполняется при старте, при каждой новой записи и фоновым заданием раз в `RETENTION_SWEEP_SECONDS` (по умолчанию раз в сутки).

## Локальная проверка

```bash
python -m venv .venv
. .venv/bin/activate
pip install -e ".[dev]"
alembic upgrade head
pytest
ruff check app tests
mypy app
```

SQLite используется только локально. Production задаёт `DATABASE_URL` вида `postgresql+asyncpg://...` через секреты Coolify. Контент заявок читается только через ограниченный доступ к PostgreSQL; публичной admin-панели нет.

## Миграции

Alembic — единственный production-механизм изменения схемы. Контейнер выполняет `alembic upgrade head` до запуска Granian и завершится с ошибкой, если миграция не прошла. FastAPI не вызывает `create_all` во время старта.

```bash
# Показать дерево и текущую ревизию
alembic history
alembic current --check-heads

# Создать следующую ревизию после изменения модели
alembic revision --autogenerate -m "describe change"

# Проверить откат только на backup/test database
alembic downgrade -1
```

Root-ревизия `20260716_0001` создаёт таблицу `leads` и индекс `ix_leads_created_at`. Автоматический downgrade в production не выполняется: перед любым будущим откатом обязательны backup и отдельное разрешение.
