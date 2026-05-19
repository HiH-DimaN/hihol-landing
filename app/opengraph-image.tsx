import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt =
  'HIHOL — AI solutions & automation for SMB'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          backgroundColor: '#0b0d0a',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(245,158,11,0.32) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(74,222,128,0.26) 0%, transparent 45%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '28px',
            letterSpacing: '-0.01em',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundImage:
                'linear-gradient(135deg, #f4d35e 0%, #5ee08b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b0d0a',
              fontSize: '40px',
              fontWeight: 800,
            }}
          >
            H
          </div>
          <span style={{ color: '#e7e5e4', fontWeight: 600 }}>hihol.ru</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          <div
            style={{
              fontSize: '112px',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              backgroundImage:
                'linear-gradient(120deg, #ffffff 0%, #fcd34d 55%, #86efac 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            HIHOL
          </div>
          <div
            style={{
              fontSize: '44px',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#e7e5e4',
              maxWidth: '960px',
              letterSpacing: '-0.015em',
            }}
          >
            AI solutions & automation for SMB
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              lineHeight: 1.3,
              color: '#a8a29e',
              maxWidth: '900px',
            }}
          >
            Telegram bots, RAG assistants, CRM integrations.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            fontSize: '24px',
          }}
        >
          <span
            style={{
              padding: '12px 24px',
              borderRadius: '999px',
              backgroundColor: 'rgba(245,158,11,0.14)',
              border: '1px solid rgba(245,158,11,0.42)',
              color: '#fcd34d',
              fontWeight: 600,
            }}
          >
            Fixed price
          </span>
          <span
            style={{
              padding: '12px 24px',
              borderRadius: '999px',
              backgroundColor: 'rgba(74,222,128,0.12)',
              border: '1px solid rgba(74,222,128,0.38)',
              color: '#86efac',
              fontWeight: 600,
            }}
          >
            1–3 weeks
          </span>
          <span
            style={{
              padding: '12px 24px',
              borderRadius: '999px',
              backgroundColor: 'rgba(168,162,158,0.1)',
              border: '1px solid rgba(168,162,158,0.35)',
              color: '#d6d3d1',
              fontWeight: 600,
            }}
          >
            Full docs
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
