import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import path from 'node:path'
import ts from 'typescript'

const root = process.cwd()

function readExport(relativePath) {
  const absolutePath = path.join(root, 'out', relativePath)
  assert.ok(existsSync(absolutePath), `Static export artifact is missing: ${relativePath}`)
  return readFileSync(absolutePath)
}

function readHtml(relativePath) {
  return readExport(relativePath).toString('utf8')
}

function functionLoc(relativePath, functionName) {
  const absolutePath = path.join(root, relativePath)
  const sourceText = readFileSync(absolutePath, 'utf8')
  const source = ts.createSourceFile(
    absolutePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  const declaration = source.statements.find(
    (statement) =>
      ts.isFunctionDeclaration(statement) && statement.name?.text === functionName,
  )

  assert.ok(declaration, `Function ${functionName} is missing from ${relativePath}`)
  const start = source.getLineAndCharacterOfPosition(declaration.getStart(source)).line
  const end = source.getLineAndCharacterOfPosition(declaration.end).line
  return end - start + 1
}

test('static export preserves the niche landing contract', () => {
  const html = readHtml('ai-crm.html')

  assert.match(html, /AI-CRM для продаж и сервиса/)
  assert.match(html, /120–320 тыс\. ₽/)
  assert.match(html, /https:\/\/t\.me\/dmitry_hihol/)
  assert.match(html, /href="\/ai#solutions"/)
  assert.match(html, /href="\/ai#pricing-ai"/)
  assert.match(html, /"@type":"Service"/)
  assert.match(html, /"@type":"FAQPage"/)
})

test('static export preserves the guide contract', () => {
  const html = readHtml('kak-vnedrit-rag.html')

  assert.match(html, /Как внедрить RAG в бизнесе/)
  assert.match(html, /120 000 – 320 000 ₽/)
  assert.match(html, /План внедрения/)
  assert.match(html, /href="\/ai#solutions"/)
  assert.match(html, /href="\/ai#pricing-ai"/)
  assert.match(html, /"@type":"Article"/)
  assert.match(html, /"@type":"FAQPage"/)
})

test('static export preserves the AI solutions contract', () => {
  const html = readHtml('ai.html')

  assert.match(html, /AI-автоматизация бизнес-процессов под ключ/)
  assert.match(html, /Автоматизация B2B-процессов/)
  assert.match(html, /Публичные продукты вместо обезличенных финансовых обещаний/)
  assert.match(html, /https:\/\/t\.me\/dmitry_hihol/)
  assert.match(html, /"@type":"Service"/)
  assert.match(html, /"@type":"BreadcrumbList"/)
})

test('static export preserves the privacy policy contract', () => {
  const html = readHtml('politika-obrabotki-personalnyh-dannyh.html')

  assert.match(html, /Политика обработки персональных данных/)
  assert.match(html, /Хихол Дмитрий/)
  assert.match(html, /16 июля 2026 г\./)
  assert.match(html, /12\. Заключительные положения/)
  assert.doesNotMatch(html, /Google LLC|Google Forms/)
})

test('static export preserves the Open Graph image contract', () => {
  const image = readExport('opengraph-image')

  assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10])
  assert.equal(image.readUInt32BE(16), 1200)
  assert.equal(image.readUInt32BE(20), 630)
  assert.ok(image.length > 50_000)
})

test('static export reports a missing artifact as a failed contract', () => {
  assert.throws(
    () => readExport('route-that-must-not-exist.html'),
    /Static export artifact is missing/,
  )
})

test('target React functions stay within the 80 LOC review limit', () => {
  const targets = [
    ['app/components/NicheLandingPage.tsx', 'NicheStructuredData'],
    ['app/components/NicheLandingPage.tsx', 'NicheLandingPage'],
    ['app/components/PrivacyPolicy.tsx', 'PrivacyPolicy'],
    ['app/components/GuidePage.tsx', 'GuidePage'],
    ['app/components/AiSolutionsPage.tsx', 'AiSolutionsPage'],
    ['app/components/AiStructuredData.tsx', 'AiStructuredData'],
    ['app/opengraph-image.tsx', 'OGImage'],
  ]

  for (const [file, functionName] of targets) {
    assert.ok(
      functionLoc(file, functionName) <= 80,
      `${functionName} in ${file} exceeds 80 LOC`,
    )
  }
})
