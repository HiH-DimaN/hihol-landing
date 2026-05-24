import type { Metadata } from 'next'
import GuidePage from '../components/GuidePage'
import { guidePages } from '../lib/guidePages'
import { getPageMetadata } from '../lib/seo'

const guide = guidePages.costAiBot

export const metadata: Metadata = getPageMetadata({
  title: guide.title,
  description: guide.description,
  slug: guide.slug,
})

export default function Page() {
  return <GuidePage guide={guide} />
}
