const items = [
  {
    title: 'Заявки и ответы',
    text: 'Бот отвечает на типовые вопросы, собирает данные и передаёт горячие обращения менеджеру.',
  },
  {
    title: 'CRM и уведомления',
    text: 'Заявка попадает в CRM, ответственному приходит уведомление, статус не теряется в чатах.',
  },
  {
    title: 'Документы',
    text: 'КП, счета, акты и ТЗ собираются из голоса, текста, фото или формы.',
  },
  {
    title: 'Звонки',
    text: 'Запись, расшифровка, краткое резюме и фиксация результата в карточке клиента.',
  },
  {
    title: 'Excel и отчёты',
    text: 'Данные собираются из таблиц, API и сайтов, чистятся и обновляются по расписанию.',
  },
  {
    title: 'База знаний',
    text: 'Инструкции, FAQ и регламенты превращаются в ассистента для клиентов или сотрудников.',
  },
]

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function AutomationFirstSection() {
  return (
    <section
      id="automation-first"
      className="relative overflow-hidden bg-[#0b0d0a] px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Что автоматизировать{' '}
            <span className="text-gradient-brand">первым</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-300">
            Начинаем не с “внедрить AI”, а с участка, где теряются заявки,
            деньги или время команды.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group flex gap-4 rounded-2xl border border-stone-800/80 bg-[#151812]/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/40 hover:shadow-[0_0_30px_-16px_rgba(245,158,11,0.42)]"
            >
              <div
                aria-hidden="true"
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 text-amber-200"
              >
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
