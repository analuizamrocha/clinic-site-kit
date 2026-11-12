import config from '@site/site.config'
import { validateSiteConfig } from './validate'
import type { Contact, Location, Service } from './types'

export const cityLabel = (address: { city: string; region: string }) => `${address.city} - ${address.region}`

export const cityLabelsOf = (locations: Location[]) =>
  [...new Set(locations.map((location) => cityLabel(location.address)))]

/** One city stays in the title. Several cities must not be collapsed into the first one. */
export const singlePlaceTitle = (prefix: string, labels: string[]) =>
  labels.length === 1 ? `${prefix} em ${labels[0]}` : prefix

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

/** City line of the first location, e.g. `Florianópolis - SC`. The home page owns this query. */
export const primaryCityLabel = () => cityLabel(site.locations[0].address)

/** `Dermatologista em Florianópolis - SC` — the query the home page alone owns. */
export const positioningLine = () => `${site.practitioner.specialty} em ${primaryCityLabel()}`

const sameCity = (address: { city: string; region: string }, other: { city: string; region: string }) =>
  address.city === other.city && address.region === other.region

/**
 * Same city as the home page: this URL answers address and booking, so it does
 * not repeat the city query. A different city has no other owner, so the title
 * carries "<specialty> em <that city>".
 */
export const locationPageTitle = (
  location: Pick<Location, 'name' | 'address'>,
  home: { specialty: string; address: { city: string; region: string } },
) =>
  sameCity(location.address, home.address)
    ? `Endereço e agendamento: ${location.name}`
    : `${home.specialty} em ${cityLabel(location.address)}: ${location.name}`

export const locationTitle = (location: Location) =>
  locationPageTitle(location, { specialty: site.practitioner.specialty, address: site.locations[0].address })

/** Cities where this service is offered, not the first location on the site. */
export const servicePlaceLabel = (
  service: Pick<Service, 'locationIds'>,
  locations: Location[],
  fallback: string,
) => {
  const labels = cityLabelsOf(
    service.locationIds
      .map((id) => locations.find((location) => location.id === id))
      .filter((location): location is Location => Boolean(location)),
  )
  return labels.length ? labels.join(', ') : fallback
}

export const publishedCityLabels = () =>
  cityLabelsOf(
    getPublishedServices().flatMap((service) =>
      service.locationIds
        .map((id) => getLocation(id))
        .filter((location): location is Location => Boolean(location)),
    ),
  )

export const councilLabel = () => {
  const { body, region, number } = site.practitioner.council
  return `${body}-${region} ${number}`
}

export type { SiteConfig } from './types'
