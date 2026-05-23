import type { Metadata } from 'next'
import './globals.css'
import YandexMetrika from './components/YandexMetrika'
import StructuredData from './components/StructuredData'

const siteUrl = 'https://hihol.ru'
const title = 'AI-автоматизация бизнес-процессов под ключ — Дмитрий Хихол'
const description =
  'Кастомная разработка AI-решений для бизнеса: AI-боты, RAG-системы, CRM-интеграции, Telegram Mini Apps, парсинг данных и автоматизация документов. Расчёт потерь, запуск за 1–3 недели.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'AI-бот для бизнеса',
    'AI-автоматизация бизнес-процессов под ключ',
    'автоматизация',
    'Telegram-бот',
    'AI-ассистент',
    'RAG',
    'RAG-системы',
    'чат-бот для клиник',
    'автоматизация процессов',
    'n8n',
    'интеграция CRM',
    'AI для экспертов',
    'B2B автоматизация',
    'голосовой бот',
    'Telegram Mini App',
    'AI-автоматизация бизнес-процессов под ключ',
    'внедрение ИИ в бизнес',
    'AI-агенты для бизнеса',
    'ИИ-бот для обработки заявок',
    'RAG-ассистент для компании',
    'автоматизация заявок CRM',
    'Telegram Mini App для бизнеса',
    'AI голосовой бот',
    'парсинг данных',
    'кастомная разработка AI-решений',
  ],
  authors: [{ name: 'Дмитрий Хихол', url: siteUrl }],
  creator: 'Дмитрий Хихол',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'Дмитрий Хихол',
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
  other: {
    'geo.region': 'RU-MOW',
    'geo.placename': 'Москва',
    'geo.position': '55.7558;37.6177',
    ICBM: '55.7558, 37.6177',
    'business:contact_data:country_name': 'Russia',
    'business:contact_data:locality': 'Moscow',
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
        <YandexMetrika />
      </body>
    </html>
  )
}
