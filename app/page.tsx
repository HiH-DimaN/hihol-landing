import type { Metadata } from 'next'
import Compliance152Landing from './components/Compliance152Landing'
import HomeStructuredData from './components/HomeStructuredData'
import { SEO_152 } from './lib/complianceData'

export const metadata: Metadata = {
  title: SEO_152.title,
  description: SEO_152.description,
  alternates: { canonical: SEO_152.canonical },
  openGraph: {
    title: SEO_152.title,
    description: SEO_152.description,
    url: SEO_152.canonical,
  },
  twitter: {
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
