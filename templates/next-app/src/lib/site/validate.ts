import { contrastRatio } from '@/lib/theme'
import type { Redirect, SiteConfig } from './types'

/**
 * Words that must never appear in a prefilled WhatsApp message: the message
 * travels through the patient's phone and the practice's inbox, and anything
 * clinical in it discloses health information before anyone asked for it.
 * Extend per specialty in the generated repo.
 */
export const CLINICAL_TERMS = [
  'dor', 'sangr', 'cirurg', 'laser', 'câncer', 'cancer', 'tumor', 'hemorr', 'fissur', 'fístul',
  'fistul', 'cisto', 'hpv', 'hiv', 'herpes', 'hérnia', 'hernia', 'coluna', 'nervo', 'depress',
  'ansied', 'gravid', 'diabet', 'acne', 'mancha', 'pinta', 'biópsia', 'biopsia',
  'diagnóst', 'diagnost', 'sintoma', 'doença', 'doenca',
]

/** The clinical term a message mentions, matched at the start of a word. */
export const findClinicalTerm = (message: string) => {
  const lowered = message.toLocaleLowerCase('pt-BR')
  return CLINICAL_TERMS.find((term) => new RegExp(`(^|[^\\p{L}])${term}`, 'u').test(lowered))
}

const PLACEHOLDER = /\b(TODO|TBD|PREENCHER|XXX+|lorem|ipsum)\b|<[^>]*>/i
const E164 = /^\+[1-9]\d{7,14}$/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const HEX = /^#[0-9a-f]{6}$/i
/** WCAG AA for normal text. */
export const MIN_CONTRAST = 4.5

export class SiteConfigError extends Error {
  constructor(public readonly problems: string[]) {
    super(`site.config.ts has ${problems.length} problem(s):\n- ${problems.join('\n- ')}`)
    this.name = 'SiteConfigError'
  }
}

const walkStrings = (value: unknown, path: string, visit: (path: string, text: string) => void) => {
  if (typeof value === 'string') return visit(path, value)
  if (Array.isArray(value)) return value.forEach((item, index) => walkStrings(item, `${path}[${index}]`, visit))
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) walkStrings(child, path ? `${path}.${key}` : key, visit)
  }
}

const isRealDate = (value: string) =>
  ISO_DATE.test(value) && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value

const isHttps = (value: string) => {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

/** Every problem at once, so a new client's config is fixed in one pass. */
export const findSiteConfigProblems = (
  config: SiteConfig,
  env: { vercelEnv?: string } = {},
): string[] => {
  const problems: string[] = []
  const add = (path: string, detail: string) => problems.push(`${path}: ${detail}`)

  walkStrings(config, '', (path, text) => {
    if (!text.trim() && !path.endsWith('complement')) add(path, 'is empty')
    if (PLACEHOLDER.test(text)) add(path, `looks like a placeholder (“${text.slice(0, 40)}”)`)
  })

  if (config.fictional && env.vercelEnv === 'production') {
    add('fictional', 'demo data cannot be deployed to production')
  }

  const { brand } = config
  if (!isHttps(brand.url) || brand.url.endsWith('/')) add('brand.url', 'must be an https origin without trailing slash')
  if (brand.description.length > 160) add('brand.description', 'exceeds 160 characters')

  for (const [name, value] of Object.entries(brand.palette)) {
    if (!HEX.test(value)) add(`brand.palette.${name}`, 'must be a #rrggbb hex colour')
  }
  if (Object.values(brand.palette).every((value) => HEX.test(value))) {
    const { palette } = brand
    const pairs: Array<[string, string, string]> = [
      ['text on background', palette.text, palette.background],
      ['text on surface', palette.text, palette.surface],
      ['muted on background', palette.muted, palette.background],
      ['onPrimary on primary', palette.onPrimary, palette.primary],
      ['primary on background', palette.primary, palette.background],
    ]
    for (const [label, fg, bg] of pairs) {
      const ratio = contrastRatio(fg, bg)
      if (ratio < MIN_CONTRAST) add('brand.palette', `${label} is ${ratio.toFixed(2)}:1, below ${MIN_CONTRAST}:1`)
    }
  }

  const contactIds = new Set<string>()
  config.contacts.forEach((contact, index) => {
    const path = `contacts[${index}]`
    if (contactIds.has(contact.id)) add(path, `duplicate id ${contact.id}`)
    contactIds.add(contact.id)
    if (!E164.test(contact.e164)) add(`${path}.e164`, 'must be E.164, e.g. +5548999990000')
    if (!config.fictional && /0{6,}/.test(contact.e164)) add(`${path}.e164`, 'looks like a dummy number')
    if (contact.channel === 'whatsapp') {
      if (!contact.message) add(`${path}.message`, 'WhatsApp contacts need a generic prefilled message')
      const term = findClinicalTerm(contact.message ?? '')
      if (term) add(`${path}.message`, `mentions a clinical term (“${term}”); keep the message generic`)
    }
  })
  if (!contactIds.has(brand.primaryContactId)) add('brand.primaryContactId', `unknown contact ${brand.primaryContactId}`)

  const locationIds = new Set<string>()
  config.locations.forEach((location, index) => {
    const path = `locations[${index}]`
    if (locationIds.has(location.id)) add(path, `duplicate id ${location.id}`)
    locationIds.add(location.id)
    if (!SLUG.test(location.slug)) add(`${path}.slug`, 'must be lowercase-hyphenated')
    if (!/^[A-Z]{2}$/.test(location.address.region)) add(`${path}.address.region`, 'must be a two-letter UF')
    if (location.mapsUrl && !isHttps(location.mapsUrl)) add(`${path}.mapsUrl`, 'must be https')
    for (const id of location.contactIds) if (!contactIds.has(id)) add(`${path}.contactIds`, `unknown contact ${id}`)
  })
  if (!config.locations.length) add('locations', 'at least one location is required')

  const serviceSlugs = new Set<string>()
  config.services.forEach((service, index) => {
    const path = `services[${index}]`
    if (!SLUG.test(service.slug)) add(`${path}.slug`, 'must be lowercase-hyphenated')
    if (serviceSlugs.has(service.slug)) add(`${path}.slug`, `duplicate slug ${service.slug}`)
    serviceSlugs.add(service.slug)
    if (!contactIds.has(service.contactId)) add(`${path}.contactId`, `unknown contact ${service.contactId}`)
    for (const id of service.locationIds) if (!locationIds.has(id)) add(`${path}.locationIds`, `unknown location ${id}`)
    if (service.state === 'draft' && service.indexable) add(`${path}.indexable`, 'a draft cannot be indexable')
    if (service.lastReviewed && !isRealDate(service.lastReviewed)) add(`${path}.lastReviewed`, 'must be a real ISO date')
    service.sources?.forEach((source, sourceIndex) => {
      if (source.url && !isHttps(source.url)) add(`${path}.sources[${sourceIndex}].url`, 'must be https')
    })
  })

  for (const url of config.practitioner.sameAs) if (!isHttps(url)) add('practitioner.sameAs', `${url} must be https`)
  if (config.analytics.gtmId && !/^GTM-[A-Z0-9]+$/.test(config.analytics.gtmId)) add('analytics.gtmId', 'must look like GTM-XXXX')
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(config.privacy.email)) add('privacy.email', 'must be an e-mail address')

  const redirectSources = new Set<string>()
  config.redirects?.forEach((redirect, index) => {
    const path = `redirects[${index}]`
    for (const field of ['from', 'to'] as const) {
      if (!redirect[field].startsWith('/') || redirect[field].startsWith('//') || /[?#\s]/.test(redirect[field])) {
        add(`${path}.${field}`, 'must be a path starting with /, without a query or hash')
      }
    }
    if (redirect.from === '/') add(`${path}.from`, 'cannot redirect the home page')
    if (redirect.from === redirect.to) add(`${path}.to`, 'points at itself')
    if (redirectSources.has(redirect.from)) add(`${path}.from`, `duplicate redirect from ${redirect.from}`)
    redirectSources.add(redirect.from)
  })
  for (const redirect of config.redirects ?? []) {
    if (redirectSources.has(redirect.to)) add('redirects', `${redirect.to} is both a source and a destination (chain)`)
  }

  return problems
}

/**
 * Route checks need the pages the app actually builds, so they run once those
 * lists exist (see `assertRedirectTargets`). A permanent redirect to a missing
 * URL, or away from a page the site still serves, is cached by browsers.
 */
export const findRedirectTargetProblems = (
  redirects: ReadonlyArray<Pick<Redirect, 'from' | 'to'>> | undefined,
  routes: { indexable: ReadonlySet<string>; served: ReadonlySet<string> },
): string[] => {
  const problems: string[] = []
  redirects?.forEach((redirect, index) => {
    if (!routes.indexable.has(redirect.to)) {
      problems.push(`redirects[${index}].to: ${redirect.to} is not an indexable page`)
    }
    if (routes.served.has(redirect.from)) {
      problems.push(`redirects[${index}].from: ${redirect.from} is already a page on this site`)
    }
  })
  return problems
}

export const validateSiteConfig = (config: SiteConfig, env: { vercelEnv?: string } = {}) => {
  const problems = findSiteConfigProblems(config, env)
  if (problems.length) throw new SiteConfigError(problems)
  return config
}
