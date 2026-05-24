import type { Metadata } from 'next'
import type { NichePage } from './nichePages'
import { DATE_MODIFIED, DATE_PUBLISHED, SITE_NAME, SITE_URL } from './site'

const defaultImages = ['/opengraph-image']

export function with2026(title: string) {
  return title.includes('2026') ? title : `${title} 2026`
}

export function getPageMetadata({
  title,
  description,
  slug = '',
}: {
  title: string
  description: string
  slug?: string
}): Metadata {
  const url = slug ? `${SITE_URL}/${slug}` : SITE_URL
  const fullTitle = `${with2026(title)} — ${SITE_NAME}`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: defaultImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/twitter-image'],
    },
    other: {
      'article:published_time': DATE_PUBLISHED,
      'article:modified_time': DATE_MODIFIED,
    },
  }
}

export function getNicheMetadata(page: NichePage): Metadata {
  return getPageMetadata({
    title: page.title,
    description: page.description,
    slug: page.slug,
  })
}
