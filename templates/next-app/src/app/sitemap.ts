import type { MetadataRoute } from 'next'
import { getIndexablePages } from '@/lib/discovery'
import { site } from '@/lib/site'

const sitemap = (): MetadataRoute.Sitemap =>
  site.fictional
    ? []
    : getIndexablePages().map((page) => ({
        url: `${site.brand.url}${page.path === '/' ? '' : page.path}`,
        ...(page.lastModified ? { lastModified: page.lastModified } : {}),
      }))

export default sitemap
