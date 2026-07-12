'use client'

import { useMemo, useState } from 'react'
import { tariffOptions } from '../lib/homeData'
import HomeSectionTitle from './HomeSectionTitle'
import TrackedLink from './TrackedLink'

function rub(value: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(value)))
}

export default function HomeCalculator() {
  const [tariff, setTariff] = useState(tariffOptions[0])
  const [requests, setRequests] = useState(220)
  const [check, setCheck] = useState(42000)
  const [hours, setHours] = useState(48)

  const result = useMemo(() => {
    const lostRevenue = requests * check * 0.12
    const manualCost = hours * 1100
    const monthlyEffect = lostRevenue * tariff.recovery + manualCost * 0.65
    const payback = monthlyEffect > 0 ? tariff.base / monthlyEffect : 0
    return { lostRevenue, manualCost, monthlyEffect, payback }
  }, [check, hours, requests, tariff])

  return (
    <div className="grid gap-8">
      <HomeSectionTitle
        kicker="Оффер / калькулятор"
        title="Сначала порядок экономики, потом разработка"
        text="Это грубая модель для решения: есть ли смысл идти в проект. Точный расчёт делается после анкеты и доступа к исходным данным."
      />
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.05fr] lg:items-stretch">
        <aside className="h-full border border-[color:var(--site-line)] bg-white p-5 md:p-7">
          <p className="text-sm font-semibold text-[var(--site-green)]">Методика оценки</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight">
            Расчёт показывает порядок эффекта, а не обещание результата
          </h3>
          <p className="mt-4 leading-relaxed text-[var(--site-muted)]">
            Модель нужна, чтобы понять, есть ли экономический смысл идти в
            автоматизацию. Точные цифры появляются после экспресс-анкеты, карты
            процесса и проверки исходных данных.
          </p>
          <div className="mt-6 grid gap-3 text-sm">
            {[
              ['Входные данные', 'Вы задаёте объём заявок, средний чек и часы ручной работы.'],
              ['Где теряются деньги', 'Видно, сколько денег зависает в медленном ответе и ручной передаче.'],
              ['Что может вернуть автоматизация', 'Для каждого типа решения заложена своя доля эффекта.'],
              ['Окупаемость', 'Стоимость внедрения делится на ожидаемый месячный эффект.'],
            ].map(([title, text]) => (
              <div
                key={title}
                className="border-t border-[color:var(--site-line)] pt-3 first:border-t-0 first:pt-0"
              >
                <p className="font-semibold">{title}</p>
                <p className="mt-1 leading-relaxed text-[var(--site-muted)]">{text}</p>
              </div>
            ))}
          </div>
        </aside>
        <div className="h-full border border-[color:var(--site-line)] bg-white p-5 md:p-7">
          <div className="grid gap-2 sm:grid-cols-3">
            {tariffOptions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTariff(item)}
                className={`min-h-11 border px-3 py-3 text-left text-sm ${
                  tariff.id === item.id
                    ? 'border-[var(--site-ink)] bg-[var(--site-ink)] text-white'
                    : 'border-[color:var(--site-line)] bg-white'
                }`}
              >
                <span className="block font-semibold">{item.name}</span>
                <span className="opacity-70">от {rub(item.base)} ₽</span>
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-5">
            <label className="grid gap-2 text-sm font-medium">
              Заявок в месяц
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={requests}
                onChange={(event) => setRequests(Number(event.target.value))}
                className="accent-[var(--site-green)]"
              />
              <input
                type="number"
                min="50"
                max="1000"
                value={requests}
                onChange={(event) => setRequests(Number(event.target.value))}
                className="min-h-11 border border-[color:var(--site-line)] px-3"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Средний чек, ₽
              <input
                type="range"
                min="5000"
                max="300000"
                step="5000"
                value={check}
                onChange={(event) => setCheck(Number(event.target.value))}
                className="accent-[var(--site-green)]"
              />
              <input
                type="number"
                min="5000"
                step="1000"
                value={check}
                onChange={(event) => setCheck(Number(event.target.value))}
                className="min-h-11 border border-[color:var(--site-line)] px-3"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Ручных часов в месяц
              <input
                type="number"
                min="0"
                value={hours}
                onChange={(event) => setHours(Number(event.target.value))}
                className="min-h-11 border border-[color:var(--site-line)] px-3"
              />
            </label>
          </div>
          <div className="mt-7 grid gap-4 border-t border-[color:var(--site-line)] pt-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-[var(--site-muted)]">Потери / мес.</p>
              <p className="mt-1 text-2xl font-semibold">{rub(result.lostRevenue + result.manualCost)} ₽</p>
            </div>
            <div>
              <p className="text-sm text-[var(--site-muted)]">Эффект / мес.</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--site-green)]">
                {rub(result.monthlyEffect)} ₽
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--site-muted)]">Окупаемость</p>
              <p className="mt-1 text-2xl font-semibold">{result.payback.toFixed(1)} мес.</p>
            </div>
          </div>
          <TrackedLink
            href={`/zayavka?src=calc&ctx=${encodeURIComponent(`Калькулятор: ${tariff.name}`)}`}
            goalName="questionnaire_cta_click"
            goalPayload={{ service: `Калькулятор: ${tariff.name}` }}
            className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[var(--site-ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--site-green)] focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)]"
          >
            Получить точный расчёт
          </TrackedLink>
        </div>
      </div>
    </div>
  )
}
