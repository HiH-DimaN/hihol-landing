import TrackedLink from '../TrackedLink'
import { SCANNER_DIFF } from '../../lib/complianceData'

export default function ScannerDiff() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-text)]">
        {SCANNER_DIFF.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl sm:text-3xl">{SCANNER_DIFF.h2}</h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
        {SCANNER_DIFF.lead}
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <h3 className="text-base font-semibold text-[var(--text)]">
            {SCANNER_DIFF.cannotTitle}
          </h3>
          <ul className="mt-4 grid gap-3">
            {SCANNER_DIFF.cannot.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-[var(--text-muted)]"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--danger)]/15 text-xs font-bold text-[var(--danger)]"
                  aria-hidden="true"
                >
                  ✕
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-5 sm:p-6">
          <h3 className="text-base font-semibold text-[var(--text)]">
            {SCANNER_DIFF.doTitle}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text)] sm:text-base">
            {SCANNER_DIFF.doText}
          </p>
          <TrackedLink
            href={SCANNER_DIFF.ctaHref}
            goalName="cta_scanner_diff"
            className="mt-5 inline-flex text-sm font-semibold text-[var(--accent-text)] underline underline-offset-4 hover:text-[var(--text)]"
          >
            {SCANNER_DIFF.ctaLabel}
          </TrackedLink>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left text-sm sm:text-base">
          <caption className="sr-only">{SCANNER_DIFF.tableCaption}</caption>
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-2)] text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
              {SCANNER_DIFF.tableHead.map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCANNER_DIFF.tableRows.map((row) => (
              <tr key={row[0]} className="border-b border-[var(--border)] last:border-b-0">
                <th scope="row" className="bg-[var(--surface)] px-4 py-3 font-normal text-[var(--text)]">
                  {row[0]}
                </th>
                <td className="whitespace-nowrap bg-[var(--surface)] px-4 py-3 text-[var(--text-muted)]">
                  {row[1]}
                </td>
                <td className="whitespace-nowrap bg-[var(--surface)] px-4 py-3 font-medium text-[var(--accent-text)]">
                  {row[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
