'use client'

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react'
import { trackGoal } from '../lib/metrika'

type Props = ComponentPropsWithoutRef<'a'> & {
  goalName?: string
  goalPayload?: Record<string, unknown>
  children: ReactNode
}

export default function TrackedLink({
  goalName,
  goalPayload,
  onClick,
  children,
  ...rest
}: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (goalName) trackGoal(goalName, goalPayload)
    onClick?.(e)
  }

  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  )
}
