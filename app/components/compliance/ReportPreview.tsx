import { REPORT_PREVIEW } from '../../lib/complianceData'

const reportDetails = [
  {
    label: REPORT_PREVIEW.observation.evidenceLabel,
    text: REPORT_PREVIEW.observation.evidence,
    mark: '01',
  },
  {
    label: REPORT_PREVIEW.observation.impactLabel,
    text: REPORT_PREVIEW.observation.impact,
    mark: '02',
  },
  {
    label: REPORT_PREVIEW.observation.fixLabel,
    text: REPORT_PREVIEW.observation.fix,
    mark: '03',
  },
]

type ReportDetailProps = (typeof reportDetails)[number]

function ReportDetail({ label, text, mark }: ReportDetailProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 sm:grid-cols-[42px_1fr]">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)] text-xs font-bold text-[var(--accent-ink)]">
        {mark}
      </span>
      <div>
        <h4 className="text-sm font-semibold text-[var(--text)]">{label}</h4>
        <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
      </div>
    </div>
  )
}

function ReportCard() {
  const { observation } = REPORT_PREVIEW

  return (
    <article
      aria-label={REPORT_PREVIEW.frameLabel}
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_22px_60px_rgba(15,35,25,0.12)]"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--bg)] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {REPORT_PREVIEW.frameLabel}
        </p>
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              {observation.kind}
            </p>
            <h3 className="mt-2 max-w-xl text-lg font-semibold leading-snug text-[var(--text)] sm:text-xl">
              {observation.title}
            </h3>
          </div>
          <div className="shrink-0 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
              {observation.priorityLabel}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[var(--danger)]">
              {observation.priority}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {reportDetails.map((detail) => (
            <ReportDetail key={detail.label} {...detail} />
          ))}
        </div>
      </div>
    </article>
  )
}

export default function ReportPreview() {
  return (
    <section className="bg-[var(--surface-2)] py-12 sm:py-16">
      <div className="mx-auto grid max-w-[1080px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-text)]">
            {REPORT_PREVIEW.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl">{REPORT_PREVIEW.h2}</h2>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
            {REPORT_PREVIEW.lead}
          </p>
          <p className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-relaxed text-[var(--text-muted)]">
            {REPORT_PREVIEW.boundary}
          </p>
        </div>
        <ReportCard />
      </div>
    </section>
  )
}
