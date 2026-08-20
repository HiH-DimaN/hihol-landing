import Image from 'next/image'
import TrackedLink from '../TrackedLink'
import { CONTACT, HERO } from '../../lib/complianceData'

export default function ComplianceHero() {
  return (
    <section className="compliance-home-hero relative overflow-hidden">
      <div className="compliance-home-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1080px] items-center gap-10 px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200 sm:text-sm">
            {HERO.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[56px]">
            {HERO.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {HERO.subtitle}
          </p>
          <TrackedLink
            href={CONTACT.checkAnchor}
            goalName="cta_hero_check"
            className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-base font-semibold text-[var(--accent-ink)] shadow-[0_12px_30px_rgba(43,175,105,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:w-auto"
          >
            {HERO.ctaLabel}
          </TrackedLink>
          <p className="mt-3 text-sm text-slate-300">{HERO.ctaNote}</p>
          <p className="mt-5 max-w-2xl border-l border-emerald-300/40 pl-3 text-xs leading-relaxed text-slate-400 sm:text-sm">
            {HERO.boundary}
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
            {HERO.preview.eyebrow}
          </p>
          <h2 className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">
            {HERO.preview.title}
          </h2>
          <ul className="mt-5 grid gap-3">
            {HERO.preview.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-200">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-300/15 text-xs font-bold text-emerald-200">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
            <Image
              src="/dmitry-color.jpg"
              alt={HERO.expert.name}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white/15"
              priority
            />
            <div>
              <p className="font-semibold text-white">{HERO.expert.name}</p>
              <p className="mt-1 text-xs leading-snug text-slate-300 sm:text-sm">
                {HERO.expert.line}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
