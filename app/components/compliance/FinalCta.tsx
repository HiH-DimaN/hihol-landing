import { CONTACT, FINAL_CTA } from '../../lib/complianceData'
import TrackedLink from '../TrackedLink'

export default function FinalCta() {
  return (
    <section
      id="check"
      className="mx-auto max-w-[1080px] scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="compliance-final-panel overflow-hidden rounded-3xl px-5 py-10 text-center shadow-[0_24px_70px_rgba(15,35,25,0.18)] sm:px-12 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
          {FINAL_CTA.eyebrow}
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-2xl text-white sm:text-4xl">
          {FINAL_CTA.h2}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {FINAL_CTA.text}
        </p>
        <TrackedLink
          href={CONTACT.telegram}
          target="_blank"
          rel="noopener noreferrer"
          goalName="cta_final_telegram"
          className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[var(--accent)] px-7 text-base font-semibold text-[var(--accent-ink)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:w-auto sm:text-lg"
        >
          {FINAL_CTA.ctaLabel}
        </TrackedLink>
        <p className="mt-4 text-sm text-slate-300">{FINAL_CTA.tgLine}</p>
        <p className="mt-2 text-xs text-slate-400">{FINAL_CTA.boundary}</p>
      </div>
    </section>
  )
}
