const deliverables = [
  'Работающее решение, протестированное на ваших данных',
  'Полная техническая документация — передать другому подрядчику, если надо',
  'Инструкция для сотрудников',
  'Исходный код передаю вам — можете развивать с любым разработчиком',
  '2 недели бесплатных правок после запуска',
  'Возможность ежемесячного сопровождения (15–30K/мес)',
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
      className="h-5 w-5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function DeliverablesSection() {
  return (
    <section
      id="deliverables"
      className="relative overflow-hidden bg-slate-900 px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-30"
      />

      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Что вы получаете в{' '}
            <span className="text-gradient-brand">результате</span>
          </h2>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {deliverables.map((text) => (
            <li
              key={text}
              className="group flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-[0_0_30px_-16px_rgba(34,211,238,0.5)]"
            >
              <div
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/25 to-violet-500/25 text-cyan-300 transition-colors duration-300 group-hover:text-cyan-200"
              >
                <CheckIcon />
              </div>
              <p className="text-base leading-relaxed text-slate-200">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
