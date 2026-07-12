'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const BUDGET_OPTIONS = [
  'до 50 тыс. ₽',
  '50–150 тыс. ₽',
  '150–320 тыс. ₽',
  'больше 320 тыс. ₽',
  'пока не знаю',
]

const inputClass =
  'mt-1 w-full rounded-md border border-[color:var(--site-line)] bg-white px-3 py-2.5 text-[var(--site-ink)] outline-none focus:border-[var(--site-green)]'

export default function LeadForm() {
  const params = useSearchParams()
  const source = params.get('src') || 'direct'
  const serviceContext = params.get('ctx') || undefined

  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [consent, setConsent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!consent || status === 'sending') return
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: (data.get('name') as string) || '',
      contact: (data.get('contact') as string) || '',
      company: (data.get('company') as string) || null,
      business_sphere: (data.get('business_sphere') as string) || null,
      task: (data.get('task') as string) || null,
      budget: (data.get('budget') as string) || null,
      consent_personal: consent,
      consent_marketing: data.get('consent_marketing') === 'on',
      website: (data.get('website') as string) || '',
      source,
      service_context: serviceContext ?? null,
    }

    try {
      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!resp.ok) throw new Error(`status ${resp.status}`)
      setStatus('ok')
    } catch {
      setStatus('error')
      setErrorMsg('Не удалось отправить. Попробуйте ещё раз или напишите нам в Telegram.')
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-lg border border-[color:var(--site-line)] bg-[var(--site-paper)] p-6">
        <p className="text-lg font-semibold text-[var(--site-ink)]">Заявка отправлена</p>
        <p className="mt-2 text-[var(--site-muted)]">
          Спасибо! Свяжусь с вами по указанному контакту. Обычно отвечаю в течение рабочего дня.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block font-semibold text-[var(--site-green)] underline underline-offset-4"
        >
          ← На главную
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot: hidden from users, catches bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label className="text-sm font-semibold text-[var(--site-ink)]" htmlFor="name">
          Как к вам обращаться *
        </label>
        <input id="name" name="name" required maxLength={255} className={inputClass} />
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--site-ink)]" htmlFor="contact">
          Контакт для связи * <span className="font-normal text-[var(--site-muted)]">(email, телефон или @telegram)</span>
        </label>
        <input id="contact" name="contact" required maxLength={255} className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-[var(--site-ink)]" htmlFor="company">
            Компания
          </label>
          <input id="company" name="company" maxLength={255} className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--site-ink)]" htmlFor="business_sphere">
            Сфера бизнеса
          </label>
          <input
            id="business_sphere"
            name="business_sphere"
            maxLength={255}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--site-ink)]" htmlFor="task">
          Какую задачу хотите решить
        </label>
        <textarea id="task" name="task" rows={4} maxLength={5000} className={inputClass} />
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--site-ink)]" htmlFor="budget">
          Ориентировочный бюджет
        </label>
        <select id="budget" name="budget" className={inputClass} defaultValue="">
          <option value="" disabled>
            Выберите…
          </option>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-3 text-sm text-[var(--site-muted)]">
        <input
          type="checkbox"
          name="consent_personal_ui"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0"
        />
        <span>
          Я согласен(а) на обработку персональных данных в соответствии с{' '}
          <Link
            href="/politika-obrabotki-personalnyh-dannyh"
            className="font-semibold text-[var(--site-green)] underline underline-offset-4"
          >
            Политикой обработки персональных данных
          </Link>
          . *
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm text-[var(--site-muted)]">
        <input type="checkbox" name="consent_marketing" className="mt-1 h-4 w-4 shrink-0" />
        <span>Согласен(а) получать полезные материалы и новости (необязательно).</span>
      </label>

      {status === 'error' && <p className="text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={!consent || status === 'sending'}
        className="w-full rounded-full bg-[var(--site-green)] px-6 py-3 font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === 'sending' ? 'Отправляю…' : 'Отправить заявку'}
      </button>
    </form>
  )
}
