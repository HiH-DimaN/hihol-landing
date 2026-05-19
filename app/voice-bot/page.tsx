import type { Metadata } from 'next'
import NicheLandingPage from '../components/NicheLandingPage'
import { nichePages } from '../lib/nichePages'

const page = nichePages.voiceBot

export const metadata: Metadata = {
  title: `${page.title} — Дмитрий Хихол`,
  description: page.description,
  alternates: {
    canonical: `https://hihol.ru/${page.slug}`,
  },
}

export default function Page() {
  return <NicheLandingPage page={page} />
}
