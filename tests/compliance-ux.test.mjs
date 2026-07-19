import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFile(new URL(path, root), 'utf8')
const readBytes = (path) => readFile(new URL(path, root))

test('homepage leads with a concrete business outcome and an honest trust boundary', async () => {
  const [data, hero, landing] = await Promise.all([
    read('app/lib/complianceData.ts'),
    read('app/components/compliance/ComplianceHero.tsx'),
    read('app/components/Compliance152Landing.tsx'),
  ])

  assert.match(data, /Аудит сайта по 152-ФЗ: покажу риски и дам план исправления/)
  assert.match(data, /24-48 часов/)
  assert.match(data, /Не юридическое заключение/)
  assert.match(hero, /Получить 2 примера нарушений|HERO\.ctaLabel/)
  assert.match(landing, /compliance-home/)
  assert.match(landing, /BusinessProof/)
})

test('offer facts are visible without invented social proof', async () => {
  const data = await read('app/lib/complianceData.ts')

  for (const fact of [
    '14 контрольным элементам',
    '24-48 часов',
    '3 уровня проверки',
    '30 минут',
  ]) {
    assert.match(data, new RegExp(fact.replace('+', '\\+')))
  }

  assert.doesNotMatch(data, /9 из 10/i)
  assert.doesNotMatch(data, /должн(?:ая|ой) забот/i)
  assert.doesNotMatch(data, /почти ни у кого/i)
  assert.doesNotMatch(data, /Почти всегда да/i)
  assert.doesNotMatch(data, /2 месяца в подарок/i)
  assert.match(data, /примерно 2 месяца без дополнительной оплаты/i)
})

test('official 420-FZ source and the full price open safely in new tabs', async () => {
  const [data, fines, pricing] = await Promise.all([
    read('app/lib/complianceData.ts'),
    read('app/components/compliance/FinesTable.tsx'),
    read('app/components/compliance/PricingTiers.tsx'),
  ])

  assert.match(data, /http:\/\/www\.kremlin\.ru\/acts\/bank\/51388\//)
  assert.match(data, /Официальный текст 420-ФЗ/)

  for (const source of [fines, pricing]) {
    assert.match(source, /target="_blank"/)
    assert.match(source, /rel="noopener noreferrer"/)
  }
})

test('generated price sheet is deterministic, branded and content-invariant', async () => {
  const [publicPdf, outputPdf, generator] = await Promise.all([
    readBytes('public/price_152fz_hihol.pdf'),
    readBytes('output/pdf/price_152fz_hihol.pdf'),
    read('scripts/generate_price_pdf.py'),
  ])
  const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')

  assert.equal(publicPdf.subarray(0, 5).toString(), '%PDF-')
  assert.equal(sha256(publicPdf), sha256(outputPdf))

  for (const [name, color] of [
    ['BG', 'F4F7F2'],
    ['SURFACE_2', 'EAF0EB'],
    ['INK', '12211A'],
    ['MUTED', '56645D'],
    ['ACCENT', '2BAF69'],
    ['ACCENT_STRONG', '218A53'],
    ['DANGER', 'B73F43'],
    ['BORDER', 'D6E0D8'],
  ]) {
    assert.match(generator, new RegExp(`${name} = colors\\.HexColor\\("#${color}"\\)`))
  }

  for (const invariant of [
    '15.07.2026',
    '23 900',
    '39 900',
    '59 900',
    '5 900',
    '17 900',
    '37 900',
    '19 900',
    '149 000',
    '30%',
    '@dmitry_hihol',
  ]) {
    assert.match(generator, new RegExp(invariant.replace('.', '\\.').replace('+', '\\+')))
  }
})

test('website prices and add-ons match the latest price sheet', async () => {
  const data = await read('app/lib/complianceData.ts')

  for (const price of [
    '23 900 руб.',
    '39 900 руб.',
    '59 900 руб.',
    '5 900 руб./мес',
    '59 900 руб./год',
    '17 900 руб.',
    '37 900 руб.',
    '19 900 руб.',
    'от 149 000 руб.',
    'минус 30%',
  ]) {
    assert.match(data, new RegExp(price.replaceAll('.', '\\.').replaceAll('+', '\\+')))
  }

  assert.doesNotMatch(data, /3 900 руб\.\/мес/)
  assert.doesNotMatch(data, /39 900 руб\.\/год/)
  assert.match(data, /редакция 15\.07\.2026/)
})

test('express and full web audit keep their permission boundaries distinct', async () => {
  const data = await read('app/lib/complianceData.ts')

  assert.match(data, /Внешняя экспресс-проверка/)
  assert.match(data, /только публичные и технически наблюдаемые факты/i)
  assert.match(data, /Полный веб-аудит с участием владельца/)
  assert.match(data, /Тестовая отправка каждой формы/)
  assert.match(data, /только с подтверждением владельца/i)
})

test('six CTA positions and the PDF link use distinct analytics goals', async () => {
  const files = [
    'app/components/compliance/Nav.tsx',
    'app/components/compliance/ComplianceHero.tsx',
    'app/components/compliance/SelfCheck.tsx',
    'app/components/compliance/PricingTiers.tsx',
    'app/components/compliance/StickyCta.tsx',
    'app/components/compliance/FinalCta.tsx',
  ]
  const source = (await Promise.all(files.map(read))).join('\n')
  const goals = [
    'cta_nav_check',
    'cta_hero_check',
    'cta_self_check',
    'cta_pricing_check',
    'cta_sticky_check',
    'cta_final_telegram',
    'download_price_pdf',
  ]

  for (const goal of goals) assert.match(source, new RegExp(goal))
  assert.equal(new Set(goals).size, goals.length)
  assert.ok((source.match(/<TrackedLink/g) ?? []).length >= 7)
})

test('report preview is evidence-shaped and explicitly demonstrational', async () => {
  const [data, preview, landing] = await Promise.all([
    read('app/lib/complianceData.ts'),
    read('app/components/compliance/ReportPreview.tsx'),
    read('app/components/Compliance152Landing.tsx'),
  ])

  for (const claim of [
    'Демонстрационный фрагмент формата отчёта',
    'Это не результат проверки конкретного сайта',
    'Техническое наблюдение',
    'Доказательство',
    'Приоритет',
    'Что исправить',
  ]) {
    assert.match(data, new RegExp(claim))
  }

  assert.match(preview, /REPORT_PREVIEW/)
  assert.match(preview, /aria-label=/)
  assert.ok(landing.indexOf('<FinesTable />') < landing.indexOf('<ReportPreview />'))
  assert.ok(landing.indexOf('<ReportPreview />') < landing.indexOf('<AuditScope />'))
  assert.ok(landing.indexOf('<AuditScope />') < landing.indexOf('<PricingTiers />'))
})

test('free two-observation offer stays distinct from the paid express audit', async () => {
  const data = await read('app/lib/complianceData.ts')

  assert.match(data, /Получить 2 наблюдения бесплатно/)
  assert.match(data, /Два предварительных наблюдения — не полный аудит/)
  assert.match(data, /Внешняя экспресс-проверка сайта/)
  assert.match(data, /23 900 руб\./)
  assert.match(data, /24-48 часов/)
  assert.doesNotMatch(data, /Бесплатная экспресс-проверка/)
})

test('Playwright is pinned as project browser-test tooling', async () => {
  const packageJson = JSON.parse(await read('package.json'))

  assert.match(packageJson.devDependencies.playwright, /^\^?1\./)
  assert.equal(packageJson.scripts['test:browser'], 'node tests/browser-check.cjs')
})
