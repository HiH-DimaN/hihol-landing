import { FAQ } from '../../lib/complianceData'

export default function ComplianceFaq() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-2xl sm:text-3xl">{FAQ.h2}</h2>
      <div className="mt-6 grid gap-3">
        {FAQ.items.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 text-sm font-medium text-[var(--text)] sm:text-base">
              {item.q}
              <span className="shrink-0 text-[var(--accent)] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
