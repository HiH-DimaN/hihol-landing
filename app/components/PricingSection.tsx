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
    <article className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_40px_-16px_rgba(34,211,238,0.5)]">
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition-colors duration-300 group-hover:bg-cyan-500/20"
      />

      <div className="relative">
        <div
          aria-hidden="true"
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-3xl"
        >
          <span>{p.emoji}</span>
        </div>
        <h3 className="text-xl font-bold text-white">{p.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {p.description}
        </p>
      </div>

      <ul className="relative flex flex-col gap-2 text-sm text-slate-200">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-0.5 text-cyan-400">
              <CheckIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto border-t border-slate-800 pt-4">
        <div className="text-2xl font-bold text-cyan-300">{p.price}</div>
        <div className="mt-1 text-xs text-slate-500">{p.duration}</div>
      </div>
    </article>
  )
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-slate-950 px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Цены и <span className="text-gradient-brand">сроки</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Фиксированная цена за результат
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AssistantCard />
          {products.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-slate-500">
          Точную цену определим после анкеты
        </p>
      </div>
    </section>
  )
}
