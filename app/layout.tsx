import type { Metadata } from 'next'
import './globals.css'
import YandexMetrika from './components/YandexMetrika'
import CookieConsent from './components/CookieConsent'
import StructuredData from './components/StructuredData'
import { SITE_NAME, SITE_URL } from './lib/site'

const siteUrl = SITE_URL
const title = `Аудит по 152-ФЗ: сайт, CRM, чат-боты, AI - ${SITE_NAME}`
const description =
  'Аудит контура персональных данных по 152-ФЗ: формы, cookie, политика, маршрут данных до CRM, чат-боты и AI. Отчет с доказательствами и планом исправления. Первые 2 наблюдения - бесплатно.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: SITE_NAME,
    title,
    description,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  verification: {
    yandex: '686d44434e40b703',
    google: 'TIijuO9pTHqk-j1Aq9BnW6Pnr929QiVOYEgoDeXtRDA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-[var(--site-bg)] text-[var(--site-ink)] antialiased">
        {children}
        <StructuredData />
        <CookieConsent />
        <YandexMetrika />
      </body>
    </html>
  )
}
