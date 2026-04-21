type ProductLink = {
  label: string
  href: string
  external?: boolean
  note?: string
}

type Product = {
  emoji: string
  name: string
  description: string
  stage?: string
  links: ProductLink[]
}

const products: Product[] = [
  {
    emoji: '⚙️',
    name: 'idea-to-deploy',
    description:
      'Open-source методология для Claude Code. 25 навыков, 7 специализированных агентов, два quality gate, каждая сессия сохраняется. MIT-лицензия. Это система, по которой я веду каждый клиентский проект — поэтому срок 1–3 недели, а не 1–3 месяца.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/HiH-DimaN/idea-to-deploy',
        external: true,
      },
    ],
  },
  {
    emoji: '📄',
    name: 'Skutr Docs',
    description:
      'Telegram-бот для генерации бизнес-документов из голоса, текста или фото. AI сам брифует клиента, собирает ТЗ и выдаёт готовый PDF (счёт, акт, КП, договор) за 10 секунд. Для самозанятых и микробизнеса. Не бухгалтерия — только документы.',
    stage: 'Открытая бета · сотни пользователей',
    links: [
      {
        label: 'Открыть в Telegram',
        href: 'https://t.me/skutr_docs_bot',
        external: true,
      },
      {
        label: 'Веб-кабинет',
        href: 'https://skutr.tech/login',
        external: true,
        note: 'после регистрации в боте',
      },
    ],
  },
  {
    emoji: '🧠',
    name: 'НейроЭксперт',
    description:
      'SaaS-платформа, превращающая экспертизу в клиентов из поиска и нейросетей. Эксперт наговаривает ответ голосом 10 минут — получает контент в 5 форматах, оптимизированный SEO + AIO: ChatGPT, Perplexity, GigaChat, YandexGPT.',
    stage: 'В разработке',
    links: [
      {
        label: 'Узнать больше',
        href: 'https://neuroexpertise.ru',
        external: true,
      },
    ],
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

function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_40px_-16px_rgba(34,211,238,0.5)]">
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition-colors duration-300 group-hover:bg-cyan-500/20"
      />

      <div
        aria-hidden="true"
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-3xl"
      >
        <span>{p.emoji}</span>
      </div>

      <div className="relative">
        <h3 className="text-xl font-bold text-white">{p.name}</h3>
        {p.stage && (
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse-soft" />
            {p.stage}
          </div>
        )}
      </div>

      <p className="relative text-sm leading-relaxed text-slate-300">
        {p.description}
      </p>

      <div className="relative mt-auto flex flex-col gap-2 border-t border-slate-800 pt-4">
        {p.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group/link inline-flex flex-wrap items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            <span className="inline-flex items-center gap-1.5">
              {link.label}
              <ArrowIcon />
            </span>
            {link.note && (
              <span className="text-xs font-normal text-slate-500">
                · {link.note}
              </span>
            )}
          </a>
        ))}
      </div>
    </article>
  )
}

export default function MyProductsSection() {
  return (
    <section
      id="products"
      className="relative overflow-hidden bg-slate-950 px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Мои <span className="text-gradient-brand">продукты</span>
          </h2>
          <p className="mt-5 text-balance text-lg leading-relaxed text-slate-300">
            Не предложение — портфолио. Продукты, которые я разработал и развиваю
            сам. Это демонстрация экспертизы: я не только делаю проекты клиентам,
            но сам запускаю AI-системы.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
