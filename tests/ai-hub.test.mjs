import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFile(new URL(path, root), 'utf8')

test('AI hub restores the complete conversion architecture', async () => {
  const [page, data] = await Promise.all([
    read('app/components/AiSolutionsPage.tsx'),
    read('app/lib/aiData.ts'),
  ])

  for (const component of [
    'AiHero',
    'AiProblems',
    'AiSolutions',
    'AiProcess',
    'AiProof',
    'AiPricing',
    'AiPrivacyBridge',
    'AiFaq',
    'AiFinalCta',
  ]) assert.match(page, new RegExp(component))

  for (const fact of [
    'AI-автоматизация бизнес-процессов под ключ',
    'Диагностика',
    'Карта решения',
    'Пилот',
    'Запуск',
    'Product Factory OS',
    'Skutr Docs',
    '50–320 тыс. ₽',
  ]) assert.match(data, new RegExp(fact))
})

test('public proof includes Product Factory OS in a balanced four-card grid', async () => {
  const [data, proof] = await Promise.all([
    read('app/lib/aiData.ts'),
    read('app/components/ai/AiProof.tsx'),
  ])

  assert.match(data, /https:\/\/github\.com\/hihol-labs\/product-factory-os/)
  assert.match(data, /Операционная система разработки продуктов в Codex/)
  assert.match(proof, /sm:grid-cols-2/)
  assert.doesNotMatch(proof, /lg:grid-cols-3/)
})

test('AI hub links every commercial route and guide from the hub', async () => {
  const data = await read('app/lib/aiData.ts')
  const requiredRoutes = [
    '/b2b-automation',
    '/ai-assistant-business',
    '/ai-crm',
    '/telegram-mini-app',
    '/voice-bot',
    '/ai-for-experts',
    '/skolko-stoit-ai-bot',
    '/kak-vnedrit-rag',
    '/telegram-mini-app-dlya-biznesa',
    '/golosovoy-bot-dlya-vhodyaschih-zvonkov',
  ]

  for (const route of requiredRoutes) assert.match(data, new RegExp(route.replaceAll('/', '\\/')))
})

test('AI offer remains evidence-bound and uses one portrait', async () => {
  const files = [
    'app/lib/aiData.ts',
    'app/components/AiSolutionsPage.tsx',
    'app/components/ai/AiHero.tsx',
    'app/components/ai/AiProof.tsx',
    'app/components/ai/AiPricing.tsx',
    'app/components/ai/AiPrivacyFaq.tsx',
  ]
  const source = (await Promise.all(files.map(read))).join('\n')

  for (const unsupported of [
    /40\+ AI/i,
    /сотни пользователей/i,
    /ROI\s*[:—-]?\s*\d/i,
    /выручка\s*\+\d/i,
    /retention\s*\d/i,
    /возврат 100%/i,
    /Google Forms/i,
    /первых 5 проектов/i,
  ]) assert.doesNotMatch(source, unsupported)

  // One portrait, referenced once, and the file must actually ship in public/.
  // Pinning a file name alone let a rename (da4a953) rot this contract silently.
  const portraits = [...source.matchAll(/\/(dmitry[\w-]*\.jpg)/g)].map((m) => m[1])
  assert.equal(portraits.length, 1, `expected exactly one portrait, got ${portraits}`)
  await assert.doesNotReject(
    readFile(new URL(`public/${portraits[0]}`, root)),
    `portrait ${portraits[0]} is referenced but missing from public/`,
  )
  assert.match(source, /Не публикую точные финансовые результаты клиента/)
})

test('AI cluster returns to the AI hub and shares the business UI', async () => {
  const [niche, guide, header, css] = await Promise.all([
    read('app/components/NicheLandingPage.tsx'),
    read('app/components/GuidePage.tsx'),
    read('app/components/ai/AiHeader.tsx'),
    read('app/globals.css'),
  ])

  assert.match(niche, /href="\/ai"/)
  assert.match(guide, /href="\/ai"/)
  assert.match(niche, /compliance-home ai-home/)
  assert.match(guide, /compliance-home ai-home/)
  assert.match(header, /lg:hidden/)
  assert.match(header, /152-ФЗ/)
  assert.match(css, /--accent-text: #1c7a4b/)
  assert.match(css, /--accent-text: #236c73/)
})

test('compliance pricing has three audit levels and one recommendation', async () => {
  const [data, pricing, nav, expert] = await Promise.all([
    read('app/lib/complianceData.ts'),
    read('app/components/compliance/PricingTiers.tsx'),
    read('app/components/compliance/Nav.tsx'),
    read('app/components/compliance/ExpertBlock.tsx'),
  ])

  assert.equal((data.match(/popular: true/g) ?? []).length, 1)
  assert.match(data, /support: \{/)
  assert.match(pricing, /md:grid-cols-3/)
  assert.match(pricing, /После основного аудита/)
  assert.match(nav, /md:hidden/)
  assert.match(nav, /AI-решения/)
  assert.doesNotMatch(expert, /dmitry\.jpg/)
})
