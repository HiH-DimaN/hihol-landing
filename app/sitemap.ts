import type { MetadataRoute } from 'next'
import { guidePageList } from './lib/guidePages'
import { nichePageList } from './lib/nichePages'
import { DATE_MODIFIED_SHORT } from './lib/site'

const SITE_URL = 'https://hihol.ru'
const lastModified = new Date(DATE_MODIFIED_SHORT)

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/ai`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ai-diagnostika`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    ...nichePageList.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...guidePageList.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    })),
    {
      url: `${SITE_URL}/politika-obrabotki-personalnyh-dannyh`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}
