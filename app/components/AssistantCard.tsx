'use client'

import { useState } from 'react'

type TierId = 'start' | 'plus' | 'pro'

type Tier = {
  id: TierId
  name: string
  features: string[]
  price: string
  duration: string
}

const tiers: Tier[] = [
  {
    id: 'start',
    name: 'Start',
    features: [
      'База знаний до 100 страниц',
      '1 канал: Telegram или виджет',
      '2 недели правок',
    ],
    price: '50–80 тыс. ₽',
    duration: '5–10 дней',
  },
  {
    id: 'plus',
    name: 'Plus',
    features: [
      'RAG на 1000 документов',
      'Telegram + виджет на сайте',
      'Аналитика',
      '1 месяц поддержки',
    ],
    price: '120–180 тыс. ₽',
    duration: '10–14 дней',
  },
  {
    id: 'pro',
    name: 'Pro',
    features: [
      'Всё из Plus',
      'Интеграция amoCRM / Bitrix24 / 1С',
      'Кастомные правила',
      '2 месяца поддержки',
    ],
    price: '220–320 тыс. ₽',
    duration: '2–3 недели',
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

export default function AssistantCard() {
  const [active, setActive] = useState<TierId>('plus')
  const tier = tiers.find((t) => t.id === active)!

  return (
    <article className="relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-transparent p-6 shadow-[0_0_40px_-16px_rgba(34,211,238,0.55)] backdrop-blur-sm">
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute right-5 top-5 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-300"
      >
        Флагман
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-violet-500/25 text-3xl"
        >
          <span>💬</span>
        </div>
        <h3 className="text-xl font-bold text-white">AI-ассистент</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          AI-ассистенты и боты в трёх тарифах.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Тарифы AI-ассистента"
        className="relative flex gap-1 rounded-xl border border-slate-700/70 bg-slate-950/50 p-1"
      >
        {tiers.map((t) => {
          const isActive = active === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`assistant-${t.id}`}
              onClick={() => setActive(t.id)}
              className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 shadow-[0_0_20px_-6px_rgba(34,211,238,0.8)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.name}
            </button>
          )
        })}
      </div>

      <ul
        id={`assistant-${active}`}
        role="tabpanel"
        className="relative flex min-h-[7rem] flex-col gap-2 text-sm text-slate-200"
      >
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-0.5 text-cyan-400">
              <CheckIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto border-t border-slate-800 pt-4">
        <div className="text-2xl font-bold text-cyan-300">{tier.price}</div>
        <div className="mt-1 text-xs text-slate-500">{tier.duration}</div>
      </div>
    </article>
  )
}
