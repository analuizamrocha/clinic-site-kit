import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { buildMetadata } from '@/lib/metadata'
import { primaryCityLabel, site } from '@/lib/site'

export const metadata = buildMetadata({
  title: `Onde atende em ${primaryCityLabel()}`,
  description: `Endereços, horários e contatos de ${site.practitioner.displayName}.`,
  path: '/locais-de-atendimento',
})

const LocationsPage = () => (
  <div className="container-page py-10">
    <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Onde atende' }]} />
    <h1 className="mt-4 text-4xl font-semibold">Onde atende</h1>
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {site.locations.map((location) => (
        <li key={location.id}>
          <Link href={`/locais-de-atendimento/${location.slug}`} className="card block h-full hover:-translate-y-0.5">
            <h2 className="text-xl font-semibold">{location.name}</h2>
            <p className="mt-2 text-text/85">
              {location.address.district}, {location.address.city} - {location.address.region}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default LocationsPage
