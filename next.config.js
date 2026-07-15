/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site has no server code (forms -> Telegram, Metrika is
  // client-side), so it ships as plain HTML/CSS/JS served by the Caddy
  // container managed by Coolify behind its Traefik proxy.
  output: 'export',
  images: {
    // No image optimization server in export mode.
    unoptimized: true,
  },
  // NOTE: redirects() is NOT supported with output: 'export'.
  // /rag -> /kak-vnedrit-rag is handled by the container Caddyfile instead.
}

module.exports = nextConfig
