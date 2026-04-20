# hihol-landing

Лендинг на Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Стек

- Next.js 14.2.35 (App Router, `output: 'standalone'`)
- TypeScript (strict)
- Tailwind CSS 3.4
- Inter via `next/font/google`

## Палитра

- Фон: `slate-950`
- Текст: белый
- Accent gradient: `cyan-400 → violet-400 → pink-400`

## Быстрый старт

```bash
npm install
npm run dev
```

Откроется на http://localhost:3100.

> Порт `3000` зарезервирован под локальный продакшн-проект Скутер Докс (skutr.tech). Dev-сервер hihol-landing запускается на `3100`.

## Скрипты

- `npm run dev` — dev-сервер с HMR (порт 3100)
- `npm run build` — production-билд (генерирует `.next/standalone`)
- `npm start` — запуск production-билда
- `npm run lint` — ESLint (будет добавлен при необходимости)

## Структура

```
app/
  layout.tsx                    # root layout, Inter, metadata
  page.tsx                      # главная — композиция всех секций
  globals.css                   # tailwind base + utilities + keyframes
  components/
    HeroSection.tsx             # hero: split layout + aurora + HeroFX + ChatDemo + MagneticCTA
    HeroFX.tsx                  # client: flow-diagram + spotlight + parallax
    ChatDemo.tsx                # client: живой Telegram-чат с typing-анимацией
    MagneticCTA.tsx             # client: кнопка, притягивающаяся к курсору
    AudienceSection.tsx         # «Кому я подхожу» — 2 колонки
    ProcessSection.tsx          # «Как работаю» — 8 шагов, grid 4×2
    CasesSection.tsx            # «Кейсы» — 3 карточки
    MyProductsSection.tsx       # «Мои продукты» — 3 карточки
    DeliverablesSection.tsx     # «Что получаете» — 5 пунктов
    PricingSection.tsx          # «Цены и сроки» — 5 карточек
    SkutrTalkCard.tsx           # client: табы Start/Plus/Pro внутри Pricing
    FaqSection.tsx              # аккордеон — 9 вопросов
    CtaSection.tsx              # финал: Google Forms + Telegram-контакт
Dockerfile
docker-compose.yml
.dockerignore
next.config.js                  # output: 'standalone'
tailwind.config.ts
postcss.config.js
tsconfig.json
package.json
```

## Деплой

Прод-хост: `root@185.221.213.104` (Хостленд). Деплой через **Coolify** из GitHub-репозитория.

### Стек деплоя

- Контейнер: `node:20-alpine` (multi-stage Dockerfile: deps → builder → runner, non-root user)
- Next.js в режиме `standalone` — минимальный рантайм без `node_modules` в финальном слое
- Внутренний порт: `3000` (наружу не публикуется — Coolify проксирует через свой traefik/nginx)
- Сеть: `coolify` (external, создаётся самим Coolify)

### Файлы

- `Dockerfile` — сборка и запуск
- `docker-compose.yml` — сервис `web`, `restart: unless-stopped`
- `.dockerignore` — исключает node_modules, .next, .git, .env-файлы, docs
- `next.config.js` — `output: 'standalone'`

### Локальная проверка билда

```bash
npm run build
```

Должен пройти без ошибок. После билда `.next/standalone/server.js` — это то, что запускается в контейнере.

### Деплой через Coolify

1. Залить проект в приватный репозиторий GitHub.
2. В Coolify: **New Resource → Public/Private Repository**, указать URL репозитория.
3. **Build Pack:** Dockerfile. **Port:** `3000`.
4. **Domain:** `hihol.ru`. **SSL:** Let's Encrypt (автоматически).
5. **Env vars:** задавать через UI Coolify (например, `NEXT_PUBLIC_YM_ID` когда подключим Метрику).
6. **Deploy** → дождаться завершения сборки (~3–5 мин).
7. Проверить DNS: `dig hihol.ru +short` должен вернуть `185.221.213.104`.
8. Открыть `https://hihol.ru`.
