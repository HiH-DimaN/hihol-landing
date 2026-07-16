import { AI_DELIVERABLES, AI_PROCESS } from '../../lib/aiData'
import AiSectionHeading from './AiSectionHeading'

export default function AiProcess() {
  return (
    <section id="process" className="border-y border-[var(--border)] bg-[var(--surface-2)]">
      <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
        <AiSectionHeading eyebrow="Как работаем" title="Четыре шага от процесса к передаваемой системе" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {AI_PROCESS.map((step) => (
            <article key={step.num} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-4xl font-semibold text-[var(--accent-text)]">{step.num}</p>
              <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{step.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-8 rounded-2xl bg-[var(--text)] p-6 text-white sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-200">Результат передачи</p>
            <h3 className="mt-3 text-2xl font-semibold">Систему можно проверить, поддерживать и передать</h3>
          </div>
          <ul className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            {AI_DELIVERABLES.map((item) => <li key={item} className="flex gap-3"><span className="text-teal-200">✓</span><span>{item}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
