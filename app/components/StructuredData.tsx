import {
  DATE_MODIFIED,
  DATE_PUBLISHED,
  EMAIL,
  SAME_AS,
  SITE_URL,
  TELEGRAM_CHANNEL_URL,
} from '../lib/site'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Дмитрий Хихол',
  alternateName: 'Dmitry Hihol',
  url: SITE_URL,
  image: `${SITE_URL}/dmitry-color.jpg`,
  jobTitle: 'Разработчик AI-систем и специалист по техническому аудиту цифровых контуров',
  description:
    'Разрабатывает AI-автоматизацию для бизнеса и проводит технический аудит сайтов, форм, аналитики, чат-ботов и маршрутов персональных данных.',
  sameAs: SAME_AS,
  knowsAbout: [
    'AI-автоматизация бизнес-процессов',
    'RAG-системы и базы знаний',
    'CRM-интеграции',
    'Telegram Mini Apps',
    'технический аудит сайтов по 152-ФЗ',
    '152-ФЗ',
    'персональные данные',
    'Роскомнадзор',
    'cookie-баннер',
    'маршруты персональных данных',
    'cookie и веб-аналитика',
    'Telegram-боты',
  ],
  hasCredential: ['MBA', '20 лет опыта CEO/COO/CCO'],
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'HIHOL',
  url: SITE_URL,
  description:
    'Технический аудит цифровых контуров по 152-ФЗ и разработка AI-автоматизации для бизнеса.',
  inLanguage: 'ru-RU',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  publisher: { '@id': `${SITE_URL}/#person` },
}

const professionalServiceSchema = {
  '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'HIHOL',
  legalName: 'Дмитрий Хихол',
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  telephone: '+79051238877',
  email: EMAIL,
  areaServed: { '@type': 'Country', name: 'Россия' },
  founder: { '@id': `${SITE_URL}/#person` },
  description:
    'Технический аудит сайтов и интеграций по 152-ФЗ, а также разработка AI-ассистентов, RAG, CRM-интеграций, Mini Apps и автоматизации процессов.',
  sameAs: SAME_AS,
  subjectOf: [
    { '@type': 'CreativeWork', name: 'Telegram-канал Дмитрия Хихола', url: TELEGRAM_CHANNEL_URL },
    { '@type': 'SoftwareSourceCode', name: 'idea-to-deploy', url: 'https://github.com/HiH-DimaN/idea-to-deploy' },
  ],
}

export default function StructuredData() {
  return (
    <>
      {[webSiteSchema, personSchema, professionalServiceSchema].map((schema) => (
        <script key={schema['@id']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  )
}
