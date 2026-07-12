import { CONTACT, FINAL_CTA } from '../../lib/complianceData'

export default function FinalCta() {
  return (
    <section
      id="check"
      className="mx-auto max-w-[1080px] scroll-mt-20 px-4 py-16 text-center sm:px-6"
    >
      <h2 className="text-2xl sm:text-3xl">{FINAL_CTA.h2}</h2>
      <a
        href={CONTACT.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-[var(--accent)] px-8 text-base font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-strong)] sm:text-lg"
      >
        {FINAL_CTA.ctaLabel}
      </a>
      <p className="mt-4 text-sm text-[var(--text-muted)]">{FINAL_CTA.tgLine}</p>
    </section>
  )
}
