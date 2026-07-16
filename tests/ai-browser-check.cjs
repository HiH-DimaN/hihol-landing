const { mkdirSync, readFileSync } = require('node:fs')
const { networkInterfaces } = require('node:os')
const path = require('node:path')
const { execFileSync, spawnSync } = require('node:child_process')

const target = process.env.TARGET_URL || 'http://127.0.0.1:3100/ai'
const evidenceDir = path.resolve(process.env.EVIDENCE_DIR || '.itd-memory/evidence/browser-ai')
const runLabel = process.env.RUN_LABEL || 'ai-browser'
const isWsl = process.platform === 'linux' && /microsoft/i.test(readFileSync('/proc/version', 'utf8'))

if (isWsl && process.env.PW_FORCE_LINUX !== '1') {
  const toWindowsPath = (value) => execFileSync('wslpath', ['-w', value], { encoding: 'utf8' }).trim()
  const wslAddress = Object.values(networkInterfaces()).flat().find((entry) => entry?.family === 'IPv4' && !entry.internal)?.address
  const childTarget = process.env.TARGET_URL || `http://${wslAddress || '127.0.0.1'}:3100/ai`
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
const childRoutes = ['/ai-crm', '/kak-vnedrit-rag']
const expectedHubLinks = ['/ai#solutions', '/ai#process', '/ai#proof', '/ai#pricing-ai']

async function checkViewport(browser, viewport) {
  const context = await browser.newContext({ viewport })
  const page = await context.newPage()
  const observed = { consoleErrors: [], pageErrors: [], failedResponses: [], metrikaRequests: [] }
  await page.route(/https:\/\/mc\.yandex\.(?:ru|com)\//, (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }))
  page.on('console', (message) => { if (message.type() === 'error') observed.consoleErrors.push(message.text()) })
  page.on('pageerror', (error) => observed.pageErrors.push(error.message))
  page.on('response', (response) => { if (response.status() >= 400) observed.failedResponses.push({ status: response.status(), url: response.url() }) })
  page.on('request', (request) => { if (/mc\.yandex\.(ru|com)|metrika/i.test(request.url())) observed.metrikaRequests.push(request.url()) })

  const response = await page.goto(target, { waitUntil: 'networkidle', timeout: 60000 })
  const initialMetrikaCount = observed.metrikaRequests.length
  const bodyText = await page.locator('body').innerText()
  const summary = {
    status: response?.status() ?? null,
    h1: await page.locator('h1').first().innerText(),
    solutionLinks: await page.locator('#solutions a[href^="/"]').count(),
    guideLinks: await page.locator('#solutions a[href*="rag"], #solutions a[href*="bot"], #solutions a[href*="mini-app"]').count(),
    requiredSections: await page.locator('#solutions, #process, #proof, #pricing-ai, #faq-ai, #contacts-ai').count(),
    portraitCount: await page.locator('img[src*="dmitry"]').count(),
    complianceLinks: await page.locator('a[href="/"]').count(),
    telegramLinks: await page.locator('a[href*="t.me/dmitry_hihol"]').count(),
    horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1),
    hasUnsupportedClaims: /40\+ AI|сотни пользователей|возврат 100%|ROI:\s*\d/i.test(bodyText),
  }

  const accept = page.getByRole('button', { name: /принять/i })
  if (await accept.count()) {
    await accept.click()
    await page.waitForTimeout(1000)
  }
  mkdirSync(evidenceDir, { recursive: true })
  const screenshot = path.join(evidenceDir, `hihol-${runLabel}-${viewport.name}.png`)
  await page.screenshot({ path: screenshot, fullPage: true })
  await context.close()
  return { viewport, ...summary, initialMetrikaCount, metrikaAfterAccept: observed.metrikaRequests.length, screenshot, ...observed }
}

function blocked(item) {
  return [
    item.status !== 200,
    !item.h1.includes('AI-автоматизация бизнес-процессов под ключ'),
    item.solutionLinks < 10,
    item.guideLinks < 4,
    item.requiredSections !== 6,
    item.portraitCount !== 1,
    item.complianceLinks < 1,
    item.telegramLinks < 3,
    item.horizontalOverflow,
    item.hasUnsupportedClaims,
    item.initialMetrikaCount !== 0,
    item.metrikaAfterAccept < 1,
    item.consoleErrors.length > 0,
    item.pageErrors.length > 0,
    item.failedResponses.length > 0,
  ].some(Boolean)
}

async function checkChildHeader(browser, route) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await context.newPage()
  const url = new URL(route, target).toString()
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  const hubLinks = await page.locator('header a[href^="/ai#"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  )
  const missingLinks = expectedHubLinks.filter((href) => !hubLinks.includes(href))
  await Promise.all([
    page.waitForURL(/\/ai(?:\.html)?#solutions$/, { timeout: 10000 }),
    page.locator('header a[href="/ai#solutions"]').click(),
  ])
  const destination = new URL(page.url())
  const result = {
    route,
    status: response?.status() ?? null,
    hubLinks,
    missingLinks,
    destination: destination.toString(),
    landedOnHubSolutions: ['/ai', '/ai.html'].includes(destination.pathname) && destination.hash === '#solutions',
    targetExists: await page.locator('#solutions').count() === 1,
  }
  await context.close()
  return result
}

function childHeaderBlocked(item) {
  return item.status !== 200 || item.missingLinks.length > 0 || !item.landedOnHubSolutions || !item.targetExists
}

async function run() {
  const browser = await chromium.launch({ headless: true, ...(process.env.PW_EXECUTABLE_PATH ? { executablePath: process.env.PW_EXECUTABLE_PATH } : {}) })
  const results = []
  for (const viewport of viewports) results.push(await checkViewport(browser, viewport))
  const childHeaderResults = []
  for (const route of childRoutes) childHeaderResults.push(await checkChildHeader(browser, route))
  await browser.close()
  console.log(JSON.stringify({ target, results, childHeaderResults }, null, 2))
  process.exit(results.some(blocked) || childHeaderResults.some(childHeaderBlocked) ? 1 : 0)
}

run().catch((error) => {
  console.error(error.stack || error)
  process.exit(2)
})
