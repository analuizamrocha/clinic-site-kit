import { describe, expect, it } from 'vitest'
import { getAllPosts, validatePost } from '@/lib/blog'
import { getIndexablePages, renderLlmsTxt } from '@/lib/discovery'
import { getPublishedServices, site } from '@/lib/site'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

describe('discovery', () => {
  it('lists every indexable service and post, and nothing awaiting sign-off', () => {
    const paths = new Set(getIndexablePages().map((page) => page.path))
    for (const service of getPublishedServices()) {
      expect(paths.has(`/tratamentos/${service.slug}`), service.slug).toBe(service.indexable)
    }
    for (const post of getAllPosts()) expect(paths.has(`/blog/${post.slug}`), post.slug).toBe(post.indexable)
  })

  it('keeps llms.txt in step with the indexable pages', () => {
    const llms = renderLlmsTxt()
    const linked = new Set(Array.from(llms.matchAll(/\]\(([^)]+)\)/g), ([, url]) => url.replace(site.brand.url, '')))
    const expected = getIndexablePages()
      .map((page) => page.path)
      .filter((path) => /^\/(tratamentos|locais-de-atendimento|blog)\/./.test(path))
    expect([...linked].sort()).toEqual(expected.sort())
  })

  it('hides a fictional site from crawlers', () => {
    expect(site.fictional).toBe(true)
    expect(sitemap()).toEqual([])
    expect(robots().rules).toEqual([{ userAgent: '*', disallow: '/' }])
  })

  it('validates post frontmatter', () => {
    const [post] = getAllPosts()
    const services = new Set(getPublishedServices().map((service) => service.slug))
    expect(validatePost(post, services)).toEqual([])
    expect(validatePost({ ...post, relatedServiceSlugs: ['nao-existe'] }, services).join()).toMatch(/unknown or unpublished/)
    expect(validatePost({ ...post, lastModified: '2000-01-01' }, services).join()).toMatch(/predates/)
    expect(validatePost({ ...post, body: 'TODO escrever' }, services).join()).toMatch(/placeholder/)
  })
})
