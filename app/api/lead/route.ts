import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Same-origin proxy: the browser posts here; we forward to the FastAPI service
// on the internal Docker network. FORM_API_URL is server-only (never NEXT_PUBLIC).
export async function POST(request: Request) {
  const apiUrl = process.env.FORM_API_URL
  if (!apiUrl) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null
  const userAgent = request.headers.get('user-agent') || null

  try {
    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...body, ip, user_agent: userAgent }),
    })
    const data = await resp.json().catch(() => ({}))
    return NextResponse.json(data, { status: resp.status })
  } catch {
    return NextResponse.json({ ok: false, error: 'upstream_unavailable' }, { status: 502 })
  }
}
