export const YM_ID = process.env.NEXT_PUBLIC_YM_ID

declare global {
  interface Window {
    ym?: (
      counterId: string | number,
      method: string,
      ...args: unknown[]
    ) => void
  }
}

export function trackGoal(
  goal: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return
  if (!YM_ID) return
  window.ym?.(YM_ID, 'reachGoal', goal, params)
}
