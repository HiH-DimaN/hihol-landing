const { createReadStream, existsSync, statSync } = require('node:fs')
const { createServer } = require('node:http')
const path = require('node:path')

const root = path.resolve(process.env.STATIC_ROOT || 'out')
const port = Number(process.env.PORT || 3100)
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

function resolveRequest(url) {
  const pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname)
  const candidates = pathname === '/'
    ? ['index.html']
    : [pathname.slice(1), `${pathname.slice(1)}.html`, path.join(pathname.slice(1), 'index.html')]

  for (const candidate of candidates) {
    const absolute = path.resolve(root, candidate)
    if (absolute.startsWith(`${root}${path.sep}`) && existsSync(absolute) && statSync(absolute).isFile()) return absolute
  }
  return null
}

const server = createServer((request, response) => {
  const file = resolveRequest(request.url || '/')
  if (!file) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }
  response.writeHead(200, { 'content-type': contentTypes[path.extname(file)] || 'application/octet-stream' })
  createReadStream(file).pipe(response)
})

server.listen(port, '0.0.0.0', () => console.log(`Static test server: http://0.0.0.0:${port}`))
