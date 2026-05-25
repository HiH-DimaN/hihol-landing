import type { Metadata } from 'next'
import NicheLandingPage from '../components/NicheLandingPage'
import { nichePages } from '../lib/nichePages'
import { getNicheMetadata } from '../lib/seo'

const page = nichePages.aiCrm

export const metadata: Metadata = getNicheMetadata(page)

export default function Page() {
  return <NicheLandingPage page={page} />
}
