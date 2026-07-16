import { AI_ECONOMICS, AI_PRICE_GROUPS } from '../../lib/aiData'
import { TELEGRAM_URL } from '../../lib/site'
import TrackedLink from '../TrackedLink'
import AiSectionHeading from './AiSectionHeading'

export default function AiPricing() {
  return (
    <section id="pricing-ai" className="border-y border-[var(--border)] bg-[var(--surface-2)]">
      <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
        <AiSectionHeading eyebrow="Цена и экономика" title="Диапазон виден заранее, точность появляется после диагностики" text="Цена зависит от числа сценариев, интеграций, качества данных, ролей и требований к журналированию. До кода фиксируются объём, этапы и критерии приёмки." />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {AI_PRICE_GROUPS.map((group) => (
            <article key={group.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                <p className="text-2xl font-bold">{group.price}</p>
                <p className="text-sm font-semibold text-[var(--accent-text)]">{group.duration}</p>
              </div>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{group.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold">Что нужно для первичной оценки</h3>
            <ul className="mt-5 grid gap-3 text-[var(--text-muted)]">
              {AI_ECONOMICS.map((item) => <li key={item} className="flex gap-3"><span className="font-semibold text-[var(--accent-text)]">—</span><span>{item}</span></li>)}
            </ul>
          </div>
          <div className="flex flex-col justify-between rounded-xl bg-[var(--text)] p-6 text-white">
            <p className="leading-relaxed text-slate-300">Пришлите описание процесса или голосовое сообщение. Если задача пока не требует разработки, скажу об этом до оценки проекта.</p>
            <TrackedLink href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" goalName="ai_pricing_telegram" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--accent)] px-5 font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">Получить первичную оценку</TrackedLink>
          </div>
        </div>
      </div>
    </section>
  )
}
