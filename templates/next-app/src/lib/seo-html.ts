/** Fetch-free reading of the HTML a crawler gets. No JavaScript is executed. */

export type SeoHtmlReport = {
  url: string
  title: string
  h1: string[]
  h2: string[]
  jsonLdCount: number
  canonical: string | null
  imagesMissingAlt: string[]
  internalLinksInMain: number
  internalLinkCount: number
  issues: string[]
}

const stripComments = (html: string) => html.replace(/<!--[\s\S]*?-->/g, '')

const stripScriptAndStyle = (html: string) =>
  html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '')

const decodeEntities = (value: string) =>
  value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')

const visibleText = (fragment: string) => decodeEntities(fragment.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())

const blocks = (html: string, tag: string) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi'))].map((match) => visibleText(match[1]))

const jsonLdCount = (html: string) =>
  [...html.matchAll(/<script\b([\s\S]*?)>([\s\S]*?)<\/script>/gi)].filter(
    (match) => /type\s*=\s*["']application\/ld\+json["']/i.test(match[1]) && match[2].trim().length > 0,
  ).length

const canonicalHref = (html: string) => {
  for (const match of html.matchAll(/<link\b([^>]*)>/gi)) {
    const attrs = match[1]
    if (!/\brel\s*=\s*["']canonical["']/i.test(attrs)) continue
    return attrs.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] ?? null
  }
  return null
}

const imagesMissingAlt = (html: string) =>
  [...html.matchAll(/<img\b([^>]*?)>/gi)]
    .filter((match) => !/\balt\s*=/i.test(match[1]))
    .map((match) => match[1].match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] ?? '(sem src)')

const isInternalHref = (href: string, page: URL) => {
  const value = href.trim()
  if (!value || value.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(value)) return false
  try {
    return new URL(value, page).origin === page.origin
  } catch {
    return false
  }
}

const countInternalLinks = (html: string, page: URL) =>
  [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi)].filter((match) => isInternalHref(match[1], page)).length

export const auditHtml = (html: string, pageUrl: string): SeoHtmlReport => {
  const source = stripComments(html)
  const visible = stripScriptAndStyle(source)
  const page = new URL(pageUrl)
  const main = visible.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
  const title = blocks(source, 'title')[0] ?? ''
  const h1 = blocks(visible, 'h1')
  const h2 = blocks(visible, 'h2')
  const ld = jsonLdCount(source)
  const canonical = canonicalHref(source)
  const missingAlt = imagesMissingAlt(visible)
  const issues: string[] = []
  if (!title) issues.push('title ausente')
  if (h1.length !== 1) issues.push(`h1: esperado 1, encontrado ${h1.length}`)
  if (ld === 0) issues.push('JSON-LD ausente')
  for (const src of missingAlt) issues.push(`img sem alt: ${src}`)
  if (!canonical) issues.push('canonical ausente')
  return {
    url: pageUrl,
    title,
    h1,
    h2,
    jsonLdCount: ld,
    canonical,
    imagesMissingAlt: missingAlt,
    internalLinksInMain: countInternalLinks(main ?? visible, page),
    internalLinkCount: countInternalLinks(visible, page),
    issues,
  }
}

export const formatSeoHtmlReport = (report: SeoHtmlReport) => {
  const lines = [
    report.url,
    `  title: ${report.title || '(vazio)'}`,
    `  h1 (${report.h1.length}): ${report.h1.join(' | ') || '(nenhum)'}`,
    `  h2 (${report.h2.length}): ${report.h2.join(' | ') || '(nenhum)'}`,
    `  json-ld: ${report.jsonLdCount}`,
    `  canonical: ${report.canonical ?? '(ausente)'}`,
    `  imagens sem alt: ${report.imagesMissingAlt.length ? report.imagesMissingAlt.join(', ') : '0'}`,
    `  links internos no <main>: ${report.internalLinksInMain}`,
    `  links internos na página: ${report.internalLinkCount}`,
  ]
  if (report.issues.length === 0) lines.push('  problemas: nenhum')
  else {
    lines.push('  problemas:')
    for (const issue of report.issues) lines.push(`    - ${issue}`)
  }
  return lines.join('\n')
}

/** Joins an origin and route list the way the CLI accepts them. */
export const resolveSeoHtmlTargets = (origin: string, paths: string[]) => {
  const base = origin.replace(/\/$/, '')
  if (paths.length === 0) return [`${base}/`]
  return paths.map((path) => {
    if (/^https?:\/\//i.test(path)) return path
    return `${base}${path.startsWith('/') ? path : `/${path}`}`
  })
}
