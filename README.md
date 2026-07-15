# hihol-landing

Бизнес-лендинг HiHol для ручной продажи технического аудита сайтов по 152-ФЗ. Главная цель текущего этапа — проверить спрос на 3–5 оплаченных аудитов; backend, формы и автоматическая генерация PDF пока не входят в продукт.

## Стек

- Next.js 14.2.35, App Router, static export (`output: 'export'`)
- React 18 + TypeScript strict
- Tailwind CSS 3.4
- Inter через `next/font/google`
- Playwright 1.61 для browser-smoke
- База данных, API, авторизация и платежи: отсутствуют

## Визуальная система

- Главная `/`: светлый business canvas, тёмно-зелёные hero/final CTA, акцент `#2baf69`
- `/ai`: отдельная тёмная `.compliance-theme`
- Homepage-переопределения изолированы классом `.compliance-home` и не меняют остальные маршруты

## Быстрый старт

```bash
npm install
npm run dev
```

Страница откроется на `http://localhost:3100`. Порт 3000 зарезервирован за другим проектом и не используется.

## Команды

- `npm run dev` — Next dev server на порту 3100
- `node --test tests/*.test.mjs` — контентные, структурные и deployment-контракты
- `npm run build` — typecheck + production static export в `out/`
- `npm run test:browser` — Playwright на 360, 390, 768 и 1440 px; внутри WSL автоматически использует установленный Windows Chrome
- `npm run lint` — Next.js lint

Для локальной проверки именно экспортированного артефакта:

```bash
npm run build
python3 -m http.server 3100 --directory out --bind 127.0.0.1
```

## Структура

```text
app/
  layout.tsx
  page.tsx
  globals.css
  components/
    Compliance152Landing.tsx
    CookieConsent.tsx
    TrackedLink.tsx
    YandexMetrika.tsx
    compliance/
      ComplianceHero.tsx
      BusinessProof.tsx
      SelfCheck.tsx
      FinesTable.tsx
      AuditScope.tsx
      PricingTiers.tsx
      ExpertBlock.tsx
      ComplianceFaq.tsx
      FinalCta.tsx
      StickyCta.tsx
  lib/
    complianceData.ts
    consent.ts
    metrika.ts
tests/
  smoke.test.mjs
  compliance-ux.test.mjs
  browser-check.cjs
public/
```

## Аналитика и данные

`NEXT_PUBLIC_YM_ID` можно задать через окружение; без него используется публичный ID счётчика проекта. Метрика монтируется только после явного согласия. Все CTA остаются обычными ссылками, когда согласие не дано или `window.ym` недоступен. Лид-форма и серверное хранение данных отсутствуют.

## Сборка и деплой

Production-контур: `git push` → Coolify собирает многоэтапный `Dockerfile` → внутренний Caddy раздаёт `out/` на порту 3000 → Coolify Traefik принимает публичный HTTP/HTTPS. Серверный Next runtime, системный Caddy и `/var/www/hihol` не используются.

Локальная проверка точного production image не занимает порты 3000 и 3100:

```bash
docker build -t hihol-landing:verify .
docker run --rm -d --name hihol-landing-verify -p 127.0.0.1:3180:3000 hihol-landing:verify
curl --fail http://127.0.0.1:3180/healthz
docker rm -f hihol-landing-verify
```

Перед production deploy обязательны полный test/build, container smoke и `/review`. Rollback выполняется через предыдущий локально доступный Coolify image; соседние контейнеры на хосте не затрагиваются.
