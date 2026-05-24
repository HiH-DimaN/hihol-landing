import { faqs } from '../lib/faqs'
import {
  DATE_MODIFIED,
  DATE_PUBLISHED,
  SITE_NAME,
  SITE_URL,
} from '../lib/site'

export default function HomeStructuredData() {
  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
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
    name: `AI-автоматизация бизнес-процессов под ключ 2026 — ${SITE_NAME}`,
    description:
      'Кастомная разработка AI-ботов, RAG-систем, CRM-интеграций, Telegram Mini Apps, голосовых ботов и автоматизации документов.',
    url: SITE_URL,
    inLanguage: 'ru-RU',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: SITE_URL,
      },
    ],
  }

  return (
    <>
      {[webPageSchema, breadcrumbSchema, faqPageSchema].map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
