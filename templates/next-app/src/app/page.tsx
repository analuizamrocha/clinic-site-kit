import Image from 'next/image'
import { ContactButton } from '@/components/ContactButton'
import { buildMetadata } from '@/lib/metadata'
import {
  councilLabel,
  getContact,
  getPublishedServices,
  positioningLine,
  primaryContact,
  site,
} from '@/lib/site'

export const metadata = buildMetadata({
  title: `${site.practitioner.displayName} | ${positioningLine()}`,
  description: site.brand.description,
  path: '/',
})

const HomePage = () => {
  const { practitioner } = site
  const services = getPublishedServices()

  return (
    <>
      <section className="container-page grid items-center gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <div>
          <h1 className="text-4xl leading-tight font-semibold text-text sm:text-5xl">
            {practitioner.displayName}{' '}
            <span className="mt-3 block text-2xl font-medium text-primary sm:text-3xl">{positioningLine()}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-text/85">{site.brand.tagline}</p>
          <p className="mt-4 text-sm font-semibold text-muted">
            {councilLabel()}
            {practitioner.rqe.length ? ` · RQE ${practitioner.rqe.join(', ')}` : null}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ContactButton contact={primaryContact()} placement="hero" />
            <a href="#servicos" className="btn btn-secondary">
              Ver atendimentos
            </a>
          </div>
        </div>
        <Image
          src={practitioner.photo.src}
          alt={practitioner.photo.alt}
          width={practitioner.photo.width}
          height={practitioner.photo.height}
          priority
          sizes="(min-width: 768px) 40vw, 92vw"
          className="mx-auto h-auto w-full max-w-md rounded-2xl"
        />
      </section>

      <section id="servicos" aria-labelledby="servicos-titulo" className="container-page scroll-mt-24 py-12">
        <h2 id="servicos-titulo" className="text-3xl font-semibold">
          Atendimentos
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug} className="card">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-text/85">{service.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="atendimento" aria-labelledby="atendimento-titulo" className="container-page scroll-mt-24 py-12">
        <h2 id="atendimento-titulo" className="text-3xl font-semibold">
          Onde atende
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {site.locations.map((location) => (
            <li key={location.id} className="card">
              <h3 className="text-xl font-semibold">{location.name}</h3>
              <address className="mt-2 not-italic text-text/85">
                {location.address.street}, {location.address.number}
                {location.address.complement ? ` – ${location.address.complement}` : null}
                <br />
                {location.address.district}, {location.address.city} - {location.address.region}
              </address>
              {location.hours?.map((line) => (
                <p key={line} className="mt-1 text-sm text-muted">
                  {line}
                </p>
              ))}
              <div className="mt-4 flex flex-wrap gap-2">
                {location.contactIds.map((id) => {
                  const contact = getContact(id)
                  return (
                    <ContactButton key={id} contact={contact} placement={`location-${location.slug}`} variant="secondary">
                      {contact.ctaLabel}: {contact.display}
                    </ContactButton>
                  )
                })}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="duvidas" aria-labelledby="duvidas-titulo" className="container-page scroll-mt-24 py-12">
        <h2 id="duvidas-titulo" className="text-3xl font-semibold">
          Dúvidas frequentes
        </h2>
        <div className="mt-6 divide-y divide-text/10 border-y border-text/10">
          {site.faqs.map((faq) => (
            <details key={faq.question} className="group py-2">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-semibold">
                {faq.question}
                <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-4 text-text/85">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage
