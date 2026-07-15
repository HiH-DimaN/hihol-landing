import type { NichePage } from '../lib/nichePages'
import {
  DATE_MODIFIED,
  DATE_PUBLISHED,
  SITE_NAME,
  SITE_URL,
} from '../lib/site'
import MagneticCTA from './MagneticCTA'
import SiteFooter from './SiteFooter'
import TrackedLink from './TrackedLink'

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-stone-800/80 bg-[#151812]/70 p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm leading-relaxed text-stone-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function createFaqSchema(page: NichePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

function createServiceSchema(page: NichePage, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    serviceType: page.serviceType,
    description: page.description,
    url,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    provider: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: 'Россия и СНГ',
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'RUB',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'RUB',
        minPrice: page.minPrice,
        maxPrice: page.maxPrice,
      },
      availability: 'https://schema.org/InStock',
    },
  }
}

function createBreadcrumbSchema(page: NichePage, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: page.title, item: url },
    ],
  }
}

function createWebPageSchema(page: NichePage, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url,
    inLanguage: 'ru-RU',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  }
}

function NicheStructuredData({ page }: { page: NichePage }) {
  const url = `${SITE_URL}/${page.slug}`
  const schemas = [
    createWebPageSchema(page, url),
    createServiceSchema(page, url),
    createBreadcrumbSchema(page, url),
    createFaqSchema(page),
  ]

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

function NicheHero({ page }: { page: NichePage }) {
  return (
    <section className="relative isolate overflow-hidden px-6 py-20 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-amber-500/20 blur-[140px]" />
        <div className="absolute -right-24 -top-24 h-[620px] w-[620px] rounded-full bg-emerald-600/20 blur-[160px]" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-70" />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-8 inline-flex rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
            {page.eyebrow}
          </div>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-stone-300 md:text-xl">
            {page.lead}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <MagneticCTA
              href="https://t.me/dmitry_hihol"
              target="_blank"
              rel="noopener noreferrer"
              goalName={`${page.slug}_anketa_click`}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-300 via-lime-300 to-emerald-400 px-7 py-4 text-base font-semibold text-[#0b0d0a] shadow-[0_0_40px_-8px_rgba(245,158,11,0.55)]"
            >
              Обсудить задачу
              <ArrowIcon />
            </MagneticCTA>
            <TrackedLink
              href="https://t.me/dmitry_hihol"
              target="_blank"
              rel="noopener noreferrer"
              goalName={`${page.slug}_telegram_click`}
              className="inline-flex items-center justify-center rounded-full border border-stone-700 bg-[#151812]/70 px-7 py-4 text-base font-semibold text-stone-200 transition-colors hover:border-amber-300/50 hover:text-amber-200"
            >
              Написать в Telegram
            </TrackedLink>
          </div>
        </div>

        <aside className="rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-500/10 via-[#151812]/80 to-transparent p-6 shadow-[0_0_40px_-16px_rgba(245,158,11,0.42)]">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">Ориентир из цен</div>
          <div className="mt-4 text-3xl font-bold text-amber-200">{page.price}</div>
          <div className="mt-2 text-sm text-stone-400">{page.duration}</div>
          <div className="mt-6 border-t border-stone-800/80 pt-5 text-sm leading-relaxed text-stone-300">
            Цена фиксируется после анкеты и короткого разбора. На старте
            можно использовать условия -20% для первых 5 проектов.
          </div>
        </aside>
      </div>
    </section>
  )
}

function NicheValueCards({ page }: { page: NichePage }) {
  return (
    <section className="bg-[#10130f] px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
        <ListCard title="Где обычно болит" items={page.pains} />
        <ListCard title="Что собираю" items={page.solution} />
        <ListCard title="Что должно измениться" items={page.result} />
      </div>
    </section>
  )
}

function NicheFaq({ page }: { page: NichePage }) {
  return (
    <section className="bg-[#0b0d0a] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">Частые вопросы</h2>
        <div className="mt-10 grid gap-3 lg:grid-cols-2 lg:items-start">
          {page.faq.map((item) => (
            <details key={item.q} className="group border border-stone-800 bg-[#151812]/70">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="text-2xl leading-none text-amber-200 transition group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-stone-800 px-5 pb-5 pt-4 leading-relaxed text-stone-300">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function NicheFinalCta({ page }: { page: NichePage }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
          Начать можно с <span className="text-gradient-brand">короткой диагностики</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-stone-300">
          Заполните анкету или пришлите задачу голосом. В ответ дам понятный
          первый шаг: что автоматизировать, сколько это может стоить и где
          ждать отдачу.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticCTA
            href="https://t.me/dmitry_hihol"
            target="_blank"
            rel="noopener noreferrer"
            goalName={`${page.slug}_bottom_anketa_click`}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-300 via-lime-300 to-emerald-400 px-7 py-4 text-base font-semibold text-[#0b0d0a] shadow-[0_0_40px_-8px_rgba(245,158,11,0.55)]"
          >
            Получить расчёт
            <ArrowIcon />
          </MagneticCTA>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-stone-700 bg-[#151812]/70 px-7 py-4 text-base font-semibold text-stone-200 transition-colors hover:border-amber-300/50 hover:text-amber-200"
          >
            На главную
          </a>
        </div>
      </div>
    </section>
  )
}

export default function NicheLandingPage({ page }: { page: NichePage }) {
  return (
    <main className="bg-[#0b0d0a] text-white">
      <NicheStructuredData page={page} />
      <NicheHero page={page} />
      <NicheValueCards page={page} />
      <NicheFaq page={page} />
      <NicheFinalCta page={page} />
      <SiteFooter variant="dark" />
    </main>
  )
}
