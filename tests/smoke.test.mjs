import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('project test harness can read the application manifest', async () => {
  const packageJson = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url), 'utf8'),
  )

  assert.equal(packageJson.name, 'hihol-landing')
  assert.match(packageJson.scripts.dev, /-p 3100(?:\s|$)/)
})
