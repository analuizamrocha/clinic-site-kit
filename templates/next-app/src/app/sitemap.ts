import type { MetadataRoute } from 'next'
import { assertRedirectTargets, getIndexablePages } from '@/lib/discovery'
import { site } from '@/lib/site'

const sitemap = (): MetadataRoute.Sitemap => {
  assertRedirectTargets()
  if (site.fictional) return []
  return getIndexablePages().map((page) => ({
    url: `${site.brand.url}${page.path === '/' ? '' : page.path}`,
    ...(page.lastModified ? { lastModified: page.lastModified } : {}),
  }))
}

export default sitemap
