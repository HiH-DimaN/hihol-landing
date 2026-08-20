import TrackedLink from '../TrackedLink'
import { BOTS_AI, CONTACT } from '../../lib/complianceData'

export default function BotsAi() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-text)]">
        {BOTS_AI.eyebrow}
      </p>
      <h2 className="mt-3 max-w-3xl text-2xl sm:text-3xl">{BOTS_AI.h2}</h2>
      <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
        {BOTS_AI.lead}
      </p>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {BOTS_AI.violations.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-relaxed text-[var(--text)]"
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--danger)]/15 text-xs font-bold text-[var(--danger)]"
              aria-hidden="true"
            >
              !
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
        {BOTS_AI.how}
      </p>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
        <TrackedLink
          href={CONTACT.telegram}
          target="_blank"
          rel="noopener noreferrer"
          goalName="cta_bots_ai"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-ink)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] sm:text-base"
        >
          {BOTS_AI.ctaLabel}
        </TrackedLink>
        <p className="text-sm font-medium text-[var(--text)]">{BOTS_AI.price}</p>
      </div>
    </section>
  )
}
