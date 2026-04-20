type Case = {
  emoji: string
  title: string
  task: string
  solution: string
  result: string
  duration?: string
  muted?: boolean
}

const cases: Case[] = [
  {
    emoji: '📦',
    title: 'Управление складом селлера через Telegram',
    task: 'Селлер на маркетплейсах, 1200+ SKU, 3 склада, команда 4. Excel и WhatsApp. 3–4 ч/день на «понять».',
    solution: 'TMA — остатки real-time, алерты, сканирование.',
    result: '−3 часа в день, 0 ситуаций «товар кончился незаметно» за 2 мес.',
    duration: '14 дней',
  },
  {
    emoji: '🏥',
    title: 'Умная запись в клинике',
    task: 'Клиника, 3 администратора, 80+ записей/день. Пиковые часы — потерянные звонки.',
    solution:
      'TMA с двусторонней синхронизацией с Google Calendar врачей.',
    result:
      '62% записей через бота, −35 ч/нед администраторам, потери в нерабочее 40/мес → 0.',
    duration: '14 дней',
  },
  {
    emoji: '💡',
    title: 'Скоро',
    task: 'Следующий проект в работе.',
    solution: 'Результаты опубликую после завершения.',
    result: 'Подписывайтесь на канал.',
    muted: true,
  },
]

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  )
}

function CaseCard({ c }: { c: Case }) {
  return (
    <article
      className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
        c.muted
          ? 'border-dashed border-slate-700/80 bg-slate-900/30'
          : 'border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_40px_-16px_rgba(34,211,238,0.5)]'
      }`}
    >
      {!c.muted && (
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl transition-colors duration-300 group-hover:bg-violet-500/20"
        />
      )}

      <div
        aria-hidden="true"
        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
          c.muted
            ? 'border border-dashed border-slate-700 bg-slate-900/60'
            : 'bg-gradient-to-br from-cyan-500/20 to-violet-500/20'
        }`}
      >
        <span>{c.emoji}</span>
      </div>

      <h3
        className={`relative text-xl font-bold ${
          c.muted ? 'text-slate-400' : 'text-white'
        }`}
      >
        {c.title}
      </h3>

      <dl className="relative flex flex-col gap-3 text-sm">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Задача
          </dt>
          <dd
            className={`mt-1 leading-relaxed ${
              c.muted ? 'text-slate-400' : 'text-slate-300'
            }`}
          >
            {c.task}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Решение
          </dt>
          <dd
            className={`mt-1 leading-relaxed ${
              c.muted ? 'text-slate-400' : 'text-slate-300'
            }`}
          >
            {c.solution}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Результат
          </dt>
          <dd
            className={`mt-1 font-medium leading-relaxed ${
              c.muted ? 'text-slate-400' : 'text-cyan-300'
            }`}
          >
            {c.result}
          </dd>
        </div>
      </dl>

      {c.duration && (
        <div className="relative mt-auto flex items-center gap-2 border-t border-slate-800 pt-4 text-xs text-slate-500">
          <ClockIcon />
          Срок: {c.duration}
        </div>
      )}
    </article>
  )
}

export default function CasesSection() {
  return (
    <section
      id="cases"
      className="relative overflow-hidden bg-slate-900 px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-30"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Кейсы из <span className="text-gradient-brand">практики</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">Реальные проекты</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.title} c={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
