import { FAQ } from '../../lib/complianceData'

export default function ComplianceFaq() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-2xl sm:text-3xl">{FAQ.h2}</h2>
      <p className="mt-3 text-sm text-[var(--text-muted)]">{FAQ.actualityLine}</p>
      <div className="mt-6 grid gap-3">
        {FAQ.items.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          >
            <summary className="cursor-pointer list-none py-1">
              <h3 className="flex items-center justify-between gap-4 text-sm font-medium text-[var(--text)] sm:text-base">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[var(--accent-text)] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </h3>
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
