import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { buildMetadata } from '@/lib/metadata'
import { getPublishedServices, publishedCityLabels, singlePlaceTitle, site } from '@/lib/site'

export const metadata = buildMetadata({
  title: singlePlaceTitle('Tratamentos', publishedCityLabels()),
  description: `Páginas de atendimento de ${site.practitioner.displayName}. Cada uma explica quando o atendimento é considerado e como agendar.`,
  path: '/tratamentos',
})

const TreatmentsPage = () => (
  <div className="container-page py-10">
    <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Tratamentos' }]} />
    <h1 className="mt-4 text-4xl font-semibold">Tratamentos</h1>
    <p className="mt-3 max-w-2xl text-lg text-text/85">
      Cada página explica quando o atendimento é considerado e como agendar.
    </p>
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {getPublishedServices().map((service) => (
        <li key={service.slug}>
          <Link href={`/tratamentos/${service.slug}`} className="card block h-full transition hover:-translate-y-0.5">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="mt-2 text-text/85">{service.summary}</p>
            <span className="mt-4 inline-block font-semibold text-primary">Conhecer o tratamento</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default TreatmentsPage
