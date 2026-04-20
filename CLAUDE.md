# CLAUDE.md — hihol-landing

## Что это

Лендинг HiHol. Next.js 14 (App Router) + TypeScript + Tailwind CSS. Прод-хост — Хостленд, `root@185.221.213.104`.

## Стек (фиксированный)

- **Framework:** Next.js 14, App Router (v14.2.35, latest 14.2.x патч)
- **Язык:** TypeScript, strict
- **Стили:** Tailwind CSS
- **Шрифт:** Inter через `next/font/google`
- **Palette:** фон `slate-950`, текст белый, акцент `cyan-500`

> Этот проект **отступает** от глобального стека (Vue/Vite) из `~/projects/.claude/CLAUDE.md`. Стек зафиксирован пользователем явно в первой сессии 2026-04-20. Не переключать без явной просьбы.

## Структура

```
app/
  layout.tsx               root layout, Inter, bg-slate-950
  page.tsx                 главная, рендерит HeroSection
  globals.css              @tailwind base/components/utilities
  components/
    HeroSection.tsx        hero: H1 + подзаголовок + cyan CTA
tailwind.config.ts
next.config.js
postcss.config.js
tsconfig.json
package.json
```

## Правила

1. Все ответы — на русском.
2. Для любых значимых изменений кода — вызывать `/review` перед коммитом (>2 файлов).
3. После новых feature-блоков — `/test`.
4. В конце каждой сессии или значимого блока — `/session-save` (обязательно).
5. Прод-хост: `root@185.221.213.104`. Старый адрес `155.212.185.216` из глобального CLAUDE.md — недоступен, не использовать.
6. **Dev-порт = `3100`.** Порт `3000` локально занят продакшн-продуктом **Скутер Докс** (skutr.tech) — отдельный проект пользователя, не трогать. `package.json` скрипт `dev` жёстко зафиксирован на `-p 3100`.

## Security note

`next@14.2.35` — последний патч линейки 14.2.x. Фиксирует critical CVE из 14.2.15 (security-update-2025-12-11). Остаётся 1 high severity advisory (DoS via image optimizer / HTTP smuggling / RSC deserialization), пофикшен только в `next@16.2.4` — миграция на Next.js 16 отложена по явному решению пользователя оставаться на линейке 14.

## Статус реализации

| Шаг | Что | Статус |
|-----|-----|--------|
| 0 | Scaffold (Next 14 + TS + Tailwind + Inter + globals.css) | ✅ 2026-04-20 |
| 1 | Hero-секция (H1, подзаголовок, CTA, подпись) | ✅ 2026-04-20 |
| 2 | Следующие секции (Проблема / Решение / Процесс / Цены / FAQ / Контакты) | ⏳ TBD |
| 3 | Форма-анкета → PDF-отчёт | ⏳ TBD |
| 4 | Деплой на `185.221.213.104` (Docker + nginx + certbot) | ⏳ TBD |

## Лог сессий

- **2026-04-20 session-1** — scaffold создан вручную по явному ТЗ пользователя, `npm install` прогнан. Phase 2 (полный набор docs STRATEGIC_PLAN/PRD/ARCHITECTURE/IMPLEMENTATION_PLAN) пропущена: для однофайлового лендинга избыточно, ТЗ умещается в этом CLAUDE.md. Если проект разрастётся — пересобрать документацию через `/blueprint`.
- **2026-04-20 session-2** — бамп `next@14.2.15 → 14.2.35` (critical CVE закрыт, high остаётся — фикс в 14.x не планируется). Создан `app/components/HeroSection.tsx`, подключён в `app/page.tsx`. Зафиксирован новый прод-хост `185.221.213.104`.
