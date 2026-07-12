'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { readConsent, writeConsent, type ConsentValue } from '../lib/consent'

const PRIVACY_HREF = '/politika-obrabotki-personalnyh-dannyh'

// Global cookie banner (Блок X). Metrika stays dormant until "Принять".
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (readConsent() === null) setVisible(true)
  }, [])

  if (!visible) return null

  const decide = (value: ConsentValue) => {
    writeConsent(value)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookie"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#2a3441] bg-[#0f1419]/98 px-4 py-4 backdrop-blur-sm sm:px-6"
    >
      <div className="mx-auto flex max-w-[1080px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-[#c5ccd4]">
          Сайт использует cookie и Яндекс.Метрику для аналитики. Подробнее - в{' '}
          <Link
            href={PRIVACY_HREF}
            className="font-medium text-[#4ade80] underline underline-offset-2 hover:text-[#22c55e]"
          >
            политике обработки данных
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide('necessary')}
            className="min-h-[44px] rounded-lg border border-[#2a3441] px-4 text-sm font-medium text-[#c5ccd4] transition-colors hover:border-[#3a4757] hover:text-[#e8eaed]"
          >
            Только необходимые
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className="min-h-[44px] rounded-lg bg-[#4ade80] px-5 text-sm font-semibold text-[#08130c] transition-colors hover:bg-[#22c55e]"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  )
}
