import { CONTACT, PRICING } from '../../lib/complianceData'
import TrackedLink from '../TrackedLink'

type PricingTier = (typeof PRICING.tiers)[number]
type PricingExtra = (typeof PRICING.extras)[number]

function PricingTierCard({ tier }: { tier: PricingTier }) {
  return (
    <div
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
      {tier.term && <p className="mt-1 text-sm font-medium text-[var(--accent-text)]">{tier.term}</p>}
      <ul className="mt-4 grid flex-1 gap-2 text-sm text-[var(--text-muted)]">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="text-[var(--accent-text)]">-</span>
            <span>{feature}</span>
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
        className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--accent)] px-4 text-center text-sm font-semibold text-[var(--accent-text)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        {PRICING.ctaLabel}
      </TrackedLink>
    </div>
  )
}

function PricingExtraCard({ extra }: { extra: PricingExtra }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-sm font-semibold text-[var(--text)]">{extra.name}</p>
      <p className="mt-2 text-lg font-bold text-[var(--accent-text)]">{extra.price}</p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{extra.note}</p>
    </div>
  )
}

function SupportCard() {
  return (
    <div className="mt-5 grid gap-5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-5 md:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-sm font-semibold text-[var(--text)]">{PRICING.support.name}</p>
        <p className="mt-2 text-2xl font-bold text-[var(--text)]">{PRICING.support.price}</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
          {PRICING.support.priceNote}
        </p>
      </div>
      <ul className="grid gap-2 text-sm text-[var(--text-muted)] sm:grid-cols-2">
        {PRICING.support.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="text-[var(--accent-text)]">-</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AuditCredit() {
  return (
    <aside className="mt-6 overflow-hidden rounded-2xl border border-[var(--accent)] bg-[var(--surface-2)] shadow-[0_18px_50px_rgba(15,35,25,0.1)]">
      <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            {PRICING.credit.eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">
            {PRICING.credit.title}
          </h3>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            {PRICING.credit.text}
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--text)]">
            {PRICING.credit.boundary}
          </p>
        </div>
      </div>
    </aside>
  )
}

export default function PricingTiers() {
  return (
    <section id="pricing" className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-2xl sm:text-3xl">{PRICING.h2}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text)]">{PRICING.answer}</p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
        {PRICING.lead}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {PRICING.tiers.map((tier) => (
          <PricingTierCard key={tier.name} tier={tier} />
        ))}
      </div>

      <AuditCredit />

      <h3 className="mt-8 text-lg font-semibold text-[var(--text)]">После основного аудита</h3>
      <SupportCard />

      <h3 className="mt-8 text-lg font-semibold text-[var(--text)]">Дополнительные услуги</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {PRICING.extras.map((extra) => (
          <PricingExtraCard key={extra.name} extra={extra} />
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left text-sm sm:text-base">
          <caption className="px-4 py-3 text-left text-sm font-semibold text-[var(--text)]">
            {PRICING.summaryCaption}
          </caption>
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-2)] text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
              {PRICING.summaryHead.map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRICING.summaryRows.map((row) => (
              <tr key={row[0]} className="border-b border-[var(--border)] last:border-b-0">
                <th scope="row" className="bg-[var(--surface)] px-4 py-3 font-normal text-[var(--text)]">
                  {row[0]}
                </th>
                <td className="whitespace-nowrap bg-[var(--surface)] px-4 py-3 font-semibold text-[var(--text)]">
                  {row[1]}
                </td>
                <td className="whitespace-nowrap bg-[var(--surface)] px-4 py-3 text-[var(--text-muted)]">
                  {row[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-[var(--text-muted)]">
        {PRICING.termsNote}
      </p>
      <TrackedLink
        href={PRICING.pdfHref}
        goalName="download_price_pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-medium text-[var(--accent-text)] underline underline-offset-2 hover:text-[var(--accent-strong)]"
      >
        {PRICING.pdfLabel}
      </TrackedLink>
    </section>
  )
}
