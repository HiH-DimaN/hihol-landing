'use client'

import { useState } from 'react'
import { services, type ServiceId } from '../lib/homeData'
import { EXPRESS_FORM_URL } from '../lib/site'
import TrackedLink from './TrackedLink'

function ServiceBrief({ service }: { service: (typeof services)[number] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-semibold text-[var(--site-green)]">{service.short}</p>
        <h3 className="display-title mt-2 text-3xl leading-tight">{service.name}</h3>
        <p className="mt-4 leading-relaxed text-[var(--site-muted)]">{service.fit}</p>
        <p className="mt-4 font-semibold leading-relaxed">{service.result}</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {service.specs.map((spec) => (
            <div
              key={spec}
              className="border border-[color:var(--site-line)] bg-[#fbf9f3] px-3 py-2 text-sm text-[var(--site-muted)]"
            >
              {spec}
            </div>
          ))}
        </div>
        {service.tiers && (
          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {service.tiers.map((tier) => (
              <div
                key={tier.name}
                className="flex h-full flex-col border border-[color:var(--site-line)] bg-[#fbf9f3] p-4"
              >
                <h4 className="text-lg font-semibold">{tier.name}</h4>
                <ul className="mt-3 flex-1 space-y-2 text-sm leading-relaxed text-[var(--site-muted)]">
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-[color:var(--site-line)] pt-3 text-lg font-semibold">
                  {tier.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border border-[color:var(--site-line)] bg-[#fbf9f3] p-4">
        <p className="text-xs font-semibold uppercase text-[var(--site-muted)]">Карта контура</p>
        <div className="mt-5 grid gap-3">
          {service.flow.map((item, index) => (
            <div key={item} className="grid grid-cols-[42px_1fr] items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-[color:var(--site-line)] bg-white text-sm font-semibold">
                {index + 1}
              </div>
              <div className="border-l-2 border-[var(--site-green)] bg-white px-4 py-3 text-sm font-semibold">
                {item}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[color:var(--site-line)] pt-4 text-sm">
          <div>
            <p className="text-[var(--site-muted)]">Ориентир</p>
            <p className="mt-1 text-xl font-semibold">{service.price}</p>
          </div>
          <div>
            <p className="text-[var(--site-muted)]">Срок</p>
            <p className="mt-1 text-xl font-semibold">{service.duration}</p>
          </div>
        </div>
        <TrackedLink
          href={EXPRESS_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          goalName="questionnaire_cta_click"
          goalPayload={{ service: `Услуга: ${service.name}` }}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[var(--site-ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--site-green)] focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)]"
        >
          Получить расчёт
        </TrackedLink>
      </div>
    </div>
  )
}

export default function HomeServiceSwitcher() {
  const [activeService, setActiveService] = useState<ServiceId>('workflow')
  const service = services.find((item) => item.id === activeService) ?? services[0]

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[330px_1fr]">
      <div className="grid gap-2">
        {services.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveService(item.id)}
            className={`min-h-11 border px-4 py-3 text-left transition ${
              activeService === item.id
                ? 'border-[var(--site-ink)] bg-[var(--site-ink)] text-white'
                : 'border-[color:var(--site-line)] bg-white text-[var(--site-ink)] hover:border-[var(--site-ink)]'
            }`}
          >
            <span className="block font-semibold">{item.name}</span>
            <span className="mt-1 block text-sm opacity-70">{item.short}</span>
          </button>
        ))}
      </div>
      <article key={service.id} className="fade-in border border-[color:var(--site-line)] bg-white p-5 md:p-7">
        <ServiceBrief service={service} />
      </article>
    </div>
  )
}
