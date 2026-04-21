'use client'

import { useEffect, useState } from 'react'

type Msg = { author: 'user' | 'bot'; text: string }

const script: Msg[] = [
  { author: 'user', text: 'Запиши Анну на завтра, 15:00' },
  {
    author: 'bot',
    text: '✓ Записал. Анна, завтра 15:00, каб. 2.\nУведомил врача и клиента.',
  },
  { author: 'user', text: 'Сколько пропустили звонков за неделю?' },
  {
    author: 'bot',
    text: '84 пропуска · ~₽210K потенциальной выручки.\nВключить AI-ответы в нерабочее время?',
  },
]

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function BotAvatar() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5 text-slate-950"
      >
        <rect x="4" y="7" width="16" height="12" rx="3" />
        <path d="M12 7V3m-2 0h4" />
        <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
        <path d="M2 13h2m16 0h2" />
      </svg>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-md border border-slate-700/60 bg-slate-800/80 px-4 py-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse-soft"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.author === 'user'
  return (
    <div
      className={`flex animate-[fadeIn_300ms_ease-out] ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-2xl border px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-md border-cyan-400/25 bg-cyan-500/15 text-cyan-50'
            : 'rounded-bl-md border-slate-700/60 bg-slate-800/80 text-slate-100'
        }`}
      >
        {msg.text}
      </div>
    </div>
  )
}

export default function ChatDemo() {
  const [shown, setShown] = useState<Msg[]>([script[0]])
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    let cancelled = false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(script)
      return
    }

    async function run() {
      while (!cancelled) {
        for (let i = 1; i < script.length; i++) {
          if (cancelled) return
          const msg = script[i]
          if (msg.author === 'bot') {
            setTyping(true)
            await wait(1100)
            if (cancelled) return
            setTyping(false)
          } else {
            await wait(900)
          }
          setShown((s) => [...s, msg])
        }
        await wait(4500)
        if (cancelled) return
        setShown([script[0]])
      }
    }

    const t = setTimeout(run, 700)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-500/25 via-violet-500/15 to-fuchsia-500/20 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        />

        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">
          <BotAvatar />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">
              hihol_assistant
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              в сети
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full bg-slate-600"
              />
            ))}
          </div>
        </div>

        <div className="flex min-h-[340px] flex-col gap-3 px-5 py-5">
          {shown.map((m, i) => (
            <Bubble key={i} msg={m} />
          ))}
          {typing && <TypingDots />}
        </div>

        <div className="border-t border-slate-800 bg-slate-950/60 px-5 py-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-soft" />
            автоматизация работает 24/7
          </div>
        </div>
      </div>
    </div>
  )
}
