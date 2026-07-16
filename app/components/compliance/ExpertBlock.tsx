import { CONTACT, EXPERT } from '../../lib/complianceData'

export default function ExpertBlock() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-2xl sm:text-3xl">{EXPERT.h2}</h2>
      <div className="mt-6 grid gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-xl bg-[var(--surface-2)] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent-text)]">
            Дмитрий Хихол
          </p>
          <p className="mt-4 text-2xl font-semibold text-[var(--text)]">20 лет</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
            CEO / COO / CCO · MBA · проверяю лично
          </p>
        </aside>
        <div>
          <p className="max-w-2xl leading-relaxed text-[var(--text-muted)]">{EXPERT.text}</p>
          <a
            href={CONTACT.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-text)]"
          >
            {EXPERT.linkLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
