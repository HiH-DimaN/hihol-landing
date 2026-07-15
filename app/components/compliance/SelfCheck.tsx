'use client'

import { useState } from 'react'
import TrackedLink from '../TrackedLink'
import { CONTACT, SELF_CHECK, pluralPriznak } from '../../lib/complianceData'

export default function SelfCheck() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    SELF_CHECK.items.map(() => false),
  )
  const count = checked.filter(Boolean).length

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))

  return (
    <section
      id="check-yourself"
      className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16"
    >
      <h2 className="text-2xl sm:text-3xl">{SELF_CHECK.h2}</h2>
      <p className="mt-3 text-[var(--text-muted)]">{SELF_CHECK.lead}</p>

      <ul className="mt-6 grid gap-3">
        {SELF_CHECK.items.map((item, i) => (
          <li key={i}>
            <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition-colors hover:border-[var(--accent)]">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                className="h-5 w-5 shrink-0 accent-[var(--accent)]"
              />
              <span className="text-sm leading-snug text-[var(--text)] sm:text-base">
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        {count === 0 ? (
          <p className="text-[var(--text-muted)]">{SELF_CHECK.zero}</p>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[var(--text)]">
              У вас <span className="font-semibold text-[var(--accent)]">{count}</span>{' '}
              {pluralPriznak(count)} {SELF_CHECK.resultTail}
            </p>
            <TrackedLink
              href={CONTACT.checkAnchor}
              goalName="cta_self_check"
              goalPayload={{ selected: count }}
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {SELF_CHECK.ctaLabel}
            </TrackedLink>
          </div>
        )}
      </div>
    </section>
  )
}
