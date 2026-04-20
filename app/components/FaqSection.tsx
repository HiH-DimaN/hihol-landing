const faqs = [
  {
    q: 'Как проходит оплата?',
    a: 'Предоплата 50%, остаток после сдачи.',
  },
  {
    q: 'Что если результат не подойдёт?',
    a: '2 недели бесплатных правок. Если не удаётся довести до работоспособности — возврат остатка.',
  },
  {
    q: 'Есть ли договор?',
    a: 'Да. Фиксируем объём, сроки, ответственность.',
  },
  {
    q: 'Кому принадлежит код?',
    a: 'Вам. Весь исходный код с документацией.',
  },
  {
    q: 'Работаете один или с командой?',
    a: 'Один. Поэтому фиксированные цены и короткие сроки.',
  },
  {
    q: 'Что если через полгода нужны доработки?',
    a: 'Через ежемесячное сопровождение или разовый проект.',
  },
  {
    q: 'Могу ли я видеть прогресс?',
    a: 'Да, еженедельные созвоны + общий таск-трекер.',
  },
  {
    q: 'Почему такая цена?',
    a: 'Покрывает весь цикл: план, архитектура, разработка, тестирование, документация, поддержка.',
  },
  {
    q: 'Что если нужна доработка через полгода, а вы заняты другим?',
    a: 'Каждая сессия проекта сохраняется в методологии idea-to-deploy — решения, архитектура, промпты, тесты. Возвращаюсь в проект через любой срок и продолжаю с того места, где остановился. Тот же контекст получает другой разработчик, если вы решите передать код.',
  },
]

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-slate-500 transition-all duration-300 group-open:rotate-180 group-open:text-cyan-400"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-slate-900 px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-30"
      />

      <div className="mx-auto max-w-3xl">
        <h2 className="mb-16 text-balance text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
          Вопросы, которые <span className="text-gradient-brand">задают</span>
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 open:border-cyan-400/40 open:shadow-[0_0_40px_-16px_rgba(34,211,238,0.5)] hover:border-slate-700"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-semibold text-white transition-colors [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{item.q}</span>
                <ChevronIcon />
              </summary>
              <div className="border-t border-slate-800 px-5 pb-5 pt-4 leading-relaxed text-slate-300">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
