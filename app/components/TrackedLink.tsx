'use client'

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react'
import { trackGoal } from '../lib/metrika'

type Props = ComponentPropsWithoutRef<'a'> & {
  goalName?: string
  children: ReactNode
}

export default function TrackedLink({
  goalName,
  onClick,
  children,
  ...rest
}: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (goalName) trackGoal(goalName)
    onClick?.(e)
  }

  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  )
}
