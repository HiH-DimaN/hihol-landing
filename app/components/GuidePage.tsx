import type { GuidePage as GuidePageData } from '../lib/guidePages'
import {
  DATE_MODIFIED,
  DATE_MODIFIED_SHORT,
  DATE_PUBLISHED,
  SITE_NAME,
  SITE_URL,
  TELEGRAM_URL,
} from '../lib/site'
import TrackedLink from './TrackedLink'
import SiteFooter from './SiteFooter'
import AiHeader from './ai/AiHeader'

function GuideStructuredData({ guide }: { guide: GuidePageData }) {
  const url = `${SITE_URL}/${guide.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${guide.title} 2026`,
    description: guide.description,
    url,
    inLanguage: 'ru-RU',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'AI-решения', item: `${SITE_URL}/ai` },
      { '@type': 'ListItem', position: 3, name: `${guide.title} 2026`, item: url },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      {[articleSchema, breadcrumbSchema, faqSchema].map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

function GuideIntro({ guide }: { guide: GuidePageData }) {
  return (
    <>
      <a href="/ai" className="text-sm font-semibold text-[var(--accent-text)] hover:text-[var(--site-ink)]">
        ← К AI-решениям
      </a>
      <p className="mt-10 text-sm font-semibold text-[var(--accent-text)]">
        Гайд · обновлено {DATE_MODIFIED_SHORT}
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] md:text-6xl">
        {guide.title} в 2026 году
      </h1>
      <p className="mt-6 text-xl leading-relaxed text-[var(--site-muted)]">{guide.lead}</p>
      <div className="mt-8 border-y border-[color:var(--site-line)] py-5">
        <p className="text-sm font-semibold text-[var(--site-muted)]">Ориентир бюджета</p>
        <p className="mt-2 text-3xl font-semibold">{guide.price}</p>
      </div>
    </>
  )
}

function GuideSections({ guide }: { guide: GuidePageData }) {
  return (
    <div className="mt-12 grid gap-10">
      {guide.sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-3xl font-semibold leading-tight">{section.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--site-muted)]">{section.body}</p>
          {section.items && (
            <ul className="mt-5 grid gap-3">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="border-l-4 border-[var(--accent)] bg-white px-4 py-3 text-[var(--site-muted)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}

function GuideFaq({ guide }: { guide: GuidePageData }) {
  return (
    <section className="mt-14 border-y border-[color:var(--site-line)] py-10">
      <h2 className="text-3xl font-semibold">FAQ</h2>
      <div className="mt-6 grid gap-3">
        {guide.faq.map((item) => (
          <details key={item.q} className="group border border-[color:var(--site-line)] bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <span className="text-2xl leading-none text-[var(--accent-text)] transition group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-[color:var(--site-line)] px-5 pb-5 pt-4 leading-relaxed text-[var(--site-muted)]">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

function RelatedGuides({ guide }: { guide: GuidePageData }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">Связанные страницы</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {guide.related.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="border border-[color:var(--site-line)] bg-white p-4 font-semibold hover:border-[var(--site-ink)]"
          >
            {item.title}
          </a>
        ))}
      </div>
    </section>
  )
}

function GuideActions({ guide }: { guide: GuidePageData }) {
  return (
    <div className="mt-12 grid gap-3 sm:grid-cols-2">
      <TrackedLink
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        goalName="guide_brief_click"
        goalPayload={{ guide: guide.slug }}
        className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--site-ink)] px-6 py-3 text-center font-semibold text-white hover:bg-[var(--accent-strong)]"
      >
        Получить расчёт
      </TrackedLink>
      <TrackedLink
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        goalName="guide_telegram_click"
        goalPayload={{ guide: guide.slug }}
        className="inline-flex min-h-12 items-center justify-center border border-[color:var(--site-line)] bg-white px-6 py-3 text-center font-semibold hover:border-[var(--site-ink)]"
      >
        Написать в Telegram
      </TrackedLink>
    </div>
  )
}

export default function GuidePage({ guide }: { guide: GuidePageData }) {
  return (
    <div className="compliance-theme compliance-home ai-home min-h-screen">
      <AiHeader linkSectionsToHub />
      <main className="bg-[var(--bg)] text-[var(--text)]">
        <GuideStructuredData guide={guide} />
        <article className="px-5 py-14 sm:px-8 md:py-20">
          <div className="mx-auto max-w-4xl">
            <GuideIntro guide={guide} />
            <GuideSections guide={guide} />
            <GuideFaq guide={guide} />
            <RelatedGuides guide={guide} />
            <GuideActions guide={guide} />
          </div>
        </article>
      </main>
      <SiteFooter direction="ai" />
    </div>
  )
}
