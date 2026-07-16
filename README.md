# hihol-landing

Бизнес-сайт HiHol с двумя направлениями: технический аудит сайтов по 152-ФЗ и AI-автоматизация процессов. Для AI-направления в репозитории есть собственная многошаговая диагностика и изолированный lead API; автоматическая генерация отчёта/PDF не выполняется.

## Стек

- Next.js 14.2.35, App Router, static export (`output: 'export'`)
- React 18 + TypeScript strict
- Tailwind CSS 3.4
- Inter через `next/font/google`
- Playwright 1.61 для browser-smoke
- FastAPI + Granian + SQLAlchemy для внутреннего write-only intake API
- PostgreSQL 16 для заявок; авторизация, платежи и публичная admin-панель отсутствуют

## Визуальная система

- Главная `/`: светлый business canvas, тёмно-зелёные hero/final CTA, акцент `#2baf69`
- `/ai`: отдельная тёмная `.compliance-theme`
- Homepage-переопределения изолированы классом `.compliance-home` и не меняют остальные маршруты

## Быстрый старт

```bash
npm install
npm run dev
```

Страница откроется на `http://localhost:3100`. Порт 3000 зарезервирован за другим проектом и не используется.

Backend проверяется отдельно (его не нужно запускать для статической разработки UI):

```bash
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -e ".[dev]"
alembic upgrade head
pytest
```

## Команды

- `npm run dev` — Next dev server на порту 3100
- `node --test tests/*.test.mjs` — контентные, структурные и deployment-контракты
- `npm run build` — typecheck + production static export в `out/`
- `npm run test:browser` — Playwright на 360, 390, 768 и 1440 px; внутри WSL автоматически использует установленный Windows Chrome
- `npm run lint` — Next.js lint

Для локальной проверки именно экспортированного артефакта:

```bash
npm run build
python3 -m http.server 3100 --directory out --bind 127.0.0.1
```

## Структура

```text
app/
  layout.tsx
  page.tsx
  globals.css
  components/
    Compliance152Landing.tsx
    CookieConsent.tsx
    AiDiagnosticForm.tsx
    TrackedLink.tsx
    YandexMetrika.tsx
    compliance/
      ComplianceHero.tsx
      BusinessProof.tsx
      SelfCheck.tsx
      FinesTable.tsx
      AuditScope.tsx
      PricingTiers.tsx
      ExpertBlock.tsx
      ComplianceFaq.tsx
      FinalCta.tsx
      StickyCta.tsx
  lib/
    aiIntakeData.ts
    complianceData.ts
    consent.ts
    metrika.ts
tests/
  smoke.test.mjs
  compliance-ux.test.mjs
  browser-check.cjs
backend/
  app/
  tests/
deploy/
  Caddyfile
  intake.compose.yml
public/
```

## Аналитика и данные

`NEXT_PUBLIC_YM_ID` можно задать через окружение; без него используется публичный ID счётчика проекта. Метрика монтируется только после явного согласия. Собственная `/ai-diagnostika` отправляет минимизированный бриф на same-origin `/api/leads`; IP/User-Agent не сохраняются, Telegram получает только ID и безопасный источник, срок хранения — до 12 месяцев.

Схема intake-базы управляется Alembic. API-контейнер сначала выполняет `alembic upgrade head` и только после успешного обновления запускает Granian; runtime `create_all` не используется. Любой downgrade вне временной тестовой БД требует отдельного backup и разрешения.

## Сборка и деплой

Текущий подтверждённый production-контур остаётся static-only: `git push` → Coolify собирает `Dockerfile` → внутренний Caddy раздаёт `out/` на порту 3000 → Coolify Traefik принимает публичный HTTP/HTTPS. Активация анкеты требует отдельного перехода на `deploy/intake.compose.yml` (web + internal API + PostgreSQL) и ещё не выполнена. Серверный Next runtime, системный Caddy и `/var/www/hihol` не используются.

Локальная проверка точного production image не занимает порты 3000 и 3100:

```bash
docker build -t hihol-landing:verify .
docker run --rm -d --name hihol-landing-verify -p 127.0.0.1:3180:3000 hihol-landing:verify
curl --fail http://127.0.0.1:3180/healthz
docker rm -f hihol-landing-verify
```

Перед production deploy обязательны полный test/build, container smoke и `/review`. Rollback выполняется через предыдущий локально доступный Coolify image; соседние контейнеры на хосте не затрагиваются.
