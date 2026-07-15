const { mkdirSync, readFileSync } = require('node:fs')
const { networkInterfaces } = require('node:os')
const path = require('node:path')
const { execFileSync, spawnSync } = require('node:child_process')

const target = process.env.TARGET_URL || 'http://127.0.0.1:3100/'
const evidenceDir = path.resolve(
  process.env.EVIDENCE_DIR || '.itd-memory/evidence/browser',
)
const runLabel = process.env.RUN_LABEL || 'browser'

const isWsl =
  process.platform === 'linux' &&
  /microsoft/i.test(readFileSync('/proc/version', 'utf8'))

if (isWsl && process.env.PW_FORCE_LINUX !== '1') {
  const toWindowsPath = (value) =>
    execFileSync('wslpath', ['-w', value], { encoding: 'utf8' }).trim()
  const wslAddress = Object.values(networkInterfaces())
    .flat()
    .find((entry) => entry?.family === 'IPv4' && !entry.internal)?.address
  const childTarget =
    process.env.TARGET_URL || `http://${wslAddress || '127.0.0.1'}:3100/`
  const childEnv = {
    TARGET_URL: childTarget,
    EVIDENCE_DIR: toWindowsPath(evidenceDir),
    RUN_LABEL: runLabel,
    PW_EXECUTABLE_PATH: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    ...(process.env.VIEWPORT ? { VIEWPORT: process.env.VIEWPORT } : {}),
    ...(process.env.STUB_METRIKA
      ? { STUB_METRIKA: process.env.STUB_METRIKA }
      : {}),
  }
  const quotePowerShell = (value) => `'${value.replaceAll("'", "''")}'`
  const assignments = Object.entries(childEnv)
    .map(([key, value]) => `$env:${key}=${quotePowerShell(value)}`)
    .join('; ')
  const scriptPath = quotePowerShell(toWindowsPath(__filename))
  const command = `${assignments}; & 'C:\\Program Files\\nodejs\\node.exe' ${scriptPath}`
  const child = spawnSync(
    '/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe',
    ['-NoProfile', '-NonInteractive', '-Command', command],
    { stdio: 'inherit' },
  )

  process.exit(child.status ?? 2)
}

const { chromium } = require('playwright')
const allViewports = [
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
]
const viewports = process.env.VIEWPORT
  ? allViewports.filter(({ name }) => name === process.env.VIEWPORT)
  : allViewports

async function observePage(page) {
  const observed = {
    consoleErrors: [],
    pageErrors: [],
    metrikaRequests: [],
    failedResponses: [],
    metrikaStubbed: process.env.STUB_METRIKA !== '0',
  }

  if (observed.metrikaStubbed) {
    await page.route(/https:\/\/mc\.yandex\.(?:ru|com)\//, (route) =>
      route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }),
    )
  }

  page.on('console', (message) => {
    if (message.type() === 'error') observed.consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => observed.pageErrors.push(error.message))
  page.on('request', (request) => {
    if (/mc\.yandex\.(ru|com)|metrika/i.test(request.url())) {
      observed.metrikaRequests.push(request.url())
    }
  })
  page.on('response', (response) => {
    if (response.status() >= 400) {
      observed.failedResponses.push({ status: response.status(), url: response.url() })
    }
  })

  return observed
}

async function readPageSummary(page) {
  return {
    h1: await page.locator('h1').first().innerText(),
    pricingCards: await page.locator('#pricing h3').count(),
    telegramHref: await page
      .locator('#check a[href*="t.me"]')
      .getAttribute('href'),
    policyLinks: await page.locator('a[href*="politika-obrabotki"]').count(),
    horizontalOverflow: await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    ),
  }
}

async function clickWithoutNavigation(locator) {
  await locator.evaluate((element) => {
    element.addEventListener('click', (event) => event.preventDefault(), { once: true })
  })
  await locator.click()
}

async function acceptAnalytics(page) {
  const accept = page.getByRole('button', { name: /принять/i })
  if (!(await accept.count())) return false

  await accept.click()
  await page.waitForTimeout(1200)
  return true
}

async function exerciseTrackedActions(page, viewport) {
  await page.evaluate(() => {
    window.__goalCalls = []
    window.ym = (...args) => window.__goalCalls.push(args)
  })
  await clickWithoutNavigation(page.locator('header a[href="#check"]').last())
  await clickWithoutNavigation(page.locator('.compliance-home-hero a[href="#check"]'))
  await page.locator('#check-yourself input[type="checkbox"]').first().check()
  await clickWithoutNavigation(page.locator('#check-yourself a[href="#check"]'))
  await clickWithoutNavigation(page.locator('#pricing a[href="#check"]').first())
  await clickWithoutNavigation(page.locator('#pricing a[href$=".pdf"]'))
  await clickWithoutNavigation(page.locator('#check a[href*="t.me"]'))

  if (viewport.width < 768) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(250)
    await clickWithoutNavigation(page.locator('div.fixed a[href="#check"]'))
  }

  return page.evaluate(() => window.__goalCalls.map((args) => args[2]))
}

function findMissingGoals(goalNames, viewport) {
  const expected = [
    'cta_nav_check',
    'cta_hero_check',
    'cta_self_check',
    'cta_pricing_check',
    'cta_final_telegram',
    'download_price_pdf',
    ...(viewport.width < 768 ? ['cta_sticky_check'] : []),
  ]
  return expected.filter((goal) => !goalNames.includes(goal))
}

async function saveScreenshot(page, viewport) {
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(150)
  const screenshot = path.join(evidenceDir, `hihol-${runLabel}-${viewport.name}.png`)
  await page.screenshot({ path: screenshot, fullPage: true })
  return screenshot
}

async function checkViewport(browser, viewport) {
  const context = await browser.newContext({ viewport })
  const page = await context.newPage()
  const observed = await observePage(page)
  const response = await page.goto(target, { waitUntil: 'networkidle', timeout: 60000 })
  const initialMetrikaCount = observed.metrikaRequests.length
  const pageSummary = await readPageSummary(page)

  await page.locator('main a[href="#check"]').first().click()
  await page.waitForTimeout(250)
  const finalCtaVisible = await page.locator('#check').isVisible()
  const ymBeforeConsent = await page.evaluate(() => typeof window.ym)
  const accepted = await acceptAnalytics(page)
  const goalNames = await exerciseTrackedActions(page, viewport)
  const screenshot = await saveScreenshot(page, viewport)

  await context.close()
  return {
    viewport,
    status: response ? response.status() : null,
    ...pageSummary,
    initialMetrikaCount,
    ymBeforeConsent,
    accepted,
    metrikaAfterAccept: observed.metrikaRequests.length,
    goalNames,
    missingGoals: findMissingGoals(goalNames, viewport),
    finalCtaVisible,
    screenshot,
    ...observed,
  }
}

function resultIsBlocked(item) {
  return [
    item.status !== 200,
    item.horizontalOverflow,
    item.initialMetrikaCount !== 0,
    item.ymBeforeConsent !== 'undefined',
    !item.accepted,
    item.metrikaAfterAccept < 1,
    item.missingGoals.length > 0,
    !item.finalCtaVisible,
    !item.telegramHref,
    item.pricingCards !== 3,
    item.policyLinks < 1,
    item.consoleErrors.length > 0,
    item.pageErrors.length > 0,
    item.failedResponses.length > 0,
  ].some(Boolean)
}

async function run() {
  if (viewports.length === 0) throw new Error(`Unknown VIEWPORT: ${process.env.VIEWPORT}`)
  mkdirSync(evidenceDir, { recursive: true })
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PW_EXECUTABLE_PATH
      ? { executablePath: process.env.PW_EXECUTABLE_PATH }
      : {}),
  })
  const results = []
  for (const viewport of viewports) results.push(await checkViewport(browser, viewport))
  await browser.close()

  console.log(JSON.stringify({ target, results }, null, 2))
  process.exit(results.some(resultIsBlocked) ? 1 : 0)
}

run().catch((error) => {
  console.error(error.stack || error)
  process.exit(2)
})
