import { CONTACT, PRICING } from '../../lib/complianceData'
import TrackedLink from '../TrackedLink'

export default function PricingTiers() {
  return (
    <section id="pricing" className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-2xl sm:text-3xl">{PRICING.h2}</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {PRICING.tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col rounded-xl border bg-[var(--surface)] p-5 ${
              tier.popular
                ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]'
                : 'border-[var(--border)]'
            }`}
          >
            {tier.popular && (
              <span className="mb-3 inline-flex w-fit rounded-md bg-[var(--accent)] px-2 py-0.5 text-xs font-semibold text-[var(--accent-ink)]">
                популярный
              </span>
            )}
            <h3 className="text-base font-semibold text-[var(--text)]">{tier.name}</h3>
            <p className="mt-2 text-2xl font-bold text-[var(--text)]">{tier.price}</p>
            {tier.priceNote && (
              <p className="mt-1 text-sm text-[var(--text-muted)]">{tier.priceNote}</p>
            )}
            {tier.term && (
              <p className="mt-1 text-sm text-[var(--accent)]">{tier.term}</p>
            )}
            <ul className="mt-4 grid flex-1 gap-2 text-sm text-[var(--text-muted)]">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-[var(--accent)]">-</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {tier.addon && (
              <p className="mt-4 rounded-lg border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-2 text-sm font-medium text-[var(--text)]">
                {tier.addon}
              </p>
            )}
            <TrackedLink
              href={CONTACT.checkAnchor}
              goalName="cta_pricing_check"
              goalPayload={{ tier: tier.name }}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--accent)] px-4 text-center text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {PRICING.ctaLabel}
            </TrackedLink>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[var(--text-muted)]">
        {PRICING.extraLine1}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
        {PRICING.extraLine2}
      </p>
      <TrackedLink
        href={PRICING.pdfHref}
        goalName="download_price_pdf"
        className="mt-3 inline-flex text-sm font-medium text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-strong)]"
      >
        {PRICING.pdfLabel}
      </TrackedLink>
    </section>
  )
}
