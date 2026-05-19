const points = [
  {
    title: 'Не агентство',
    text: 'Без слоя менеджеров и долгой передачи контекста. Вы обсуждаете задачу с тем, кто проектирует и собирает решение.',
  },
  {
    title: 'Не случайный фриланс',
    text: 'Есть процесс: анкета, расчёт, архитектура, разработка, тесты, документация и передача проекта.',
  },
  {
    title: 'Бизнес до технологии',
    text: '20 лет в операционном управлении помогают разбирать процессы, а не просто подключать очередной AI-инструмент.',
  },
]

export default function WhyDirectSection() {
  return (
    <section
      id="why-direct"
      className="relative overflow-hidden bg-[#10130f] px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-30"
      />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Почему напрямую,{' '}
            <span className="text-gradient-brand">а не через агентство</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-300">
            Для небольших AI-внедрений важны скорость, ясный владелец решения и
            отсутствие потери смысла между продажей, менеджментом и разработкой.
          </p>
        </div>

        <div className="grid gap-4">
          {points.map((point) => (
            <article
              key={point.title}
              className="rounded-2xl border border-stone-800/80 bg-[#151812]/70 p-6 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-white">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-300">
                {point.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
