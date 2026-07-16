import Link from 'next/link'
import { AI_GUIDES, AI_SOLUTIONS } from '../../lib/aiData'
import AiSectionHeading from './AiSectionHeading'

export default function AiSolutions() {
  return (
    <section id="solutions" className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
      <AiSectionHeading eyebrow="Решения" title="Выберите процесс, а не модное название технологии" text="Каждая карточка ведёт на подробную страницу с задачами, составом решения, ориентиром цены и сроком." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {AI_SOLUTIONS.map((solution) => (
          <Link key={solution.href} href={solution.href} className="group flex min-h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-text)]">{solution.eyebrow}</p>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-[var(--accent-text)]">{solution.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-[var(--text-muted)]">{solution.text}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[var(--border)] pt-4 text-sm">
              <div><p className="text-[var(--text-muted)]">Бюджет</p><p className="mt-1 font-semibold">{solution.price}</p></div>
              <div><p className="text-[var(--text-muted)]">Срок</p><p className="mt-1 font-semibold">{solution.duration}</p></div>
            </div>
            <p className="mt-5 font-semibold text-[var(--accent-text)]">Подробнее →</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
        <h3 className="text-xl font-semibold">Гайды для самостоятельной оценки</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AI_GUIDES.map((guide) => <Link key={guide.href} href={guide.href} className="rounded-xl bg-[var(--surface)] p-4 font-semibold text-[var(--accent-text)] hover:shadow-md">{guide.title}</Link>)}
        </div>
      </div>
    </section>
  )
}
