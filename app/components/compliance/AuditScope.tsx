import { DELIVERABLES } from '../../lib/complianceData'

// Monoline inline SVG icons (no external deps).
const icons = [
  'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  'M12 2l7 4v6c0 5-3 8-7 10-4-2-7-5-7-10V6l7-4z',
  'M4 4h16v12H4z M4 20h16',
  'M7 3h10l4 4v14H3V3h4z M13 3v5h5',
  'M3 6h18M3 12h18M3 18h18',
  'M15 10l4.5-4.5M9 14l-4.5 4.5M4 4l16 16',
]

export default function AuditScope() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-2xl sm:text-3xl">{DELIVERABLES.h2}</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DELIVERABLES.cards.map((card, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d={icons[i]} />
            </svg>
            <h3 className="mt-3 text-base font-semibold text-[var(--text)]">
              {card.title}
            </h3>
            <p className="mt-1 text-sm leading-snug text-[var(--text-muted)]">
              {card.line}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 rounded-lg border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-3 text-sm font-medium text-[var(--text)]">
        {DELIVERABLES.footNote}
      </p>
    </section>
  )
}
