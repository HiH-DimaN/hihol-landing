import Link from 'next/link'
import { AI_FAQ } from '../../lib/aiData'
import { TELEGRAM_URL } from '../../lib/site'
import TrackedLink from '../TrackedLink'
import AiSectionHeading from './AiSectionHeading'

export function AiPrivacyBridge() {
  return (
    <section className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">Privacy-aware AI</p><h2 className="mt-3 text-3xl font-semibold">Маршрут данных проектируется вместе с автоматизацией</h2></div>
        <div><p className="leading-relaxed text-[var(--text-muted)]">Фиксируем источники данных, внешние сервисы, доступы, журналы и точки передачи человеку. Это не заменяет юридическую оценку, но делает технический контур наблюдаемым.</p><Link href="/" className="mt-5 inline-flex font-semibold text-[var(--accent-text)] underline underline-offset-4">Проверка сайта и интеграций по 152-ФЗ →</Link></div>
      </div>
    </section>
  )
}
export function AiFaq() {
  return (
    <section id="faq-ai" className="mx-auto max-w-[1120px] px-4 pb-16 sm:px-6 sm:pb-20">
      <AiSectionHeading eyebrow="FAQ" title="Вопросы до старта" />
      <div className="mt-8 grid gap-3 lg:grid-cols-2 lg:items-start">
        {AI_FAQ.map((item) => <details key={item.q} className="group rounded-xl border border-[var(--border)] bg-[var(--surface)]"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden"><span>{item.q}</span><span className="text-2xl text-[var(--accent-text)] transition group-open:rotate-45">+</span></summary><div className="border-t border-[var(--border)] px-5 pb-5 pt-4 leading-relaxed text-[var(--text-muted)]">{item.a}</div></details>)}
      </div>
    </section>
  )
}

export function AiFinalCta() {
  return (
    <section id="contacts-ai" className="ai-final-panel px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-200">Первый шаг</p><h2 className="mt-3 text-balance text-3xl font-semibold sm:text-5xl">Разберём один процесс и определим границы пилота</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">Пришлите задачу, пример входных данных и текущий способ работы. В ответ получите вопросы для оценки, возможный первый контур и диапазон бюджета.</p><TrackedLink href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" goalName="ai_final_telegram" className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[var(--accent)] px-7 font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)] sm:w-auto">Написать Дмитрию в Telegram</TrackedLink></div>
    </section>
  )
}
