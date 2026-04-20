'use client'

import { useEffect, useRef } from 'react'

const labelClass =
  'fill-slate-400 text-[11px] font-medium uppercase tracking-[0.15em]'

export default function HeroFX() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion) return

    let raf = 0

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${x}px`)
        el.style.setProperty('--my', `${y}px`)
        el.style.setProperty('--mxp', String((x / rect.width) * 2 - 1))
        el.style.setProperty('--myp', String((y / rect.height) * 2 - 1))
      })
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        ['--mx' as string]: '50%',
        ['--my' as string]: '50%',
        ['--mxp' as string]: '0',
        ['--myp' as string]: '0',
      }}
    >
      {/* spotlight — follows cursor */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(520px circle at var(--mx) var(--my), rgba(34,211,238,0.16), transparent 60%)',
        }}
      />

      {/* flow diagram — parallax against mouse */}
      <svg
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.55] lg:opacity-40 motion-reduce:transform-none"
        style={{
          transform:
            'translate3d(calc(var(--mxp) * -16px), calc(var(--myp) * -16px), 0)',
          transition: 'transform 250ms ease-out',
        }}
      >
        <defs>
          <linearGradient id="flowStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <radialGradient id="hubGlow">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="inputGlow">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="outputGlow">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#f472b6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* connections */}
        <g
          stroke="url(#flowStroke)"
          strokeWidth="1.3"
          fill="none"
          strokeDasharray="4 6"
          strokeLinecap="round"
        >
          <path d="M 120 140 Q 280 140 500 280" className="animate-dash-slow" />
          <path d="M 100 280 L 500 280" className="animate-dash" />
          <path d="M 120 420 Q 280 420 500 280" className="animate-dash-fast" />
          <path d="M 500 280 Q 700 140 880 140" className="animate-dash" />
          <path d="M 500 280 L 900 280" className="animate-dash-slow" />
          <path d="M 500 280 Q 700 420 880 420" className="animate-dash-fast" />
        </g>

        {/* Input: Форма */}
        <g className="pointer-events-auto cursor-help">
          <title>Web-форма или анкета на сайте</title>
          <circle cx="120" cy="140" r="30" fill="url(#inputGlow)" />
          <circle
            cx="120"
            cy="140"
            r="7"
            fill="#22d3ee"
            className="animate-node-pulse"
          />
        </g>
        <text x="78" y="144" textAnchor="end" className={labelClass}>
          Форма
        </text>

        {/* Input: Голос */}
        <g className="pointer-events-auto cursor-help">
          <title>Звонок / голосовой AI-ответчик</title>
          <circle cx="100" cy="280" r="26" fill="url(#inputGlow)" />
          <circle
            cx="100"
            cy="280"
            r="6"
            fill="#22d3ee"
            className="animate-node-pulse"
            style={{ animationDelay: '0.4s' }}
          />
        </g>
        <text x="58" y="284" textAnchor="end" className={labelClass}>
          Голос
        </text>

        {/* Input: Чат */}
        <g className="pointer-events-auto cursor-help">
          <title>Telegram / WhatsApp / чат на сайте</title>
          <circle cx="120" cy="420" r="30" fill="url(#inputGlow)" />
          <circle
            cx="120"
            cy="420"
            r="7"
            fill="#22d3ee"
            className="animate-node-pulse"
            style={{ animationDelay: '0.8s' }}
          />
        </g>
        <text x="78" y="424" textAnchor="end" className={labelClass}>
          Чат
        </text>

        {/* AI Hub */}
        <g className="pointer-events-auto cursor-help">
          <title>AI-логика, RAG, интеграции</title>
          <circle cx="500" cy="280" r="80" fill="url(#hubGlow)" />
          <circle
            cx="500"
            cy="280"
            r="32"
            fill="none"
            stroke="url(#flowStroke)"
            strokeWidth="1.6"
          />
          <circle
            cx="500"
            cy="280"
            r="20"
            fill="none"
            stroke="url(#flowStroke)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            className="animate-dash-fast"
          />
          <circle
            cx="500"
            cy="280"
            r="9"
            fill="#a78bfa"
            className="animate-node-pulse"
          />
        </g>
        <text
          x="500"
          y="360"
          textAnchor="middle"
          className="fill-violet-300 text-[13px] font-bold uppercase tracking-[0.3em]"
        >
          AI
        </text>

        {/* Output: CRM */}
        <g className="pointer-events-auto cursor-help">
          <title>amoCRM / Bitrix24 / 1С — запись клиента</title>
          <circle cx="880" cy="140" r="28" fill="url(#outputGlow)" />
          <rect
            x="872"
            y="132"
            width="16"
            height="16"
            fill="#f472b6"
            className="animate-node-pulse"
          />
        </g>
        <text x="920" y="144" textAnchor="start" className={labelClass}>
          CRM
        </text>

        {/* Output: PDF */}
        <g className="pointer-events-auto cursor-help">
          <title>Счёт, акт, КП, договор — готовый PDF</title>
          <circle cx="900" cy="280" r="28" fill="url(#outputGlow)" />
          <rect
            x="892"
            y="272"
            width="16"
            height="16"
            fill="#f472b6"
            className="animate-node-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </g>
        <text x="940" y="284" textAnchor="start" className={labelClass}>
          PDF
        </text>

        {/* Output: Telegram */}
        <g className="pointer-events-auto cursor-help">
          <title>Уведомления, напоминания, ответы клиентам</title>
          <circle cx="880" cy="420" r="28" fill="url(#outputGlow)" />
          <rect
            x="872"
            y="412"
            width="16"
            height="16"
            fill="#f472b6"
            className="animate-node-pulse"
            style={{ animationDelay: '1s' }}
          />
        </g>
        <text x="920" y="424" textAnchor="start" className={labelClass}>
          Telegram
        </text>
      </svg>
    </div>
  )
}
