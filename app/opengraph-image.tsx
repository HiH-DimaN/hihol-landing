import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Проверка сайта на соответствие 152-ФЗ - HIHOL'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Text kept ASCII-safe: next/og has no bundled Cyrillic glyphs and constraint 6
// forbids a CDN font. The rendered cover is intentionally simple.
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#0f1419',
          backgroundImage:
            'linear-gradient(to right, rgba(74,222,128,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(74,222,128,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          color: '#e8eaed',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '28px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '10px',
              backgroundColor: '#4ade80',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#08130c',
              fontSize: '40px',
              fontWeight: 800,
            }}
          >
            H
          </div>
          <span style={{ color: '#9aa5b1', fontWeight: 600 }}>hihol.ru</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            style={{
              fontSize: '84px',
              fontWeight: 800,
              lineHeight: 1.02,
              color: '#e8eaed',
            }}
          >
            Website 152-FZ compliance audit
          </div>
          <div
            style={{
              fontSize: '38px',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#4ade80',
              maxWidth: '960px',
            }}
          >
            Cookie, policy, forms, chat-bots - report in 24 hours
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '24px' }}>
          {['First 2 issues free', 'KoAP article refs', 'Fix plan'].map((t) => (
            <span
              key={t}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                backgroundColor: '#1a2129',
                border: '1px solid #2a3441',
                color: '#e8eaed',
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
