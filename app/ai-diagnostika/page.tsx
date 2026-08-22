import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import AiDiagnosticForm from '../components/AiDiagnosticForm'
import SiteFooter from '../components/SiteFooter'
import AiHeader from '../components/ai/AiHeader'
import { AI_INTAKE_RESULTS } from '../lib/aiIntakeData'
import { OG_IMAGE, TWITTER_IMAGE } from '../lib/seo'
import { SITE_NAME, SITE_URL, TELEGRAM_URL } from '../lib/site'

const canonical = `${SITE_URL}/ai-diagnostika`
const description = 'Структурированная анкета по AI-автоматизации: процесс, объём, системы и ограничения. Предварительная карта решения и диапазон бюджета без Google Forms.'

export const metadata: Metadata = {
  title: `Предварительная AI-диагностика — ${SITE_NAME}`,
  description,
  alternates: { canonical },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    title: `Предварительная AI-диагностика — ${SITE_NAME}`,
    description,
    url: canonical,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Предварительная AI-диагностика — ${SITE_NAME}`,
    description,
    images: [TWITTER_IMAGE],
  },
}

function StructuredData() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Предварительная AI-диагностика',
      description,
      url: canonical,
      inLanguage: 'ru-RU',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'AI-решения', item: `${SITE_URL}/ai` },
        { '@type': 'ListItem', position: 3, name: 'AI-диагностика', item: canonical },
      ],
    },
  ]
  return <>{schemas.map((schema) => <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}</>
}

export default function AiDiagnosticPage() {
  return (
    <div className="compliance-theme compliance-home ai-home min-h-screen">
      <AiHeader linkSectionsToHub />
      <main className="bg-[var(--bg)] text-[var(--text)]">
        <StructuredData />
        <section className="ai-home-hero px-4 py-14 text-white sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1120px]">
            <Link href="/ai" className="text-sm font-semibold text-teal-200">← К AI-решениям</Link>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">Первый структурированный шаг</p>
                <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[58px]">Предварительная AI-диагностика</h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">Опишите один повторяющийся процесс. Я проверю, где оправдана автоматизация, что войдёт в первый пилот и какой диапазон бюджета реалистичен. Оценка сценарная: она не является гарантией ROI и уточняется после разговора и проверки данных.</p>
              </div>
              <aside className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold">Что получите в предварительном разборе</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-slate-300">
                  {AI_INTAKE_RESULTS.map((item) => <li key={item} className="flex gap-3"><span className="font-semibold text-teal-200">—</span><span>{item}</span></li>)}
                </ul>
                <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-slate-300">Не готовы заполнять анкету? <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-200 underline underline-offset-4">Задайте вопрос в Telegram</a>.</p>
              </aside>
            </div>
          </div>
        </section>
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Suspense fallback={<div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-[var(--text-muted)]">Загружаю анкету…</div>}>
              <AiDiagnosticForm />
            </Suspense>
            <p className="mt-6 text-sm leading-relaxed text-[var(--text-muted)]">Данные используются только для ответа на обращение и подготовки предварительного разбора. Не прикладывайте персональные данные клиентов, пароли и конфиденциальные документы.</p>
          </div>
        </section>
      </main>
      <SiteFooter direction="ai" />
    </div>
  )
}
