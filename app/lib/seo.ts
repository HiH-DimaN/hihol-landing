import type { Metadata } from 'next'
import type { NichePage } from './nichePages'
import { DATE_MODIFIED, DATE_PUBLISHED, SITE_NAME, SITE_URL } from './site'

// Full descriptors: width/height/alt let X, Telegram and VK render the large
// card without fetching the image first. The root `opengraph-image.tsx` file
// convention emits these automatically, but only for `/` - nested routes have
// to declare them.
const OG_IMAGE_ALT = 'Проверка сайта на соответствие 152-ФЗ - HIHOL'

export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
  type: 'image/png',
} as const

export const TWITTER_IMAGE = {
  url: '/twitter-image',
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
  type: 'image/png',
} as const

const defaultImages = [OG_IMAGE]

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
      images: [TWITTER_IMAGE],
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
