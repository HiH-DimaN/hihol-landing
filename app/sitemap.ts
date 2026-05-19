import type { MetadataRoute } from 'next'
import { nichePageList } from './lib/nichePages'

const SITE_URL = 'https://hihol.ru'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...nichePageList.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
