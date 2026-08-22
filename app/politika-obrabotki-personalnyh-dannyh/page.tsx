import type { Metadata } from 'next'
import PrivacyPolicy from '../components/PrivacyPolicy'
import { OG_IMAGE } from '../lib/seo'
import { SITE_NAME, SITE_URL } from '../lib/site'

const path = '/politika-obrabotki-personalnyh-dannyh'

export const metadata: Metadata = {
  title: `Политика обработки персональных данных — ${SITE_NAME}`,
  description:
    'Политика обработки персональных данных сайта hihol.ru: контакты, cookie, Яндекс.Метрика после согласия, внешние каналы связи, сроки хранения и права субъекта.',
  alternates: {
    canonical: `${SITE_URL}${path}`,
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    title: `Политика обработки персональных данных — ${SITE_NAME}`,
    description:
      'Порядок обработки персональных данных на сайте hihol.ru в соответствии с 152-ФЗ.',
    images: [OG_IMAGE],
  },
}

export default function Page() {
  return <PrivacyPolicy />
}
