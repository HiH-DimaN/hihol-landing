import type { Metadata } from 'next'
import Compliance152Landing from './components/Compliance152Landing'
import HomeStructuredData from './components/HomeStructuredData'
import { SEO_152 } from './lib/complianceData'
import { SITE_NAME } from './lib/site'

export const metadata: Metadata = {
  title: SEO_152.title,
  description: SEO_152.description,
  alternates: { canonical: SEO_152.canonical },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    title: SEO_152.title,
    description: SEO_152.description,
    url: SEO_152.canonical,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_152.title,
    description: SEO_152.description,
  },
}

export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <Compliance152Landing />
    </>
  )
}
