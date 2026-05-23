import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt =
  'AI-автоматизация бизнес-процессов под ключ — HIHOL'
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
          backgroundColor: '#f7f3ea',
          backgroundImage:
            'linear-gradient(to right, rgba(28,31,28,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,31,28,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          color: '#1c1f1c',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          gap: '20px',
          fontSize: '28px',
          letterSpacing: '0',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '10px',
              backgroundColor: '#174c43',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '40px',
              fontWeight: 800,
            }}
          >
            H
          </div>
          <span style={{ color: '#1c1f1c', fontWeight: 600 }}>hihol.ru</span>
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
              fontSize: '78px',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '0',
              color: '#1c1f1c',
            }}
          >
            AI automation for business processes
          </div>
          <div
            style={{
              fontSize: '38px',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#174c43',
              maxWidth: '960px',
              letterSpacing: '0',
            }}
          >
            Fixed scope, working system, 1-3 weeks
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              lineHeight: 1.3,
              color: '#62665f',
              maxWidth: '900px',
            }}
          >
            Dmitry Hihol: AI agents, RAG, CRM, Telegram Mini Apps and document automation.
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
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid #d6ccba',
              color: '#1c1f1c',
              fontWeight: 600,
            }}
          >
            Fixed price
          </span>
          <span
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid #d6ccba',
              color: '#1c1f1c',
              fontWeight: 600,
            }}
          >
            1-3 weeks
          </span>
          <span
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid #d6ccba',
              color: '#1c1f1c',
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
