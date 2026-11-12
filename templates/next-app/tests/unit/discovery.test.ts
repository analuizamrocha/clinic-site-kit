import { describe, expect, it } from 'vitest'
import { getAllPosts, SEARCH_TITLE_MAX, searchTitle, validatePost } from '@/lib/blog'
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

  it('sends every redirect to a page the site indexes', () => {
    const paths = new Set(getIndexablePages().map((page) => page.path))
    for (const redirect of site.redirects ?? []) expect(paths.has(redirect.to), redirect.from).toBe(true)
  })

  it('keeps llms.txt in step with the indexable pages', () => {
    const llms = renderLlmsTxt()
    const linked = new Set(Array.from(llms.matchAll(/\]\(([^)]+)\)/g), ([, url]) => url.replace(site.brand.url, '')))
    const expected = getIndexablePages()
      .map((page) => page.path)
      .filter((path) => /^\/(tratamentos|locais-de-atendimento|blog)\/./.test(path))
    expect([...linked].sort()).toEqual(expected.sort())
  })

  it.runIf(site.fictional)('hides a fictional site from crawlers', () => {
    expect(sitemap()).toEqual([])
    expect(robots().rules).toEqual([{ userAgent: '*', disallow: '/' }])
  })

  it.runIf(!site.fictional)('publishes every indexable page in the sitemap', () => {
    const urls = sitemap().map((entry) => entry.url)
    expect(urls).toHaveLength(getIndexablePages().length)
    expect(robots().sitemap).toBe(`${site.brand.url}/sitemap.xml`)
  })

  it.runIf(getAllPosts().length > 0)('validates post frontmatter', () => {
    const [post] = getAllPosts()
    const services = new Set(getPublishedServices().map((service) => service.slug))
    expect(validatePost(post, services)).toEqual([])
    expect(validatePost({ ...post, relatedServiceSlugs: ['nao-existe'] }, services).join()).toMatch(/unknown or unpublished/)
    expect(validatePost({ ...post, lastModified: '2000-01-01' }, services).join()).toMatch(/predates/)
    expect(validatePost({ ...post, body: 'TODO escrever' }, services).join()).toMatch(/placeholder/)
    expect(validatePost({ ...post, relatedServiceSlugs: [] }, services).join()).toMatch(/must lead to at least one service/)
    expect(validatePost({ ...post, indexable: false, relatedServiceSlugs: [] }, services)).toEqual([])
    const long = 'x'.repeat(SEARCH_TITLE_MAX + 1)
    expect(validatePost({ ...post, title: long }, services).join()).toMatch(/title: exceeds/)
    expect(validatePost({ ...post, title: long, seoTitle: 'Curto' }, services)).toEqual([])
    expect(searchTitle({ title: long, seoTitle: 'Curto' })).toBe('Curto')
  })
})
