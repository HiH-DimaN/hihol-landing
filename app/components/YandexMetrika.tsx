'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { CONSENT_EVENT, readConsent } from '../lib/consent'

// Counter 108695727 is the fixed hihol.ru counter; env can still override it.
const YM_ID = process.env.NEXT_PUBLIC_YM_ID ?? '108695727'

// Metrika loads ONLY after the visitor clicks "Принять" in the cookie banner
// (152-FZ). Until consent there is no request to mc.yandex.ru and no _ym_* cookie.
export default function YandexMetrika() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    if (readConsent() === 'granted') {
      setGranted(true)
      return
    }
    const onChange = (event: Event) => {
      if ((event as CustomEvent).detail === 'granted') setGranted(true)
    }
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  if (!YM_ID || !granted) return null

  return (
    <Script id="ym-init" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; } }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${YM_ID}, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });
      `}
    </Script>
  )
}
