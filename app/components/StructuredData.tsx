import {
  DATE_MODIFIED,
  DATE_PUBLISHED,
  EMAIL,
  SAME_AS,
  SITE_URL,
  TELEGRAM_CHANNEL_URL,
} from '../lib/site'

const siteUrl = SITE_URL

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Дмитрий Хихол',
  alternateName: 'Dmitry Hihol',
  url: siteUrl,
  image: `${siteUrl}/dmitry.jpg`,
  jobTitle: 'AI-разработчик и консультант по автоматизации бизнес-процессов',
  description:
    'AI-разработчик с управленческим операционным бэкграундом. Внедряет AI-автоматизацию бизнес-процессов под ключ: AI-агентов, RAG-ассистентов, чат-ботов, голосовые сценарии, Telegram Mini Apps и интеграции с CRM.',
  sameAs: SAME_AS,
  knowsAbout: [
    'Кастомная разработка AI-решений для бизнеса',
    'AI-автоматизация бизнес-процессов',
    'AI-агенты для бизнеса',
    'RAG-ассистенты',
    'RAG-системы',
    'парсинг данных',
    'Telegram-боты',
    'CRM-интеграции',
    'n8n',
    'OpenAI API',
    'Next.js',
    'PostgreSQL',
  ],
  hasCredential: ['MBA', '20 лет CEO/COO/CCO до AI-разработки'],
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'HIHOL',
  url: siteUrl,
  inLanguage: 'ru-RU',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  publisher: {
    '@type': 'Person',
    name: 'Дмитрий Хихол',
    url: siteUrl,
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'HIHOL',
  legalName: 'Дмитрий Хихол — AI-автоматизация бизнес-процессов под ключ',
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  telephone: '+79051238877',
  email: EMAIL,
  priceRange: '40 000 – 400 000 ₽',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Москва',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 55.7558,
    longitude: 37.6177,
  },
  hasMap: 'https://yandex.ru/maps/?ll=37.617700%2C55.755800&z=3',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+79051238877',
      contactType: 'sales',
      areaServed: 'RU',
      availableLanguage: ['Russian'],
    },
  ],
  areaServed: [
    {
      '@type': 'Country',
      name: 'Россия',
    },
    {
      '@type': 'Place',
      name: 'СНГ',
    },
  ],
  founder: {
    '@type': 'Person',
    name: 'Дмитрий Хихол',
  },
  description:
    'Внедрение AI-агентов, чат-ботов, RAG-ассистентов, Telegram Mini Apps, голосовых ботов и интеграций с CRM для обработки заявок, поддержки, документов, звонков и аналитики.',
  sameAs: SAME_AS,
  subjectOf: [
    {
      '@type': 'CreativeWork',
      name: 'Telegram-канал Дмитрия Хихола',
      url: TELEGRAM_CHANNEL_URL,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'Product Factory OS',
      url: 'https://github.com/hihol-labs/product-factory-os',
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'idea-to-deploy',
      url: 'https://github.com/HiH-DimaN/idea-to-deploy',
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI-автоматизация бизнес-процессов под ключ',
  serviceType:
    'Внедрение AI-агентов, RAG-ассистентов, CRM-интеграций, Telegram Mini Apps, голосовых ботов и автоматизации документов',
  provider: {
    '@type': 'Person',
    name: 'Дмитрий Хихол',
    url: siteUrl,
  },
  areaServed: 'Россия и СНГ',
  offers: {
    '@type': 'Offer',
    url: siteUrl,
    priceCurrency: 'RUB',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'RUB',
      minPrice: 40000,
      maxPrice: 400000,
    },
    availability: 'https://schema.org/InStock',
  },
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Услуги AI-автоматизации',
    itemListElement: [
      'AI-ассистент Start / Plus / Pro',
      'Автоматизация заявок и CRM',
      'Telegram Mini App для бизнеса',
      'Голосовой бот',
      'Автоматизация документов и отчетов',
      'Парсинг данных',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name,
      },
    })),
  },
}

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  )
}
