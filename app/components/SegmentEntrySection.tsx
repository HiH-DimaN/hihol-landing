const segments = [
  {
    title: 'Бизнесу',
    subtitle: 'Заявки, CRM, документы, звонки',
    text: 'Автоматизирую повторяющиеся операции, чтобы заявки быстрее попадали в работу, менеджеры меньше теряли контекст, а руководитель видел процесс.',
    href: '/b2b-automation',
  },
  {
    title: 'Экспертам',
    subtitle: 'AI-ассистент, база знаний, контент',
    text: 'Собираю ваш опыт в систему: бот отвечает клиентам, помогает с консультациями и превращает знания в страницы, материалы и лиды.',
    href: '/ai-for-experts',
  },
  {
    title: 'Локальному B2B',
    subtitle: 'Карты, отзывы, конкуренты, заявки',
    text: 'Помогаю найти точки потерь в локальной видимости и собрать систему ежедневных задач для роста входящих обращений.',
    href: '/ai-assistant-business',
  },
]

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function SegmentEntrySection() {
  return (
    <section
      id="segments"
      className="relative overflow-hidden bg-[#10130f] px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-30"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Выберите свой <span className="text-gradient-brand">сценарий</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-300">
            Один стек, но разные входы: операционка, экспертность или локальные
            продажи.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {segments.map((segment) => (
            <article
              key={segment.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-800/80 bg-[#151812]/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-[0_0_40px_-16px_rgba(245,158,11,0.42)]"
            >
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-colors duration-300 group-hover:bg-amber-500/20"
              />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber-200">
                  {segment.subtitle}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {segment.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  {segment.text}
                </p>
              </div>

              <a
                href={segment.href}
                className="group/link relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 transition-colors hover:text-amber-200"
              >
                Подробнее
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
