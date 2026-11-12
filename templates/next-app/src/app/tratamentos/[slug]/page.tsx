import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Byline } from '@/components/Byline'
import { ContactButton } from '@/components/ContactButton'
import { CtaCard } from '@/components/CtaCard'
import { FaqList } from '@/components/FaqList'
import { JsonLd } from '@/components/JsonLd'
import { Sources } from '@/components/Sources'
import { getPostsForService } from '@/lib/blog'
import { buildMetadata } from '@/lib/metadata'
import { servicePage } from '@/lib/schema'
import { getContact, getLocation, getPublishedServices, getService, primaryCityLabel, servicePlaceLabel, site } from '@/lib/site'
import type { Location } from '@/lib/site/types'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export const generateStaticParams = () => getPublishedServices().map((service) => ({ slug: service.slug }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const service = getService((await params).slug)
  if (!service) return {}
  return buildMetadata({
    title: `${service.title} em ${servicePlaceLabel(service, site.locations, primaryCityLabel())}`,
    description: service.summary,
    path: `/tratamentos/${service.slug}`,
    indexable: service.indexable,
  })
}

const TreatmentPage = async ({ params }: Props) => {
  const service = getService((await params).slug)
  if (!service) notFound()

  const contact = getContact(service.contactId)
  const locations = service.locationIds.map(getLocation).filter((location): location is Location => Boolean(location))
  const posts = getPostsForService(service.slug)

  return (
    <article className="container-page py-10">
      {/* A page awaiting clinical sign-off is readable but never announces itself as reviewed content. */}
      {service.indexable ? <JsonLd data={servicePage(service)} /> : null}
      <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Tratamentos', path: '/tratamentos' }, { name: service.title }]} />

      <header className="mt-4 border-b border-text/10 pb-6">
        <h1 className="text-4xl font-semibold sm:text-5xl">{service.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-text/85">{service.summary}</p>
        <Byline lastReviewed={service.lastReviewed} />
        {/* On phones the sidebar stacks under the content; keep one labelled route next to the summary. */}
        <div className="mt-6 lg:hidden">
          <ContactButton contact={contact} placement="service-intro" className="w-full" />
        </div>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <section aria-labelledby="indicacoes">
            <h2 id="indicacoes" className="text-2xl font-semibold">
              Quando é considerado
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-text/85">
              {service.indications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="como-funciona" className="mt-10">
            <h2 id="como-funciona" className="text-2xl font-semibold">
              Como funciona
            </h2>
            <div className="mt-4 space-y-4 text-text/85">
              {service.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
          <FaqList faqs={service.faqs} headingId="duvidas" title={`Dúvidas sobre ${service.title.toLocaleLowerCase('pt-BR')}`} />
          <Sources sources={service.sources} />
          {posts.length ? (
            <section aria-labelledby="leituras" className="mt-10">
              <h2 id="leituras" className="text-2xl font-semibold">
                Para ler antes da consulta
              </h2>
              <ul className="mt-4 grid gap-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="card block hover:-translate-y-0.5">
                      <span className="font-semibold">{post.title}</span>
                      <span className="mt-1 block text-sm text-text/80">{post.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="grid content-start gap-6">
          <CtaCard
            contact={contact}
            placement="service-sidebar"
            eyebrow={service.title}
            title="Avalie o seu caso"
            body="A indicação depende da avaliação individual, na consulta."
          />
          {locations.map((location) => (
            <section key={location.id} className="card">
              <h2 className="text-lg font-semibold">{location.name}</h2>
              <p className="mt-1 text-sm text-text/85">
                {location.address.district}, {location.address.city} - {location.address.region}
              </p>
              <Link href={`/locais-de-atendimento/${location.slug}`} className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary">
                Ver endereço e horários
              </Link>
            </section>
          ))}
        </aside>
      </div>

      <p className="mt-12 text-sm text-muted">
        Conteúdo informativo. A definição do tratamento depende de consulta e exame clínico.
      </p>
    </article>
  )
}

export default TreatmentPage
