import Image from 'next/image'
import { CONTACT, HERO } from '../../lib/complianceData'

export default function ComplianceHero() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="text-3xl leading-tight sm:text-4xl md:text-5xl">{HERO.h1}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            {HERO.subtitle}
          </p>
          <a
            href={CONTACT.checkAnchor}
            className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[var(--accent)] px-6 text-base font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-strong)]"
          >
            {HERO.ctaLabel}
          </a>
          <p className="mt-3 text-sm text-[var(--text-muted)]">{HERO.ctaNote}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex items-center gap-4">
            <Image
              src="/dmitry.jpg"
              alt={HERO.expert.name}
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 rounded-full object-cover"
              priority
            />
            <div>
              <p className="font-semibold text-[var(--text)]">{HERO.expert.name}</p>
              <p className="mt-1 text-sm leading-snug text-[var(--text-muted)]">
                {HERO.expert.line}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
