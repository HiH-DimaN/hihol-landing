import Link from 'next/link'
import { AI_PAGE, CONTACT } from '../lib/complianceData'
import SiteFooter from './SiteFooter'

export default function AiSolutionsPage() {
  return (
    <div className="compliance-theme min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
        <nav className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-[var(--text)]">
            HIHOL
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
          >
            Проверка 152-ФЗ
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="max-w-3xl text-3xl leading-tight sm:text-4xl">{AI_PAGE.h1}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          {AI_PAGE.subtitle}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AI_PAGE.tiles.map((tile) => (
            <div
              key={tile.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <h2 className="text-base font-semibold text-[var(--text)]">{tile.title}</h2>
              <p className="mt-1 text-sm leading-snug text-[var(--text-muted)]">
                {tile.line}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl">{AI_PAGE.how.title}</h2>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {AI_PAGE.how.steps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)]">
                  {step}
                </span>
                {i < AI_PAGE.how.steps.length - 1 && (
                  <span className="text-[var(--accent)]">-&gt;</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-xl font-semibold text-[var(--text)] sm:text-2xl">
            {AI_PAGE.stack.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-[var(--text-muted)]">
            {AI_PAGE.stack.text}
          </p>
        </div>

        <div className="mt-10">
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[var(--accent)] px-6 text-base font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-strong)]"
          >
            {AI_PAGE.ctaLabel}
          </a>
        </div>

        <p className="mt-12 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)]">
          {AI_PAGE.bridge} -{' '}
          <Link
            href="/"
            className="font-medium text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-strong)]"
          >
            перейти на главную
          </Link>
        </p>
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
