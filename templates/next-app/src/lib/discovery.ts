import { getAllPosts } from '@/lib/blog'
import { getPublishedServices, site } from '@/lib/site'

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
