import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import YandexMetrika from './components/YandexMetrika'
import StructuredData from './components/StructuredData'

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap' })

const siteUrl = 'https://hihol.ru'
const title = 'Дмитрий Хихол — AI-решения и автоматизация для среднего бизнеса'
const description =
  'Разработка AI-ботов, автоматизация процессов и интеграции для компаний 10–100 человек. Фиксированная цена, срок 1–3 недели, полная документация.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'AI-бот для бизнеса',
    'автоматизация',
    'Telegram-бот',
    'AI-ассистент',
    'RAG',
    'чат-бот для клиник',
    'автоматизация процессов',
    'n8n',
    'интеграция CRM',
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
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.className}>
      <body className="bg-slate-950 text-white antialiased">
        {children}
        <StructuredData />
        <YandexMetrika />
      </body>
    </html>
  )
}
