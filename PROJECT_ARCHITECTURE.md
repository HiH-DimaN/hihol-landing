# Project Architecture — hihol-landing

## System shape

`hihol-landing` keeps a statically exported Next.js 14 App Router frontend. React server components compose content; small client components provide the checklist, cookie consent, tracked links and the four-step AI diagnostic. The new intake API is a separate FastAPI service and does not switch Next.js to a server runtime.

```text
Browser
  -> static Next.js routes `/`, `/ai`, `/ai-diagnostika`, niche pages and guides
     -> CookieConsent -> local consent value
     -> YandexMetrika (mounted only after granted consent)
     -> TrackedLink -> optional `reachGoal`, then normal navigation
     -> AI diagnostic POST `/api/leads`
        -> internal Caddy `handle_path /api/*`
           -> FastAPI `/leads`
              -> PostgreSQL `leads`
              -> PII-free Telegram signal with lead ID only
```

## Explicit infrastructure decisions

- Frontend: Next.js 14.2.35 static export served by Caddy on internal port 3000; Coolify Traefik owns public TLS/ports 80 and 443.
- API: FastAPI/Granian is a separate internal service on port 8000. The browser sees only same-origin `/api/*`.
- Database: PostgreSQL 16 on the same RF-hosted deployment contour; no host port is published.
- Authentication/authorization: none. Marketing pages and `POST /api/leads` are public; there is no public lead-read/admin endpoint.
- Payments: none.
- Personal data: the AI form stores only the supplied business-process brief, contact and consent. IP is used ephemerally for rate limiting and is not stored; User-Agent is not stored.
- Production status: source and deployment blueprint are ready, but activation of the API/database requires a separately authorized Coolify deployment.

## Database

Table `leads` (`backend/app/db.py`):

| Column | Type | Null | Purpose |
|---|---|---:|---|
| `id` | integer, primary key | no | Internal reference returned after save |
| `created_at` | timestamptz | no | Retention boundary; indexed as `ix_leads_created_at` |
| `source` | varchar(64) | no | Allowlisted CTA/source slug |
| `service_context` | varchar(96) | yes | Allowlisted niche/guide slug |
| `process` | text | no | Current process description |
| `desired_result` | text | no | Observable desired outcome |
| `frequency` | varchar(64) | no | Allowlisted range |
| `time_spent` | varchar(64) | no | Allowlisted range |
| `current_tools` | text | yes | Existing systems |
| `constraints` | text | yes | Data/security/operational constraints |
| `budget` | varchar(64) | no | Allowlisted range, including “пока не знаю” |
| `name` | varchar(255) | no | Contact name |
| `contact` | varchar(255) | no | Email, phone or messenger username |
| `company` | varchar(255) | yes | Company/project if supplied |
| `consent_personal` | boolean | no | Required processing consent |

Rows older than `RETENTION_DAYS` are removed at startup, on write and by the daily retention worker.

Schema lifecycle is explicit: Alembic root revision `20260716_0001` creates `leads` and `ix_leads_created_at`. The API process never calls `create_all`; `backend/entrypoint.sh` must complete `alembic upgrade head` before Granian starts. A migration failure therefore keeps the API unavailable instead of serving against a stale schema. Downgrades are manual, require backup/approval for any non-test database and are exercised only on an isolated database in CI/local verification.

## API endpoints

| Method | Path | Auth | Input / result | Errors |
|---|---|---|---|---|
| `GET` | `/health` | none; internal liveness | none → `{status: "ok"}` | `500` if service startup/database initialization failed |
| `POST` | `/leads` | public via same-origin Caddy; no user auth | validated `LeadIn` → `{ok: true, id}` | `400` invalid length header, `403` foreign Origin, `413` >32 KiB, `422` validation/consent, `429` rate limit, generic `500` persistence failure |

There is deliberately no GET/PUT/DELETE endpoint for lead content. Operator access is through restricted PostgreSQL access in Coolify, not a public admin panel.

## Main boundaries

- `app/ai-diagnostika/page.tsx`: static metadata, value promise and form shell.
- `app/components/AiDiagnosticForm.tsx`: client-only step state, validation, same-origin submit and honest fallback.
- `app/lib/aiIntakeData.ts`: shared questionnaire ranges, result copy and contextual CTA builder.
- `backend/app/schemas.py`: server-side allowlists, lengths, consent and safe slug validation.
- `backend/app/main.py`: origin/body/rate guards, persistence orchestration and retention lifecycle.
- `backend/app/db.py`: `Lead` model, session factory and retention delete.
- `backend/app/notify.py`: PII-free Telegram signal.
- `deploy/Caddyfile`: static files, security headers and `/api/*` proxy.
- `deploy/intake.compose.yml`: non-live Coolify compose blueprint for web/API/PostgreSQL isolation.

## Deployment flow

```text
GitHub main
  -> Coolify compose deployment (separately authorized)
     -> web: Next build -> out/ -> Caddy :3000
     -> api: FastAPI/Granian :8000 (internal only)
     -> db: PostgreSQL :5432 (internal only, persistent volume)
     -> Coolify Traefik :80/:443 -> web
```

Until that explicit migration is performed, the verified live production image remains the prior static-only Caddy resource. The repository `Dockerfile` still builds the standalone static web image; `deploy/intake.compose.yml` is the activation blueprint.

## Data and event flow

1. Static content and every direct contact link work without analytics consent.
2. CTA source/context are safe slugs added to `/ai-diagnostika` query parameters.
3. The browser validates each step, then posts JSON to `/api/leads`; it never includes IP or User-Agent fields.
4. Caddy strips `/api`, enforces 32 KiB and proxies over the internal network.
5. FastAPI repeats size/origin/rate/field/consent validation, deletes expired rows and commits the lead.
6. The response contains only the new ID. Telegram receives that ID and route slugs, never the contact or answers.
7. If the API fails, the form preserves its client state, shows the failure and offers a voluntary Telegram route without claiming success.

## Environment

- `DATABASE_URL` — production `postgresql+asyncpg://...` secret.
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` — compose database secrets.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — optional PII-free notification channel.
- `ALLOWED_ORIGINS_CSV` — exact public origins.
- `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_SECONDS`, `MAX_REQUEST_BYTES` — public-write guards.
- `RETENTION_DAYS`, `RETENTION_SWEEP_SECONDS` — retention controls.
- `NEXT_PUBLIC_YM_ID` — public analytics counter ID; analytics stays consent-gated.

## Folder structure

```text
app/
  ai-diagnostika/page.tsx
  components/AiDiagnosticForm.tsx
  components/ai/*
  lib/aiIntakeData.ts
backend/
  app/{config,db,main,notify,schemas}.py
  alembic/versions/20260716_0001_create_leads.py
  alembic.ini
  entrypoint.sh
  tests/
  Dockerfile
deploy/
  Caddyfile
  intake.compose.yml
tests/
  ai-intake.test.mjs
  ai-intake-browser-check.cjs
```

## Quality and compatibility constraints

- Next.js 14.2.35, TypeScript strict, Tailwind and `output: 'export'` remain fixed.
- Dev server uses port 3100 only; local port 3000 belongs to another product.
- Responsive acceptance widths: 360, 390, 768 and 1440 px.
- Backend gates: pytest, Ruff and MyPy. Frontend gates: Node tests, build and Playwright matrices.
- No production activation, secrets, commit or push without a separate explicit instruction.
