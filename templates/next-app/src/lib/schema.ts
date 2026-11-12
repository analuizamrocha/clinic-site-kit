import type { Post } from '@/lib/blog'
import { contactHref } from '@/lib/contact-links'
import { councilLabel, getContact, getLocation, site } from '@/lib/site'
import type { ArticleSource, Faq, Location, Service } from '@/lib/site/types'

/**
 * JSON-LD builders. Rule: every property describes something visible on the
 * page that emits it. FAQ, review dates and citations appear only where the
 * page renders them.
 */

const base = () => site.brand.url
export const PRACTITIONER_ID = () => `${base()}/#physician`
export const WEBSITE_ID = () => `${base()}/#website`
export const locationId = (location: Location) => `${base()}/locais-de-atendimento/${location.slug}#clinic`

const postalAddress = (location: Location) => ({
  '@type': 'PostalAddress',
  streetAddress: [location.address.street, location.address.number, location.address.complement]
    .filter(Boolean)
    .join(', '),
  addressLocality: location.address.city,
  addressRegion: location.address.region,
  postalCode: location.address.postalCode,
  addressCountry: 'BR',
})

export const clinicNode = (location: Location) => ({
  '@type': 'MedicalClinic',
  '@id': locationId(location),
  name: location.name,
  url: `${base()}/locais-de-atendimento/${location.slug}`,
  address: postalAddress(location),
  ...(location.geo ? { geo: { '@type': 'GeoCoordinates', ...location.geo } } : {}),
  ...(location.mapsUrl ? { hasMap: location.mapsUrl } : {}),
  telephone: location.contactIds.map((id) => getContact(id).e164),
})

/** Sitewide: the practitioner, the website, and each place of care. */
export const siteGraph = () => {
  const { practitioner } = site
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID(),
        url: base(),
        name: site.brand.siteName,
        inLanguage: site.brand.locale,
      },
      {
        '@type': 'Physician',
        '@id': PRACTITIONER_ID(),
        name: practitioner.name,
        alternateName: practitioner.displayName,
        description: practitioner.bio,
        medicalSpecialty: practitioner.specialty,
        url: `${base()}/sobre`,
        image: `${base()}${practitioner.photo.src}`,
        identifier: [councilLabel(), ...practitioner.rqe.map((rqe) => `RQE ${rqe}`)],
        sameAs: practitioner.sameAs,
        address: postalAddress(site.locations[0]),
        location: site.locations.map((location) => ({ '@id': locationId(location) })),
        contactPoint: site.contacts.map((contact) => ({
          '@type': 'ContactPoint',
          contactType: contact.purpose,
          telephone: contact.e164,
          url: contactHref(contact).startsWith('https://') ? contactHref(contact).split('?')[0] : undefined,
          availableLanguage: 'Portuguese',
        })),
      },
      ...site.locations.map(clinicNode),
    ],
  }
}

export const breadcrumb = (items: Array<{ name: string; path?: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.path ? { item: `${base()}${item.path}` } : {}),
  })),
})

export const faqPage = (faqs: Faq[]) =>
  faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null

const citations = (sources?: ArticleSource[]) =>
  sources?.length
    ? {
        citation: sources.map((source) => ({
          '@type': 'CreativeWork',
          name: source.title,
          ...(source.publisher ? { publisher: { '@type': 'Organization', name: source.publisher } } : {}),
          ...(source.year ? { datePublished: String(source.year) } : {}),
          ...(source.url ? { url: source.url } : {}),
        })),
      }
    : {}

const review = (lastReviewed?: string) =>
  lastReviewed ? { lastReviewed, reviewedBy: { '@id': PRACTITIONER_ID() } } : {}

export const servicePage = (service: Service) => {
  const url = `${base()}/tratamentos/${service.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': url,
    url,
    name: service.title,
    description: service.summary,
    inLanguage: site.brand.locale,
    isPartOf: { '@id': WEBSITE_ID() },
    author: { '@id': PRACTITIONER_ID() },
    ...review(service.lastReviewed),
    ...citations(service.sources),
    about: {
      '@type': 'MedicalProcedure',
      name: service.title,
      description: service.summary,
      ...(service.locationIds.length
        ? {
            availableAtOrFrom: service.locationIds
              .map(getLocation)
              .filter((location): location is Location => Boolean(location))
              .map((location) => ({ '@id': locationId(location) })),
          }
        : {}),
    },
  }
}

export const articlePage = (post: Post) => {
  const url = `${base()}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalWebPage', 'BlogPosting'],
    '@id': url,
    url,
    headline: post.title,
    description: post.description,
    inLanguage: site.brand.locale,
    datePublished: post.publishDate,
    dateModified: post.lastModified,
    author: { '@id': PRACTITIONER_ID() },
    publisher: { '@id': PRACTITIONER_ID() },
    isPartOf: { '@id': WEBSITE_ID() },
    ...review(post.lastReviewed),
    ...citations(post.sources),
  }
}
