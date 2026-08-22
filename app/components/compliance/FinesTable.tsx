import { FINES } from '../../lib/complianceData'

export default function FinesTable() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-2xl sm:text-3xl">{FINES.h2}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text)]">{FINES.answer}</p>
      <p className="mt-3 text-sm text-[var(--text-muted)]">{FINES.note}</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{FINES.tableCaption}</caption>
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-2)] text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
              {FINES.tableHead.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`px-4 py-3 font-semibold ${i === 2 ? 'text-right' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FINES.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[var(--border)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="bg-[var(--surface)] px-4 py-4 text-left text-sm font-normal text-[var(--text)] sm:text-base"
                >
                  {row.label}
                </th>
                <td className="whitespace-nowrap bg-[var(--surface)] px-4 py-4 text-sm text-[var(--text-muted)] sm:text-base">
                  {row.part}
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
      <p className="mt-3 text-xs text-[var(--text-muted)] sm:text-sm">
        Источники:{' '}
        {FINES.sources.map((src, i) => (
          <span key={src.href}>
            {i > 0 && ' · '}
            <a
              href={src.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--accent-text)] underline underline-offset-2 hover:text-[var(--text)]"
            >
              {src.label}
            </a>
          </span>
        ))}
      </p>
    </section>
  )
}
