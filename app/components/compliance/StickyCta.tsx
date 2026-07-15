'use client'

import { useEffect, useState } from 'react'
import TrackedLink from '../TrackedLink'
import { CONTACT, HERO } from '../../lib/complianceData'

// Sticky mobile CTA - appears after scrolling past the first screen.
export default function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border)] bg-[var(--bg)]/98 p-3 backdrop-blur-sm md:hidden">
      <TrackedLink
        href={CONTACT.checkAnchor}
        goalName="cta_sticky_check"
        className="flex min-h-[48px] items-center justify-center rounded-lg bg-[var(--accent)] px-6 text-base font-semibold text-[var(--accent-ink)]"
      >
        {HERO.ctaLabel}
      </TrackedLink>
    </div>
  )
}
