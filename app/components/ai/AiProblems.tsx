import { AI_PAINS, AI_REASONS } from '../../lib/aiData'
import AiSectionHeading from './AiSectionHeading'

export default function AiProblems() {
  return (
    <>
      <section className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
        <AiSectionHeading eyebrow="Где теряется ресурс" title="AI имеет смысл там, где уже есть повторяемая потеря" text="Начинаем не с модели или бота, а с конкретного процесса, который можно увидеть, измерить и проверить." />
        <div className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {AI_PAINS.map((item, index) => (
            <article key={item.title} className="grid gap-3 py-6 md:grid-cols-[90px_0.75fr_1fr] md:items-start">
              <p className="text-sm font-semibold text-[var(--accent-text)]">0{index + 1}</p>
              <h3 className="text-xl font-semibold sm:text-2xl">{item.title}</h3>
              <p className="leading-relaxed text-[var(--text-muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-y border-[var(--border)] bg-[var(--surface-2)]">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
          <AiSectionHeading eyebrow="Дисциплина внедрения" title="Как не превратить AI в ещё один неконтролируемый сервис" />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {AI_REASONS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
