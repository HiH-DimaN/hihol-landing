'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  href: string
  className?: string
  children: ReactNode
  onClick?: () => void
  radius?: number
  strength?: number
  target?: string
  rel?: string
}

export default function MagneticCTA({
  href,
  className = '',
  children,
  onClick,
  radius = 160,
  strength = 0.4,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let raf = 0

    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (dist < radius) {
          const k = (1 - dist / radius) * strength
          el.style.transform = `translate3d(${dx * k}px, ${dy * k}px, 0)`
        } else {
          el.style.transform = 'translate3d(0, 0, 0)'
        }
      })
    }

    const reset = () => {
      el.style.transform = 'translate3d(0, 0, 0)'
    }

    window.addEventListener('mousemove', handle)
    window.addEventListener('mouseleave', reset)
    return () => {
      window.removeEventListener('mousemove', handle)
      window.removeEventListener('mouseleave', reset)
      cancelAnimationFrame(raf)
    }
  }, [radius, strength])

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={className}
      style={{
        transition:
          'transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 300ms ease-out',
      }}
    >
      {children}
    </a>
  )
}
