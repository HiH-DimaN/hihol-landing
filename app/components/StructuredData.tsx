import { faqs } from '../lib/faqs'

const siteUrl = 'https://hihol.ru'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Дмитрий Хихол',
  alternateName: 'Dmitry Hihol',
  url: siteUrl,
  image: `${siteUrl}/dmitry.jpg`,
  jobTitle: 'AI-разработчик',
  description:
    'AI-разработчик с 20-летним бэкграундом в управлении бизнесом (CEO/COO/CCO). 40+ AI-решений в продакшне. Фиксированная цена, срок 1–3 недели.',
  sameAs: [
    'https://t.me/dmitry_hihol',
    'https://t.me/d_hihol',
    'https://github.com/HiH-DimaN',
    'https://github.com/hihol-labs',
  ],
  knowsAbout: [
    'AI-разработка',
    'Telegram-боты',
    'Telegram Mini Apps',
    'RAG-системы',
    'n8n автоматизация',
    'OpenAI API',
    'Claude API',
    'YandexGPT',
    'GigaChat',
    'Python',
    'TypeScript',
    'FastAPI',
    'Next.js',
    'PostgreSQL + pgvector',
  ],
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'City Business School',
      description: 'MBA (Управление проектами)',
    },
  ],
}

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'HIHOL — AI-решения и автоматизация для среднего бизнеса',
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  telephone: '+79051238877',
  email: 'hihol.dmitry@ya.ru',
  areaServed: {
    '@type': 'Country',
    name: 'Россия',
  },
  priceRange: '15 000 – 400 000 ₽',
  founder: {
    '@type': 'Person',
    name: 'Дмитрий Хихол',
  },
  description:
    'AI-боты, автоматизация процессов, Telegram Mini Apps, голосовые боты, парсинг данных, RAG-ассистенты для компаний 10–100 человек. Фиксированная цена, срок 1–3 недели, полная документация.',
  serviceType: [
    'AI-ассистент / RAG-чат-бот',
    'Автоматизация процессов (n8n + AI)',
    'Парсинг и структурирование данных',
    'Telegram Mini App',
    'Голосовой бот (STT + LLM + TTS)',
    'Ежемесячное сопровождение AI-решений',
  ],
  sameAs: [
    'https://t.me/dmitry_hihol',
    'https://t.me/d_hihol',
    'https://github.com/HiH-DimaN',
  ],
}

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

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
    </>
  )
}
