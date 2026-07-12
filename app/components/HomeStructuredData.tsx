import { FAQ, SEO_152 } from '../lib/complianceData'
import {
  DATE_MODIFIED,
  DATE_PUBLISHED,
  SITE_NAME,
  SITE_URL,
} from '../lib/site'

export default function HomeStructuredData() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Аудит сайта на соответствие 152-ФЗ',
    name: SEO_152.title,
    description: SEO_152.description,
    areaServed: { '@type': 'Country', name: 'RU' },
    provider: {
      '@type': 'Person',
      name: 'Дмитрий Хихол',
      url: SITE_URL,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Экспресс-аудит',
        price: '23900',
        priceCurrency: 'RUB',
      },
      {
        '@type': 'Offer',
        name: 'Аудит + исправление под ключ',
        price: '59900',
        priceCurrency: 'RUB',
      },
    ],
  }
  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SEO_152.title,
    description: SEO_152.description,
    url: SITE_URL,
    inLanguage: 'ru-RU',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    about: SITE_NAME,
  }

  return (
    <>
      {[serviceSchema, webPageSchema, faqPageSchema].map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
