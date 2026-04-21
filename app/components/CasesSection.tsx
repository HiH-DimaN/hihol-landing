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
    title: 'AI-ассистент для интернет-магазина на Wildberries',
    task: 'Потеря лидов 40% из-за долгого ответа (15 мин). Типовые вопросы по доставке, размерам и остаткам заваливают менеджеров.',
    solution:
      'AI-чат на Vercel Serverless + OpenAI GPT-4o-mini. Типовые вопросы закрывает бот, редкие эскалирует на менеджера.',
    result: 'Выручка +35%, ответ 15 мин → 30 сек, потеря лидов 40% → 5%. ROI — 10 дней.',
    duration: '10 дней',
  },
  {
    emoji: '🎓',
    title: 'Онлайн-школа английского: AI + 1 куратор вместо 3',
    task: '300+ студентов, 100+ сообщений/день, 30+ ДЗ/день. Кураторы выгорают, 15% студентов уходят из-за долгого ответа. Убыток 180к ₽/мес.',
    solution:
      'AI-ассистент 24/7, автопроверка ДЗ, дашборд куратора с прогнозом риска отвала.',
    result: 'Retention 85% → 92%, кураторы 3 → 1, ответ 2–4 ч → 2–3 сек. ROI 842%, +3,5 млн ₽/год.',
    duration: '14 дней',
  },
  {
    emoji: '🏠',
    title: 'Агентство недвижимости: Telegram Mini App + AI',
    task: 'Потолок 60–80 сделок/мес. Скорость ответа 5–10 мин — лиды уходят к конкурентам. Потеря лидов 40%.',
    solution:
      'TMA с каталогом квартир, 3D-туры, AI-чат с семантическим поиском через PG Vector, дашборд агентства.',
    result: 'Сделки 60–80 → 100–120/мес (+50%), ответ 30 сек, потеря лидов 40% → 5%. ROI 2–3 дня.',
    duration: '3 недели',
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
