import type { Metadata } from 'next'
import AiStructuredData from '../components/AiStructuredData'
import AiSolutionsPage from '../components/AiSolutionsPage'
import { AI_SEO } from '../lib/aiData'
import { OG_IMAGE, TWITTER_IMAGE } from '../lib/seo'
import { SITE_NAME } from '../lib/site'

export const metadata: Metadata = {
  title: AI_SEO.title,
  description: AI_SEO.description,
  alternates: { canonical: AI_SEO.canonical },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    title: AI_SEO.title,
    description: AI_SEO.description,
    url: AI_SEO.canonical,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: AI_SEO.title,
    description: AI_SEO.description,
    images: [TWITTER_IMAGE],
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
