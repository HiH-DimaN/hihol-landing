import Link from 'next/link'
import type { NichePage } from '../lib/nichePages'
import { DATE_MODIFIED, DATE_PUBLISHED, SITE_NAME, SITE_URL, TELEGRAM_URL } from '../lib/site'
import SiteFooter from './SiteFooter'
import TrackedLink from './TrackedLink'
import AiHeader from './ai/AiHeader'

function createFaqSchema(page: NichePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
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
    provider: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    areaServed: 'Россия',
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
    },
  }
}

function createBreadcrumbSchema(page: NichePage, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'AI-решения', item: `${SITE_URL}/ai` },
      { '@type': 'ListItem', position: 3, name: page.title, item: url },
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
  return <>{schemas.map((schema) => <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}</>
}

function NicheHero({ page }: { page: NichePage }) {
  return (
    <section className="ai-home-hero relative overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="compliance-home-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <Link href="/ai" className="text-sm font-semibold text-teal-200">← Все AI-решения</Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">{page.eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] md:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">{page.lead}</p>
          <TrackedLink href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" goalName={`${page.slug}_telegram_click`} className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[var(--accent)] px-7 font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">Обсудить задачу</TrackedLink>
        </div>
        <aside className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-200">Ориентир</p>
          <p className="mt-4 text-3xl font-semibold">{page.price}</p>
          <p className="mt-2 text-slate-300">{page.duration}</p>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-slate-300">Точная цена фиксируется после разбора процесса, данных, интеграций и критериев приёмки.</p>
        </aside>
      </div>
    </section>
  )
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-[var(--text-muted)]">
        {items.map((item) => <li key={item} className="flex gap-3"><span className="font-semibold text-[var(--accent-text)]">—</span><span>{item}</span></li>)}
      </ul>
    </article>
  )
}

function NicheValueCards({ page }: { page: NichePage }) {
  return (
    <section className="mx-auto grid max-w-[1120px] gap-5 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-3">
      <ListCard title="Где обычно болит" items={page.pains} />
      <ListCard title="Что собираю" items={page.solution} />
      <ListCard title="Что должно измениться" items={page.result} />
    </section>
  )
}

function NicheFaq({ page }: { page: NichePage }) {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface-2)] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1120px]">
        <h2 className="text-3xl font-semibold md:text-4xl">Частые вопросы</h2>
        <div className="mt-8 grid gap-3 lg:grid-cols-2 lg:items-start">
          {page.faq.map((item) => <details key={item.q} className="group rounded-xl border border-[var(--border)] bg-[var(--surface)]"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden"><span>{item.q}</span><span className="text-2xl text-[var(--accent-text)] transition group-open:rotate-45">+</span></summary><div className="border-t border-[var(--border)] px-5 pb-5 pt-4 leading-relaxed text-[var(--text-muted)]">{item.a}</div></details>)}
        </div>
      </div>
    </section>
  )
}

function NicheFinalCta({ page }: { page: NichePage }) {
  return (
    <section className="ai-final-panel px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl text-center"><h2 className="text-balance text-3xl font-semibold md:text-5xl">Начать можно с короткой диагностики</h2><p className="mt-6 text-lg leading-relaxed text-slate-300">Пришлите описание процесса. В ответ определим возможный первый контур, вопросы к данным и порядок оценки.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><TrackedLink href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" goalName={`${page.slug}_bottom_telegram_click`} className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[var(--accent)] px-7 font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">Написать в Telegram</TrackedLink><Link href="/ai" className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/20 px-7 font-semibold hover:bg-white/10">Вернуться к AI-решениям</Link></div></div>
    </section>
  )
}

export default function NicheLandingPage({ page }: { page: NichePage }) {
  return (
    <div className="compliance-theme compliance-home ai-home min-h-screen">
      <AiHeader linkSectionsToHub />
      <main>
        <NicheStructuredData page={page} />
        <NicheHero page={page} />
        <NicheValueCards page={page} />
        <NicheFaq page={page} />
        <NicheFinalCta page={page} />
      </main>
      <SiteFooter direction="ai" />
    </div>
  )
}
