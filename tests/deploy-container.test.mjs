import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

function readProjectFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8')
}

test('Dockerfile packages the static export for Coolify on port 3000', () => {
  const dockerfile = readProjectFile('Dockerfile')

  assert.match(dockerfile, /FROM caddy:2\.11\.4-alpine AS runner/)
  assert.match(dockerfile, /COPY --from=builder \/app\/out \/srv/)
  assert.match(dockerfile, /COPY deploy\/Caddyfile \/etc\/caddy\/Caddyfile/)
  assert.match(dockerfile, /EXPOSE 3000/)
  assert.match(dockerfile, /HEALTHCHECK[^\n]*\\?\n?[\s\S]*127\.0\.0\.1:3000\/healthz/)
  assert.doesNotMatch(dockerfile, /\.next\/standalone|node server\.js/)
})

test('Caddy serves exported routes and preserves production edge behavior', () => {
  const caddyfile = readProjectFile('deploy/Caddyfile')

  assert.match(caddyfile, /^:3000\s*\{/m)
  assert.match(caddyfile, /respond \/healthz 200/)
  assert.match(caddyfile, /redir \/rag \/kak-vnedrit-rag 301/)
  assert.match(caddyfile, /@metadata_image path \/opengraph-image \/twitter-image \/icon \/apple-icon/)
  assert.match(caddyfile, /header @metadata_image Content-Type image\/png/)
  assert.match(caddyfile, /try_files \{path\} \{path\}\.html \{path\}\/index\.html/)
  assert.match(caddyfile, /rewrite @404 \/404\.html/)
})

test('Docker context excludes secrets, local state, build output and unrelated backend', () => {
  const ignored = new Set(
    readProjectFile('.dockerignore')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  )

  for (const required of [
    '.env',
    '.env*',
    '.git',
    '.claude',
    '.itd',
    '.itd-memory',
    '.next',
    'backend',
    'node_modules',
    'out',
    'tests',
    'tsconfig.tsbuildinfo',
  ]) {
    assert.ok(ignored.has(required), `.dockerignore must exclude ${required}`)
  }
})
