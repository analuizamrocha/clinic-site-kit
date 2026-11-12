/**
 * Contracts for every client fact the site renders. `site/site.config.ts` is
 * the only file that holds values; pages, metadata and structured data derive
 * from it. `validateSiteConfig` refuses incomplete or unsafe values at build.
 */

/** Why a patient would use a contact. Different kinds of care may need different lines. */
export type ContactPurpose = 'consulta' | 'exame' | 'secretaria' | 'clinica'

export interface Contact {
  id: string
  purpose: ContactPurpose
  channel: 'whatsapp' | 'phone'
  /** E.164 without punctuation, e.g. `+5548999990000`. */
  e164: string
  /** As patients read it, e.g. `(48) 99999-0000`. */
  display: string
  /** Visible label of the main button, e.g. `Agendar consulta`. */
  ctaLabel: string
  /**
   * WhatsApp only. Generic on purpose: never a condition, procedure or
   * personal detail — the validator rejects clinical terms.
   */
  message?: string
}

export interface PostalAddress {
  street: string
  number: string
  complement?: string
  district: string
  city: string
  /** Two-letter UF, e.g. `SC`. */
  region: string
  postalCode: string
}

export interface Location {
  id: string
  slug: string
  name: string
  address: PostalAddress
  geo?: { latitude: number; longitude: number }
  mapsUrl?: string
  /** Free text as the practice states it, e.g. `Segunda a sexta, 8h às 18h`. */
  hours?: string[]
  contactIds: string[]
}

export interface CouncilRegistration {
  /** CRM, CRO, CRP, CREFITO… */
  body: string
  region: string
  number: string
}

export interface Practitioner {
  /** Full legal name, for structured data. */
  name: string
  /** As the practice presents it, e.g. `Dra. Helena Exemplo`. */
  displayName: string
  /** Singular, as on the council registration, e.g. `Dermatologista`. */
  specialty: string
  council: CouncilRegistration
  /** Specialist registrations (RQE), when they exist. */
  rqe: string[]
  bio: string
  credentials: string[]
  photo: ImageAsset
  sameAs: string[]
}

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
}

export interface Faq {
  question: string
  answer: string
}

export interface ArticleSource {
  title: string
  publisher?: string
  year?: number
  url?: string
}

export interface Service {
  slug: string
  title: string
  /** One or two sentences: what it is and who it is for. */
  summary: string
  /** Situations in which the practitioner evaluates this; never promises. */
  indications: string[]
  body: string[]
  faqs: Faq[]
  /** Contact that books this service — the destination depends on the care. */
  contactId: string
  locationIds: string[]
  /** `draft` is not rendered; `published` + `indexable: false` awaits clinical sign-off. */
  state: 'draft' | 'published'
  indexable: boolean
  lastReviewed?: string
  sources?: ArticleSource[]
}

export interface Palette {
  /** Buttons, links, emphasis. */
  primary: string
  /** Text on `primary`. */
  onPrimary: string
  /** Small accents: chips, rules. Never body text. */
  accent: string
  background: string
  /** Cards and raised surfaces. */
  surface: string
  /** Headings and body text. */
  text: string
  /** Secondary text: dates, captions. */
  muted: string
}

export interface Brand {
  siteName: string
  /** Canonical origin without trailing slash, e.g. `https://www.exemplo.com.br`. */
  url: string
  locale: 'pt-BR'
  /** One line under the H1, in the practice's own words. */
  tagline: string
  /** Default meta description (≤ 160 characters). */
  description: string
  palette: Palette
  /** Contact used by the header, hero and floating button. */
  primaryContactId: string
}

export interface Analytics {
  /** `GTM-XXXX`; loaded only after consent. */
  gtmId?: string
}

export interface Privacy {
  /** Who controls patient data under LGPD, as on the privacy policy. */
  controller: string
  email: string
}

/**
 * A permanent redirect for a URL that people or Google still use but the site
 * no longer serves: a renamed slug, a misspelled link on another site. Add one
 * when Search Console shows a 404 that still earns impressions.
 */
export interface Redirect {
  /** Path starting with `/`, e.g. `/blog/old-slug`. */
  from: string
  /** Path of a page this site serves, e.g. `/blog/new-slug`. */
  to: string
  /** Why it exists, so nobody deletes it as dead config. */
  reason: string
}

export interface SiteConfig {
  /**
   * True for demo/fixture data. Renders a visible demo banner, noindexes the
   * site, and fails a Vercel production build.
   */
  fictional: boolean
  brand: Brand
  practitioner: Practitioner
  contacts: Contact[]
  locations: Location[]
  services: Service[]
  faqs: Faq[]
  analytics: Analytics
  privacy: Privacy
  redirects?: Redirect[]
}
