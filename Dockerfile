# syntax=docker/dockerfile:1.7

# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund \
  --fetch-retries=3 \
  --fetch-retry-mintimeout=5000 \
  --fetch-retry-maxtimeout=20000 \
  --fetch-timeout=60000 \
  --maxsockets=1

# ---- builder ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# ---- static runner (Coolify -> Traefik -> Caddy) ----
FROM caddy:2.11.4-alpine AS runner

COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/out /srv

RUN caddy validate --config /etc/caddy/Caddyfile

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/healthz >/dev/null || exit 1
