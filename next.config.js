/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/rag',
        destination: '/kak-vnedrit-rag',
        statusCode: 301,
      },
    ]
  },
}

module.exports = nextConfig
