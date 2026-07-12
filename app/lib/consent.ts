// First-party cookie consent for Yandex.Metrika (152-FZ).
// Stored in a first-party cookie (not localStorage) so the choice is readable
// both in static output and with SSR, and survives navigation between pages.

export const CONSENT_COOKIE = 'hihol_consent'
export const CONSENT_EVENT = 'hihol-consent-change'

export type ConsentValue = 'granted' | 'necessary'

export function readConsent(): ConsentValue | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`))
  if (!match) return null
  const value = match.slice(CONSENT_COOKIE.length + 1)
  return value === 'granted' || value === 'necessary' ? value : null
}

export function writeConsent(value: ConsentValue): void {
  if (typeof document === 'undefined') return
  const oneYear = 60 * 60 * 24 * 365
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${oneYear}; SameSite=Lax${secure}`
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}
