import { AI_FAQ, AI_SEO, AI_SOLUTIONS } from '../lib/aiData'
import { DATE_MODIFIED, DATE_PUBLISHED, SITE_URL } from '../lib/site'

export default function AiStructuredData() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: AI_SEO.title,
    description: AI_SEO.description,
    url: AI_SEO.canonical,
    inLanguage: 'ru-RU',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    about: { '@id': `${SITE_URL}/#person` },
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI-автоматизация бизнес-процессов под ключ',
    serviceType: 'AI-ассистенты, RAG, CRM-интеграции, Mini Apps и автоматизация процессов',
    description: AI_SEO.description,
    url: AI_SEO.canonical,
    provider: { '@id': `${SITE_URL}/#person` },
    areaServed: { '@type': 'Country', name: 'Россия' },
    offers: {
      '@type': 'Offer',
      url: AI_SEO.canonical,
      priceCurrency: 'RUB',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'RUB', minPrice: 40000, maxPrice: 400000 },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI-решения HIHOL',
      itemListElement: AI_SOLUTIONS.map((item) => ({
        '@type': 'Offer',
        url: `${SITE_URL}${item.href}`,
        itemOffered: { '@type': 'Service', name: item.title },
      })),
    },
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'AI-решения', item: AI_SEO.canonical },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AI_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  return <>{[webPageSchema, serviceSchema, breadcrumbSchema, faqSchema].map((schema) => <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}</>
}
