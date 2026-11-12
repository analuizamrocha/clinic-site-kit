import { getAllPosts } from '@/lib/blog'
import { getPublishedServices, site } from '@/lib/site'
import { findRedirectTargetProblems, SiteConfigError } from '@/lib/site/validate'

export interface DiscoverablePage {
  path: string
  title: string
  lastModified?: string
}

/**
 * Every indexable page, from the same data the routes render. Sitemap,
 * llms.txt and the discovery test all read this list, so they cannot drift.
 */
export const getIndexablePages = (): DiscoverablePage[] => [
  { path: '/', title: site.brand.siteName },
  { path: '/sobre', title: `Sobre ${site.practitioner.displayName}` },
  { path: '/tratamentos', title: 'Tratamentos' },
  ...getPublishedServices()
    .filter((service) => service.indexable)
    .map((service) => ({ path: `/tratamentos/${service.slug}`, title: service.title, lastModified: service.lastReviewed })),
  { path: '/locais-de-atendimento', title: 'Onde atende' },
  ...site.locations.map((location) => ({ path: `/locais-de-atendimento/${location.slug}`, title: location.name })),
  { path: '/blog', title: 'Blog' },
  ...getAllPosts()
    .filter((post) => post.indexable)
    .map((post) => ({ path: `/blog/${post.slug}`, title: post.title, lastModified: post.lastModified })),
  { path: '/perguntas-frequentes', title: 'Dúvidas frequentes' },
  { path: '/contato', title: 'Contato' },
]

const STATIC_PATHS = [
  '/',
  '/sobre',
  '/tratamentos',
  '/locais-de-atendimento',
  '/blog',
  '/perguntas-frequentes',
  '/contato',
  '/politica-privacidade',
]

/** Every URL the app can respond to, including pages that stay out of the sitemap. */
export const getServedPaths = (): string[] => [
  ...STATIC_PATHS,
  ...getPublishedServices().map((service) => `/tratamentos/${service.slug}`),
  ...site.locations.map((location) => `/locais-de-atendimento/${location.slug}`),
  ...getAllPosts().map((post) => `/blog/${post.slug}`),
]

/** Fails the build when a permanent redirect points at the wrong kind of URL. */
export const assertRedirectTargets = () => {
  const problems = findRedirectTargetProblems(site.redirects, {
    indexable: new Set(getIndexablePages().map((page) => page.path)),
    served: new Set(getServedPaths()),
  })
  if (problems.length) throw new SiteConfigError(problems)
}

export const renderLlmsTxt = () => {
  const pages = getIndexablePages()
  const section = (prefix: string) =>
    pages
      .filter((page) => page.path.startsWith(prefix))
      .map((page) => `- [${page.title}](${site.brand.url}${page.path})`)
      .join('\n')
  return [
    `# ${site.brand.siteName}`,
    '',
    `> ${site.practitioner.displayName}, ${site.practitioner.specialty.toLocaleLowerCase('pt-BR')}. ${site.brand.description}`,
    '',
    '## Tratamentos',
    section('/tratamentos/'),
    '',
    '## Onde atende',
    section('/locais-de-atendimento/'),
    '',
    '## Artigos',
    section('/blog/'),
    '',
  ].join('\n')
}
