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
          background: 'linear-gradient(135deg, #f4d35e 0%, #5ee08b 100%)',
          color: '#0b0d0a',
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
