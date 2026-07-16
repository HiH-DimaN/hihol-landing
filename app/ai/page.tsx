import type { Metadata } from 'next'
import AiStructuredData from '../components/AiStructuredData'
import AiSolutionsPage from '../components/AiSolutionsPage'
import { AI_SEO } from '../lib/aiData'

export const metadata: Metadata = {
  title: AI_SEO.title,
  description: AI_SEO.description,
  alternates: { canonical: AI_SEO.canonical },
  openGraph: {
    title: AI_SEO.title,
    description: AI_SEO.description,
    url: AI_SEO.canonical,
  },
  twitter: {
    title: AI_SEO.title,
    description: AI_SEO.description,
  },
}

export default function AiPage() {
  return (
    <>
      <AiStructuredData />
      <AiSolutionsPage />
    </>
  )
}
