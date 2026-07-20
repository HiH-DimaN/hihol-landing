import { AGENCY, CONTACT } from '../../lib/complianceData'
import TrackedLink from '../TrackedLink'

export default function AgencyPartner() {
  return (
    <section id="agencies" className="scroll-mt-20 bg-[var(--surface-2)] py-12 sm:py-16">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_70px_rgba(15,35,25,0.12)]">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-text)]">
                {AGENCY.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl">{AGENCY.h2}</h2>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{AGENCY.lead}</p>
              <div className="mt-6 rounded-2xl bg-[var(--accent)] p-5 text-[var(--accent-ink)]">
                <p className="text-2xl font-bold">{AGENCY.rate}</p>
                <p className="mt-1 text-sm font-medium">{AGENCY.rateNote}</p>
              </div>
            </div>

            <div>
              <div className="grid gap-3 sm:grid-cols-3">
                {AGENCY.benefits.map((benefit) => (
                  <article key={benefit.title} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                    <h3 className="text-sm font-semibold text-[var(--text)]">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{benefit.text}</p>
                  </article>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-[var(--accent)]/50 bg-[var(--accent)]/10 p-4">
                <p className="font-semibold text-[var(--text)]">{AGENCY.pilot}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{AGENCY.pilotNote}</p>
              </div>
              <TrackedLink
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                goalName="cta_agency_pilot"
                className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-center text-base font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-strong)] sm:w-auto"
              >
                {AGENCY.ctaLabel}
              </TrackedLink>
              <p className="mt-4 text-xs leading-relaxed text-[var(--text-muted)]">{AGENCY.boundary}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
