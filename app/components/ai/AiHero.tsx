import Image from 'next/image'
import Link from 'next/link'
import { AI_CAPABILITIES, AI_HERO } from '../../lib/aiData'
import { aiIntakeHref } from '../../lib/aiIntakeData'
import { TELEGRAM_CHANNEL_URL, TELEGRAM_URL } from '../../lib/site'
import TrackedLink from '../TrackedLink'

export function AiCapabilityStrip() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#0b221d] py-3 text-white">
      <div className="marquee-track flex gap-10 text-xs text-white/75 sm:text-sm">
        {[...Array(4)].flatMap((_, copy) =>
          AI_CAPABILITIES.map((item) => (
            <span
              key={`${copy}-${item}`}
              aria-hidden={copy > 0 || undefined}
              className={copy > 0 ? 'marquee-dup whitespace-nowrap' : 'whitespace-nowrap'}
            >
              {item}
            </span>
          )),
        )}
      </div>
    </div>
  )
}
export default function AiHero() {
  return (
    <section className="ai-home-hero relative overflow-hidden text-white">
      <div className="compliance-home-grid absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1120px] gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">{AI_HERO.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-[58px]">
            {AI_HERO.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{AI_HERO.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href={aiIntakeHref('ai_hero')} goalName="ai_hero_diagnostic" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[var(--accent)] px-6 font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">
              {AI_HERO.primaryCta}
            </TrackedLink>
            <Link href="#solutions" className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/20 px-6 font-semibold text-white hover:bg-white/10">
              {AI_HERO.secondaryCta}
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-300">Не готовы к анкете? <TrackedLink href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" goalName="ai_hero_telegram" className="font-semibold text-teal-200 underline underline-offset-4">Задайте вопрос в Telegram</TrackedLink>.</p>
          <div className="mt-8 grid gap-0 border-y border-white/15 text-sm text-slate-300 sm:grid-cols-3">
            {AI_HERO.trust.map((item) => <p key={item} className="border-b border-white/15 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">{item}</p>)}
          </div>
        </div>
        <aside className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <Image src="/dmitry-color.jpg" alt={AI_HERO.expert.name} width={104} height={128} priority className="h-32 w-[104px] shrink-0 rounded-xl object-cover" />
            <div>
              <h2 className="text-2xl font-semibold">{AI_HERO.expert.name}</h2>
              <p className="mt-2 text-sm font-semibold text-teal-200">{AI_HERO.expert.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{AI_HERO.expert.text}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-2 border-t border-white/10 pt-5 text-sm">
            <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-teal-200">Telegram-канал</a>
            <a href="https://github.com/HiH-DimaN" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-teal-200">GitHub</a>
          </div>
        </aside>
      </div>
    </section>
  )
}
