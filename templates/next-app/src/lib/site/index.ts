import config from '@site/site.config'
import { validateSiteConfig } from './validate'
import type { Contact, Location, Service } from './types'

/** The validated config. Importing the site fails the build if it is not. */
export const site = validateSiteConfig(config, { vercelEnv: process.env.VERCEL_ENV })

export const getContact = (id: string): Contact => {
  const contact = site.contacts.find((entry) => entry.id === id)
  if (!contact) throw new Error(`unknown contact ${id}`)
  return contact
}

export const primaryContact = () => getContact(site.brand.primaryContactId)

export const getLocation = (id: string): Location | undefined =>
  site.locations.find((entry) => entry.id === id)

/** Rendered services: drafts never reach a page, a link or the sitemap. */
export const getPublishedServices = (): Service[] =>
  site.services.filter((service) => service.state === 'published')

export const getService = (slug: string): Service | undefined =>
  getPublishedServices().find((service) => service.slug === slug)

/** City line used in the H1 and titles, e.g. `Florianópolis - SC`. */
export const primaryCityLabel = () => {
  const { city, region } = site.locations[0].address
  return `${city} - ${region}`
}

/** `Dermatologista em Florianópolis - SC` — what the search result promised. */
export const positioningLine = () => `${site.practitioner.specialty} em ${primaryCityLabel()}`

export const councilLabel = () => {
  const { body, region, number } = site.practitioner.council
  return `${body}-${region} ${number}`
}

export type { SiteConfig } from './types'
