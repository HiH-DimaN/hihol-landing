'use client'

import { useMemo, useState } from 'react'
import MagneticCTA from './MagneticCTA'

function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(value)))
}

export default function LossCalculator() {
  const [leads, setLeads] = useState(120)
  const [check, setCheck] = useState(45000)
  const [lostRate, setLostRate] = useState(20)
  const [hours, setHours] = useState(40)
  const [hourCost, setHourCost] = useState(900)

  const result = useMemo(() => {
    const lostRevenue = leads * (lostRate / 100) * check
    const manualCost = hours * hourCost
    return {
      lostRevenue,
      manualCost,
      total: lostRevenue + manualCost,
    }
  }, [check, hourCost, hours, leads, lostRate])

  return (
    <section
      id="loss-calculator"
      className="relative overflow-hidden bg-[#0b0d0a] px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent"
      />

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Быстрый расчёт{' '}
            <span className="text-gradient-brand">потерь</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-300">
            Прикидка не заменяет аудит, но помогает понять порядок цифр до
            заявки.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-500/10 via-[#151812]/80 to-transparent p-6 shadow-[0_0_40px_-16px_rgba(245,158,11,0.42)]">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-200">
                Заявок в месяц: {leads}
              </span>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={leads}
                onChange={(e) => setLeads(Number(e.target.value))}
                className="accent-amber-300"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-200">
                Средний чек: {formatRub(check)} ₽
              </span>
              <input
                type="range"
                min="5000"
                max="300000"
                step="5000"
                value={check}
                onChange={(e) => setCheck(Number(e.target.value))}
                className="accent-amber-300"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-200">
                Теряется заявок: {lostRate}%
              </span>
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                value={lostRate}
                onChange={(e) => setLostRate(Number(e.target.value))}
                className="accent-amber-300"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-stone-200">
                  Ручных часов в месяц
                </span>
                <input
                  type="number"
                  min="0"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="rounded-xl border border-stone-700 bg-[#0b0d0a] px-4 py-3 text-white outline-none transition-colors focus:border-amber-300"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-stone-200">
                  Стоимость часа, ₽
                </span>
                <input
                  type="number"
                  min="0"
                  value={hourCost}
                  onChange={(e) => setHourCost(Number(e.target.value))}
                  className="rounded-xl border border-stone-700 bg-[#0b0d0a] px-4 py-3 text-white outline-none transition-colors focus:border-amber-300"
                />
              </label>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-stone-800/80 bg-[#0b0d0a]/55 p-5">
            <div className="text-sm text-stone-400">Оценка потерь в месяц</div>
            <div className="mt-2 text-3xl font-bold text-amber-200 md:text-4xl">
              {formatRub(result.total)} ₽
            </div>
            <div className="mt-4 grid gap-2 text-sm text-stone-300 sm:grid-cols-2">
              <div>Потерянная выручка: {formatRub(result.lostRevenue)} ₽</div>
              <div>Ручная работа: {formatRub(result.manualCost)} ₽</div>
            </div>
          </div>

          <div className="mt-6">
            <MagneticCTA
              href="https://forms.gle/3QBDFKuK3DvGQm1n6"
              target="_blank"
              rel="noopener noreferrer"
              goalName="calculator_anketa_click"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-300 via-lime-300 to-emerald-400 px-6 py-4 text-base font-semibold text-[#0b0d0a] shadow-[0_0_40px_-8px_rgba(245,158,11,0.55)]"
            >
              Получить точный расчёт
            </MagneticCTA>
          </div>
        </div>
      </div>
    </section>
  )
}
