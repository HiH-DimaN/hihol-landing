const fit = [
  'Компания 10–100 человек',
  'Оборот от 3 млн ₽/мес',
  'Сотрудники тратят 4+ часов на рутину',
  'Готовы 2–4 ч/неделю на работу со мной',
]

const notFit = [
  'Микробизнес до 5 человек',
  'Ищете фрилансера за 30K',
  'Ждёте, что AI решит всё без команды',
]

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function AudienceSection() {
  return (
    <section
      id="audience"
      className="relative overflow-hidden bg-slate-900 px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-40"
      />

      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 text-balance text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
          Кому я <span className="text-gradient-brand">подхожу</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="group relative rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-transparent p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_0_50px_-12px_rgba(52,211,153,0.45)]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Подходит
            </div>
            <ul className="space-y-4">
              {fit.map((item) => (
                <li key={item} className="flex gap-3 text-slate-100">
                  <span className="mt-0.5 text-emerald-400">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="group relative rounded-2xl border border-rose-400/20 bg-gradient-to-br from-rose-500/10 via-slate-900/40 to-transparent p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/50 hover:shadow-[0_0_50px_-12px_rgba(251,113,133,0.45)]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-rose-300">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              Не подходит
            </div>
            <ul className="space-y-4">
              {notFit.map((item) => (
                <li key={item} className="flex gap-3 text-slate-100">
                  <span className="mt-0.5 text-rose-400">
                    <XIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
