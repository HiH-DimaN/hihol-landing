import { FINES } from '../../lib/complianceData'

export default function FinesTable() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-2xl sm:text-3xl">{FINES.h2}</h2>
      <p className="mt-3 text-sm text-[var(--text-muted)]">{FINES.note}</p>
      <a
        href={FINES.sourceHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex text-xs font-medium text-[var(--accent-text)] underline underline-offset-2 hover:text-[var(--text)] sm:text-sm"
      >
        {FINES.sourceLabel}
      </a>

      <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left">
          <tbody>
            {FINES.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[var(--border)] last:border-b-0"
              >
                <td className="bg-[var(--surface)] px-4 py-4 text-sm text-[var(--text)] sm:text-base">
                  {row.label}
                </td>
                <td className="whitespace-nowrap bg-[var(--surface)] px-4 py-4 text-right text-sm font-semibold text-[var(--danger)] sm:text-base">
                  {row.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
        {FINES.footNote}
      </p>
    </section>
  )
}
