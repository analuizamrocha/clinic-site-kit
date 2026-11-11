import type { Metadata } from 'next'
import { site } from '@/lib/site'

interface PageMetadataInput {
  title: string
  description: string
  /** Path starting with `/`. */
  path: string
  indexable?: boolean
}

/** One builder for every page, so canonical, OG and robots never drift. */
export const buildMetadata = ({ title, description, path, indexable = true }: PageMetadataInput): Metadata => {
  const url = `${site.brand.url}${path === '/' ? '' : path}`
  const index = indexable && !site.fictional
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index, follow: index },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: site.brand.siteName,
      title,
      description,
      url,
    },
  }
}
