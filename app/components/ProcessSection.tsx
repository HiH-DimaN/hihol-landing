import type { ReactNode } from 'react'

type Step = {
  title: string
  description: string
  icon: ReactNode
}

const iconClass = 'h-6 w-6'
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  className: iconClass,
}

const steps: Step[] = [
  {
    title: 'Анкета',
    description:
      'Заполняете анкету (10 мин). На выходе PDF с расчётом потерь.',
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4h6v3H9z" />
        <line x1="8" y1="11" x2="16" y2="11" />
        <line x1="8" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
  {
    title: 'Созвон',
    description: '20–30 минут. Обсуждаем отчёт.',
    icon: (
      <svg {...iconProps}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: 'Предложение',
    description: 'КП с фиксированной ценой и сроком.',
    icon: (
      <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="14" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Договор',
    description: 'Предоплата 50%.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.8 6.5 19.5l1-6.3L3 8.9 9 8l3-6z" />
      </svg>
    ),
  },
  {
    title: 'План',
    description: 'План и архитектура. Утверждаете ДО кода.',
    icon: (
      <svg {...iconProps}>
        <polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21" />
        <line x1="8" y1="3" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Разработка',
    description: 'Еженедельный показ прогресса.',
    icon: (
      <svg {...iconProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Сдача',
    description: 'Тестирование. Полный пакет документации.',
    icon: (
      <svg {...iconProps}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="8 11 11 14 16 9" />
      </svg>
    ),
  },
  {
    title: 'Поддержка',
    description: '2 недели правок бесплатно.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </svg>
    ),
  },
]

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-slate-950 px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-96 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-balance text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
          Как мы будем{' '}
          <span className="text-gradient-brand">работать</span>
        </h2>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <li
              key={step.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_40px_-16px_rgba(34,211,238,0.5)]"
            >
              <div
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl transition-colors duration-300 group-hover:bg-violet-500/20"
              />

              <div className="relative flex items-baseline justify-between">
                <span className="bg-gradient-to-br from-cyan-400 to-violet-500 bg-clip-text text-5xl font-bold leading-none text-transparent">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-slate-600 transition-colors duration-300 group-hover:text-cyan-400">
                  {step.icon}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
