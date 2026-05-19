import AssistantCard from './AssistantCard'

type Product = {
  emoji: string
  name: string
  description: string
  features: string[]
  price: string
  duration: string
}

const products: Product[] = [
  {
    emoji: '⚙️',
    name: 'Автоматизация',
    description: 'Автоматизация процессов. n8n + AI + интеграции.',
    features: [
      'Заявки → AI → CRM → уведомления',
      'Документ → парсинг → запись в систему',
      'Мониторинг',
    ],
    price: '40–100 тыс. ₽',
    duration: '5–10 дней',
  },
  {
    emoji: '📊',
    name: 'Парсинг данных',
    description: 'Сбор и структурирование данных.',
    features: [
      'Парсинг сайтов и API',
      'Чистка данных',
      'Запись в таблицы / БД',
      'Расписание запусков',
    ],
    price: '50–150 тыс. ₽',
    duration: '7–14 дней',
  },
  {
    emoji: '📱',
    name: 'Telegram Mini App',
    description: 'Telegram Mini Apps.',
    features: [
      'Каталог / кабинет / сервис внутри бота',
      'Дизайн',
      'Auth через Telegram',
      'База данных',
      '1 месяц поддержки',
    ],
    price: '150–350 тыс. ₽',
    duration: '3–5 недель',
  },
  {
    emoji: '📞',
    name: 'Голосовой бот',
    description: 'Приём входящих звонков: AI понимает речь, отвечает, фиксирует заявку в CRM.',
    features: [
      'Speech-to-Text → AI-ответ → Text-to-Speech',
      'Подключение номера (SIP / виртуальная PBX)',
      'Запись и транскрипция в CRM',
      'Fallback на оператора',
      'При готовом SIP — 2 недели',
    ],
    price: '200–400 тыс. ₽',
    duration: '3–4 недели',
  },
  {
    emoji: '🔧',
    name: 'Сопровождение',
    description: 'Ежемесячное сопровождение запущенного решения.',
    features: [
      'До 5 ч/мес правок',
      'Мониторинг',
      'Обновление базы знаний',
    ],
    price: '15–30 тыс. ₽',
    duration: 'в месяц',
  },
]

const riskReducers = [
  '3 рабочих дня пилот: можно остановиться',
  '2 недели правок после запуска бесплатно',
  'Код, инструкции и документация остаются у вас',
  'Проект можно передать другому разработчику',
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
      className="h-4 w-4 shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-stone-800/80 bg-[#151812]/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-[0_0_40px_-16px_rgba(245,158,11,0.42)]">
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-colors duration-300 group-hover:bg-amber-500/20"
      />

      <div className="relative">
        <div
          aria-hidden="true"
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 text-3xl"
        >
          <span>{p.emoji}</span>
        </div>
        <h3 className="text-xl font-bold text-white">{p.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-300">
          {p.description}
        </p>
      </div>

      <ul className="relative flex flex-col gap-2 text-sm text-stone-200">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-0.5 text-amber-300">
              <CheckIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto border-t border-stone-800/80 pt-4">
        <div className="text-2xl font-bold text-amber-200">{p.price}</div>
        <div className="mt-1 text-xs text-stone-500">{p.duration}</div>
      </div>
    </article>
  )
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#0b0d0a] px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Цены и <span className="text-gradient-brand">сроки</span>
          </h2>
          <p className="mt-4 text-lg text-stone-300">
            Фиксированная цена за результат
          </p>
          <div className="mx-auto mt-6 inline-flex max-w-full items-center rounded-full border border-amber-300/40 bg-amber-400/10 px-5 py-2 text-sm font-semibold text-amber-100 shadow-[0_0_28px_-16px_rgba(245,158,11,0.7)]">
            Стартовые условия: -20% на первые 5 проектов
          </div>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {riskReducers.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-stone-800/80 bg-[#151812]/70 px-4 py-3 text-sm font-medium leading-relaxed text-stone-200"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AssistantCard />
          {products.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-stone-500">
          Точную цену определим после анкеты
        </p>
      </div>
    </section>
  )
}
