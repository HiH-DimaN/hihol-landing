import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFile(new URL(path, root), 'utf8')

test('AI diagnostic is a four-step, data-minimised first-party form', async () => {
  const [page, form, data] = await Promise.all([
    read('app/ai-diagnostika/page.tsx'),
    read('app/components/AiDiagnosticForm.tsx'),
    read('app/lib/aiIntakeData.ts'),
  ])

  assert.match(page, /Предварительная AI-диагностика/)
  assert.match(page, /canonical/)
  assert.match(form, /STEPS/)
  assert.match(form, /Шаг \{step \+ 1\} из \{STEPS\.length\}/)
  assert.match(form, /fetch\('\/api\/leads'/)
  assert.match(form, /consent_personal/)
  assert.match(form, /website/)
  assert.match(form, /не добавляйте персональные данные клиентов/i)
  assert.match(data, /пока не знаю/i)
  assert.doesNotMatch(form, /type=["']file["']/)
  assert.doesNotMatch(form, /выручк|зарплат/i)
})

test('AI conversion entry points use the diagnostic with route context and retain Telegram', async () => {
  const files = [
    'app/components/ai/AiHeader.tsx',
    'app/components/ai/AiHero.tsx',
    'app/components/ai/AiPricing.tsx',
    'app/components/ai/AiPrivacyFaq.tsx',
    'app/components/GuidePage.tsx',
    'app/components/NicheLandingPage.tsx',
  ]
  const source = (await Promise.all(files.map(read))).join('\n')

  assert.match(source, /aiIntakeHref/)
  assert.match(source, /guide\.slug/)
  assert.match(source, /page\.slug/)
  assert.match(source, /TELEGRAM_URL/)
  assert.match(source, /Получить предварительный разбор|Пройти диагностику/)
})

test('lead API contract excludes persisted network identifiers and PII-bearing notifications', async () => {
  const [schema, db, main, notify] = await Promise.all([
    read('backend/app/schemas.py'),
    read('backend/app/db.py'),
    read('backend/app/main.py'),
    read('backend/app/notify.py'),
  ])

  for (const field of ['process', 'desired_result', 'frequency', 'time_spent', 'budget']) {
    assert.match(schema, new RegExp(field))
    assert.match(db, new RegExp(field))
  }
  assert.match(schema, /consent_personal/)
  assert.match(main, /_rate_limited/)
  assert.match(main, /max_request_bytes/)
  assert.match(main, /cleanup_expired_leads/)
  assert.match(main, /retention_worker/)
  assert.match(main, /cleanup_expired_leads_once/)
  assert.doesNotMatch(db, /Mapped\[[^\]]+\].*\b(?:ip|user_agent)\b/)
  assert.doesNotMatch(notify, /lead\.(?:name|contact|company|process|desired_result|current_tools|constraints)/)
  assert.match(notify, /lead\.id/)
  assert.doesNotMatch(main, /init_db|create_all/)
  assert.doesNotMatch(db, /async def init_db|Base\.metadata\.create_all/)
})

test('privacy, search, project docs and static deployment describe one intake architecture', async () => {
  const [policy, footer, llms, sitemap, nextConfig, caddy, compose, architecture, readme, prd] = await Promise.all([
    read('app/components/PrivacyPolicy.tsx'),
    read('app/components/SiteFooter.tsx'),
    read('public/llms.txt'),
    read('app/sitemap.ts'),
    read('next.config.js'),
    read('deploy/Caddyfile'),
    read('deploy/intake.compose.yml'),
    read('PROJECT_ARCHITECTURE.md'),
    read('README.md'),
    read('PRD.md'),
  ])

  assert.match(policy, /AI-диагностик/i)
  assert.match(policy, /россий/i)
  assert.match(policy, /12 месяцев/i)
  assert.match(policy, /техническ[^.]*уведомлен/i)
  assert.doesNotMatch(policy, /нет встроенной формы|не передаёт обращения через встроенные/i)
  assert.match(footer, /AI-диагностик/i)
  assert.match(llms, /https:\/\/hihol\.ru\/ai-diagnostika/)
  assert.match(sitemap, /ai-diagnostika/)
  assert.match(nextConfig, /output: 'export'/)
  assert.match(caddy, /handle_path \/api\/\*/)
  assert.match(caddy, /INTAKE_UPSTREAM/)
  assert.match(caddy, /X-Frame-Options DENY/)
  assert.match(caddy, /Strict-Transport-Security/)
  assert.match(compose, /api:/)
  assert.match(compose, /postgres:16-alpine/)
  assert.doesNotMatch(compose, /8000:8000|5432:5432/)
  assert.match(architecture, /Table `leads`/)
  assert.match(architecture, /POST.*`\/leads`/)
  assert.match(readme, /FastAPI \+ Granian \+ SQLAlchemy/)
  assert.match(prd, /US-07 — Request a structured AI preliminary review/)
  assert.doesNotMatch([architecture, readme, prd].join('\n'), /Database: none|Лид-форма и серверное хранение данных отсутствуют/)
})
