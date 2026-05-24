'use client'

import { useEffect, useState } from 'react'
import { cases } from '../lib/homeData'

export default function HomeCaseProof() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modal-open', lightbox !== null)
    return () => document.body.classList.remove('modal-open')
  }, [lightbox])

  return (
    <>
      <div className="grid gap-4">
        {cases.map((item, index) => (
          <article
            key={item.title}
            className="border border-[color:var(--site-line)] bg-white p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="bg-[#e5dece] px-3 py-1 text-sm font-semibold">{item.tag}</span>
              <button
                type="button"
                onClick={() => setLightbox(index)}
                className="min-h-11 border border-[color:var(--site-line)] px-4 py-2 text-sm font-semibold hover:border-[var(--site-ink)]"
              >
                Открыть досье
              </button>
            </div>
            <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">{item.result}</p>
          </article>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Кейс"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/65"
            aria-label="Закрыть кейс"
            onClick={() => setLightbox(null)}
          />
          <article className="relative w-full max-w-3xl bg-white p-5 text-[var(--site-ink)] shadow-2xl md:p-7">
            <button
              type="button"
              aria-label="Закрыть"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-[color:var(--site-line)] bg-white text-2xl leading-none"
            >
              ×
            </button>
            <p className="text-sm font-semibold text-[var(--site-green)]">{cases[lightbox].tag}</p>
            <h2 className="display-title mt-3 pr-12 text-3xl leading-tight">
              {cases[lightbox].title}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ['Проблема', cases[lightbox].problem],
                ['Решение', cases[lightbox].solution],
                ['Результат', cases[lightbox].result],
              ].map(([title, text]) => (
                <div key={title} className="border border-[color:var(--site-line)] bg-[#fbf9f3] p-4">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--site-muted)]">{text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      )}
    </>
  )
}
