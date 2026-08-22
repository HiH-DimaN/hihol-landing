import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFile(new URL(path, root), 'utf8')

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]))
    .flatMap((schema) => (Array.isArray(schema['@graph']) ? schema['@graph'] : [schema]))
}

test('global entity schema is neutral and page services are route-specific', async () => {
  const [globalSchema, homeSchema, aiSchema] = await Promise.all([
    read('app/components/StructuredData.tsx'),
    read('app/components/HomeStructuredData.tsx'),
    read('app/components/AiStructuredData.tsx'),
  ])

  assert.doesNotMatch(globalSchema, /const serviceSchema/)
  assert.doesNotMatch(globalSchema, /priceRange/)
  assert.doesNotMatch(globalSchema, /GeoCoordinates|addressLocality|hasMap/)
  assert.match(globalSchema, /ProfessionalService/)
  assert.match(globalSchema, /технический аудит сайтов по 152-ФЗ/)
  // Home offers are derived from PRICING (single source of truth), not literals.
  assert.match(homeSchema, /from '\.\.\/lib\/complianceData'/)
  assert.match(homeSchema, /PRICING\.tiers\.map/)
  assert.match(homeSchema, /offerPrice\(/)
  // Person and the business entity live in the site-wide schema and are @id-referenced.
  assert.doesNotMatch(homeSchema, /'@type': 'Person'/)
  assert.match(homeSchema, /#person/)
  assert.match(aiSchema, /AI-автоматизация бизнес-процессов под ключ/)
  assert.match(aiSchema, /BreadcrumbList/)
  assert.match(aiSchema, /FAQPage/)
})
test('static pages expose one matching Service schema per commercial route', async () => {
  const [home, ai] = await Promise.all([read('out/index.html'), read('out/ai.html')])
  const homeSchemas = jsonLd(home)
  const aiSchemas = jsonLd(ai)
  const homeServices = homeSchemas.filter((schema) => schema['@type'] === 'Service')
  const aiServices = aiSchemas.filter((schema) => schema['@type'] === 'Service')

  assert.equal(homeServices.length, 1)
  assert.equal(homeServices[0].serviceType, 'Аудит сайта на соответствие 152-ФЗ')
  assert.deepEqual(homeServices[0].offers.map((offer) => offer.price), [
    '23900',
    '39900',
    '59900',
    '5900',
    '17900',
  ])
  assert.equal(aiServices.length, 1)
  assert.equal(aiServices[0].name, 'AI-автоматизация бизнес-процессов под ключ')
  assert.equal(aiServices[0].url, 'https://hihol.ru/ai')
})

test('metadata, dates, llms and policy tell one current story', async () => {
  const [layout, site, llms, policy, sitemap] = await Promise.all([
    read('app/layout.tsx'),
    read('app/lib/site.ts'),
    read('public/llms.txt'),
    read('app/components/PrivacyPolicy.tsx'),
    read('out/sitemap.xml'),
  ])

  assert.doesNotMatch(layout, /keywords:/)
  assert.doesNotMatch(layout, /geo\.region|geo\.placename|ICBM/)
  // The content-updated date is refreshed quarterly, so assert that every
  // surface tells the SAME date rather than pinning one literal.
  const contentDate = site.match(/DATE_MODIFIED_SHORT = '(\d{4}-\d{2}-\d{2})'/)?.[1]
  assert.ok(contentDate, 'DATE_MODIFIED_SHORT must be a YYYY-MM-DD literal in site.ts')
  assert.match(site, new RegExp(`DATE_MODIFIED = '${contentDate}T`))
  assert.match(sitemap, new RegExp(contentDate))
  assert.match(llms, new RegExp(`Обновлено: ${contentDate}`))
  assert.match(llms, /двумя связанными направлениями/)
  assert.match(llms, /Проверка сайта по 152-ФЗ: https:\/\/hihol\.ru\//)
  assert.match(llms, /AI-решения для бизнеса: https:\/\/hihol\.ru\/ai/)
  assert.doesNotMatch(llms, /Product Factory OS|сотни пользователей|40\+ AI/)
  assert.match(policy, /19 июля 2026 г\./)
  assert.doesNotMatch(policy, /Google LLC|Google Forms/)
  assert.match(policy, /hihol_consent/)
  assert.match(policy, /AI-диагностик/i)
})

test('footer copy is route-aware and does not mix disclaimers', async () => {
  const [footer, landing, ai, niche] = await Promise.all([
    read('app/components/SiteFooter.tsx'),
    read('app/components/Compliance152Landing.tsx'),
    read('app/components/AiSolutionsPage.tsx'),
    read('app/components/NicheLandingPage.tsx'),
  ])

  assert.match(footer, /type Direction = 'compliance' \| 'ai' \| 'neutral'/)
  assert.match(landing, /direction="compliance"/)
  assert.match(ai, /direction="ai"/)
  assert.match(niche, /direction="ai"/)
  assert.match(footer, /AI-диагностик/i)
})
