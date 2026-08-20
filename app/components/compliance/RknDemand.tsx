import TrackedLink from '../TrackedLink'
import { CONTACT, RKN_DEMAND } from '../../lib/complianceData'

export default function RknDemand() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <div className="rounded-2xl border border-[var(--danger)]/40 bg-[var(--surface)] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--danger)]">
          {RKN_DEMAND.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-2xl sm:text-3xl">{RKN_DEMAND.h2}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          {RKN_DEMAND.lead}
        </p>

        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {RKN_DEMAND.steps.map((step, i) => (
            <li
              key={step}
              className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm leading-relaxed text-[var(--text)]"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-bold text-[var(--accent-text)]"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <TrackedLink
          href={CONTACT.telegram}
          target="_blank"
          rel="noopener noreferrer"
          goalName="cta_rkn_demand"
          className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-ink)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] sm:text-base"
        >
          {RKN_DEMAND.ctaLabel}
        </TrackedLink>

        <p className="mt-4 max-w-3xl border-l border-[var(--danger)]/40 pl-3 text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
          {RKN_DEMAND.boundary}
        </p>
      </div>
    </section>
  )
}
