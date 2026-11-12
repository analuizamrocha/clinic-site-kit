import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

/** A fictional config is never crawlable; a real one allows search and assistant crawlers. */
const robots = (): MetadataRoute.Robots =>
  site.fictional
    ? { rules: [{ userAgent: '*', disallow: '/' }] }
    : { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${site.brand.url}/sitemap.xml`, host: site.brand.url }

export default robots
