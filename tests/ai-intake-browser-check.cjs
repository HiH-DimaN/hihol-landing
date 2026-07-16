const { mkdirSync, readFileSync } = require('node:fs')
const { networkInterfaces } = require('node:os')
const path = require('node:path')
const { execFileSync, spawnSync } = require('node:child_process')

const target = process.env.TARGET_URL || 'http://127.0.0.1:3100/ai-diagnostika?src=browser&ctx=ai-crm'
const evidenceDir = path.resolve(process.env.EVIDENCE_DIR || '.itd-memory/evidence/browser-ai-intake')
const runLabel = process.env.RUN_LABEL || 'ai-intake-browser'
const isWsl = process.platform === 'linux' && /microsoft/i.test(readFileSync('/proc/version', 'utf8'))

if (isWsl && process.env.PW_FORCE_LINUX !== '1') {
  const toWindowsPath = (value) => execFileSync('wslpath', ['-w', value], { encoding: 'utf8' }).trim()
  const wslAddress = Object.values(networkInterfaces()).flat().find((entry) => entry?.family === 'IPv4' && !entry.internal)?.address
  const childTarget = process.env.TARGET_URL || `http://${wslAddress || '127.0.0.1'}:3100/ai-diagnostika?src=browser&ctx=ai-crm`
  const childEnv = {
    TARGET_URL: childTarget,
    EVIDENCE_DIR: toWindowsPath(evidenceDir),
    RUN_LABEL: runLabel,
    PW_EXECUTABLE_PATH: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  }
  const quote = (value) => `'${value.replaceAll("'", "''")}'`
  const assignments = Object.entries(childEnv).map(([key, value]) => `$env:${key}=${quote(value)}`).join('; ')
  const command = `${assignments}; & 'C:\\Program Files\\nodejs\\node.exe' ${quote(toWindowsPath(__filename))}`
  const child = spawnSync('/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', command], { stdio: 'inherit' })
  process.exit(child.status ?? 2)
}

const { chromium } = require('playwright')
const viewports = [
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
]
const transparentPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64')

async function stubDevMetadata(page) {
  await page.route('**/icon?*', (route) => route.fulfill({ status: 200, contentType: 'image/png', body: transparentPng }))
}

async function dismissCookieBanner(page) {
  const necessary = page.getByRole('button', { name: 'Только необходимые' })
  if (await necessary.count()) await necessary.click()
}

async function completeForm(page) {
  await page.locator('#process').fill('Менеджер вручную переносит входящие заявки из почты в CRM и проверяет их статус.')
  await page.locator('#desired_result').fill('Создавать карточку автоматически и оставлять спорные решения человеку.')
  await page.getByRole('button', { name: 'Продолжить' }).click()
  await page.locator('input[name="frequency"][value="несколько раз в день"]').check()
  await page.locator('input[name="time_spent"][value="1–5 часов в неделю"]').check()
  await page.getByRole('button', { name: 'Продолжить' }).click()
  await page.locator('#current_tools').fill('Почта и Bitrix24')
  await page.locator('#constraints').fill('Клиентские данные нельзя передавать во внешние AI-сервисы')
  await page.locator('input[name="budget"][value="150–320 тыс. ₽"]').check()
  await page.getByRole('button', { name: 'Продолжить' }).click()
  await page.locator('#name').fill('Иван')
  await page.locator('#contact').fill('ivan@example.com')
  await page.locator('#company').fill('ООО Ромашка')
  await page.locator('input[name="consent_personal_ui"]').check()
}

function observe(page) {
  const result = { consoleErrors: [], pageErrors: [] }
  page.on('console', (message) => { if (message.type() === 'error') result.consoleErrors.push(message.text()) })
  page.on('pageerror', (error) => result.pageErrors.push(error.message))
  return result
}

async function checkSuccess(browser, viewport) {
  const context = await browser.newContext({ viewport })
  const page = await context.newPage()
  const observed = observe(page)
  let submittedPayload = null
  await stubDevMetadata(page)
  await page.route(/https:\/\/mc\.yandex\.(?:ru|com)\//, (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }))
  await page.route('**/api/leads', async (route) => {
    submittedPayload = route.request().postDataJSON()
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, id: 101 }) })
  })

  const response = await page.goto(target, { waitUntil: 'networkidle', timeout: 60000 })
  await dismissCookieBanner(page)
  const initial = {
    status: response?.status() ?? null,
    h1: await page.locator('h1').innerText(),
    progress: await page.getByRole('progressbar', { name: 'Прогресс анкеты' }).getAttribute('aria-valuenow'),
    telegramLinks: await page.locator('a[href*="t.me/dmitry_hihol"]').count(),
    horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1),
  }
  mkdirSync(evidenceDir, { recursive: true })
  const screenshot = path.join(evidenceDir, `hihol-${runLabel}-${viewport.name}.png`)
  await page.screenshot({ path: screenshot, fullPage: true })

  await completeForm(page)
  await page.getByRole('button', { name: 'Отправить на разбор' }).click()
  await page.getByText('Анкета сохранена').waitFor({ timeout: 10000 })
  const result = {
    viewport,
    ...initial,
    screenshot,
    successVisible: await page.getByText('заявка №101').isVisible(),
    submittedPayload,
    ...observed,
  }
  await context.close()
  return result
}

async function checkUnavailable(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  const observed = observe(page)
  await stubDevMetadata(page)
  await page.route('**/api/leads', (route) => route.fulfill({ status: 503, contentType: 'application/json', body: '{"detail":"unavailable"}' }))
  await page.goto(target, { waitUntil: 'networkidle', timeout: 60000 })
  await dismissCookieBanner(page)
  await completeForm(page)
  await page.getByRole('button', { name: 'Отправить на разбор' }).click()
  const alert = page.locator('div[role="alert"]').filter({ hasText: 'Не удалось сохранить анкету' })
  await alert.waitFor({ timeout: 10000 })
  for (let index = 0; index < 3; index += 1) await page.getByRole('button', { name: 'Назад' }).click()
  const result = {
    alert: await alert.innerText(),
    telegramFallback: await alert.locator('a[href*="t.me/dmitry_hihol"]').count(),
    currentStep: await page.getByText('Шаг 1 из 4').count(),
    originalProcess: await page.locator('#process').inputValue(),
    ...observed,
  }
  await context.close()
  return result
}

function successBlocked(item) {
  const payload = item.submittedPayload || {}
  return [
    item.status !== 200,
    !item.h1.includes('Предварительная AI-диагностика'),
    item.progress !== '1',
    item.telegramLinks < 1,
    item.horizontalOverflow,
    !item.successVisible,
    payload.source !== 'browser',
    payload.service_context !== 'ai-crm',
    payload.consent_personal !== true,
    'ip' in payload,
    'user_agent' in payload,
    item.consoleErrors.some((message) => !message.includes('503')),
    item.pageErrors.length > 0,
  ].some(Boolean)
}

function unavailableBlocked(item) {
  return [
    !item.alert.includes('Ответы остались на странице'),
    item.telegramFallback !== 1,
    item.currentStep !== 1,
    !item.originalProcess.includes('Менеджер вручную'),
    item.consoleErrors.some((message) => !message.includes('Failed to load resource')),
    item.pageErrors.length > 0,
  ].some(Boolean)
}

async function run() {
  const browser = await chromium.launch({ headless: true, ...(process.env.PW_EXECUTABLE_PATH ? { executablePath: process.env.PW_EXECUTABLE_PATH } : {}) })
  const results = []
  for (const viewport of viewports) results.push(await checkSuccess(browser, viewport))
  const unavailable = await checkUnavailable(browser)
  await browser.close()
  console.log(JSON.stringify({ target, results, unavailable }, null, 2))
  process.exit(results.some(successBlocked) || unavailableBlocked(unavailable) ? 1 : 0)
}

run().catch((error) => {
  console.error(error.stack || error)
  process.exit(2)
})
