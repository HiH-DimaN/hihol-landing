import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import LeadForm from '../components/LeadForm'
import SiteFooter from '../components/SiteFooter'
import { SITE_NAME } from '../lib/site'

export const metadata: Metadata = {
  title: `Оставить заявку — ${SITE_NAME}`,
  description:
    'Короткая анкета: расскажите о задаче — предложу понятный первый шаг по автоматизации.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <main className="overflow-x-hidden bg-[var(--site-bg)] text-[var(--site-ink)]">
      <article className="mx-auto max-w-2xl px-5 py-12 sm:px-8 md:py-16">
        <Link
          href="/"
          className="text-sm font-semibold text-[var(--site-muted)] underline underline-offset-4 hover:text-[var(--site-green)]"
        >
          ← На главную
        </Link>

        <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Оставить заявку
        </h1>
        <p className="mt-3 text-[var(--site-muted)]">
          Заполните короткую анкету — расскажу понятный первый шаг: что автоматизировать,
          сколько это может стоить и где ждать отдачу.
        </p>

        <div className="mt-8">
          <Suspense fallback={null}>
            <LeadForm />
          </Suspense>
        </div>
      </article>
      <SiteFooter />
    </main>
  )
}
