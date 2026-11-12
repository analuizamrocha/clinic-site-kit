import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ContactButton } from '@/components/ContactButton'
import { JsonLd } from '@/components/JsonLd'
import { buildMetadata } from '@/lib/metadata'
import { clinicNode } from '@/lib/schema'
import { getContact, getPublishedServices, locationTitle, site } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

const findLocation = (slug: string) => site.locations.find((location) => location.slug === slug)

export const generateStaticParams = () => site.locations.map((location) => ({ slug: location.slug }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const location = findLocation((await params).slug)
  if (!location) return {}
  return buildMetadata({
    // The home page owns "<specialty> em <its city>". A location in that same
    // city answers address and booking searches. A location in another city is
    // the only page that can own that city's query.
    title: locationTitle(location),
    description: `Endereço, horários e como agendar com ${site.practitioner.displayName} em ${location.name}.`,
    path: `/locais-de-atendimento/${location.slug}`,
  })
}

const LocationPage = async ({ params }: Props) => {
  const location = findLocation((await params).slug)
  if (!location) notFound()
  const services = getPublishedServices().filter((service) => service.locationIds.includes(location.id))

  return (
    <div className="container-page py-10">
      <JsonLd data={{ '@context': 'https://schema.org', ...clinicNode(location) }} />
      <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Onde atende', path: '/locais-de-atendimento' }, { name: location.name }]} />
      <h1 className="mt-4 text-4xl font-semibold">{location.name}</h1>
      <address className="mt-4 text-lg not-italic text-text/85">
        {location.address.street}, {location.address.number}
        {location.address.complement ? ` – ${location.address.complement}` : null}
        <br />
        {location.address.district}, {location.address.city} - {location.address.region}, {location.address.postalCode}
      </address>
      {location.hours?.map((line) => (
        <p key={line} className="mt-2 text-muted">
          {line}
        </p>
      ))}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {location.contactIds.map((id, index) => {
          const contact = getContact(id)
          return (
            <ContactButton key={id} contact={contact} placement={`location-${location.slug}`} variant={index === 0 ? 'primary' : 'secondary'}>
              {contact.ctaLabel}: {contact.display}
            </ContactButton>
          )
        })}
        {location.mapsUrl ? (
          <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" data-conversion="maps-location">
            Como chegar
          </a>
        ) : null}
      </div>
      {services.length ? (
        <section aria-labelledby="servicos-local" className="mt-12">
          <h2 id="servicos-local" className="text-2xl font-semibold">
            Atendimentos neste local
          </h2>
          <ul className="mt-4 grid gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/tratamentos/${service.slug}`} className="inline-flex min-h-11 items-center font-semibold text-primary">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

export default LocationPage
