import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)',
          color: '#020617',
          fontSize: 46,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          borderRadius: 14,
          fontFamily: 'sans-serif',
        }}
      >
        H
      </div>
    ),
    { ...size },
  )
}
