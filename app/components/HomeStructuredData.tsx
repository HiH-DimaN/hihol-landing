import { FAQ, PRICING, SEO_152 } from '../lib/complianceData'
import { DATE_MODIFIED, DATE_PUBLISHED, SITE_URL } from '../lib/site'

// Homepage JSON-LD as a single @graph: Service, WebPage, FAQPage.
// Person (@id ".../#person") and the business entity (ProfessionalService,
// @id ".../#business") are published site-wide by components/StructuredData.tsx
// and are referenced here by @id, never duplicated - two nodes describing the
// same business confuse entity resolution.
// Offers mirror PRICING so visible prices stay in sync.
// Review/AggregateRating are intentionally absent until real reviews exist.
const ORG_ID = `${SITE_URL}/#business`
const PERSON_ID = `${SITE_URL}/#person`
const SERVICE_ID = `${SITE_URL}/#service-152fz`
const PAGE_ID = `${SITE_URL}/#page`

function offerPrice(price: string): string {
  return price.replace(/[^0-9]/g, '')
}

export default function HomeStructuredData() {
  const service = {
    '@type': 'Service',
    '@id': SERVICE_ID,
    serviceType: 'Аудит сайта на соответствие 152-ФЗ',
    name: SEO_152.title,
    description: SEO_152.description,
    areaServed: { '@type': 'Country', name: 'RU' },
    provider: { '@id': PERSON_ID },
    offers: [
      ...PRICING.tiers.map((tier) => ({
        '@type': 'Offer',
        name: tier.name,
        price: offerPrice(tier.price),
        priceCurrency: 'RUB',
      })),
      {
        '@type': 'Offer',
        name: PRICING.support.name,
        price: offerPrice(PRICING.support.price),
        priceCurrency: 'RUB',
      },
      {
        '@type': 'Offer',
        name: 'Модуль "Чат-бот / мини-апп"',
        price: '17900',
        priceCurrency: 'RUB',
      },
    ],
  }
  const webPage = {
    '@type': 'WebPage',
    '@id': PAGE_ID,
    name: SEO_152.title,
    description: SEO_152.description,
    url: SITE_URL,
    inLanguage: 'ru-RU',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    about: { '@id': SERVICE_ID },
  }
  const faqPage = {
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
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [service, webPage, faqPage],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
