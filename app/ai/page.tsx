import type { Metadata } from 'next'
import AiSolutionsPage from '../components/AiSolutionsPage'
import { SEO_AI } from '../lib/complianceData'

export const metadata: Metadata = {
  title: SEO_AI.title,
  description: SEO_AI.description,
  alternates: { canonical: SEO_AI.canonical },
  openGraph: {
    title: SEO_AI.title,
    description: SEO_AI.description,
    url: SEO_AI.canonical,
  },
  twitter: {
    title: SEO_AI.title,
    description: SEO_AI.description,
  },
}

export default function AiPage() {
  return <AiSolutionsPage />
}
