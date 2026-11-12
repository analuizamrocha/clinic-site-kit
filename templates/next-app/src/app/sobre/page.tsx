import Image from 'next/image'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ContactButton } from '@/components/ContactButton'
import { buildMetadata } from '@/lib/metadata'
import { cityLabelsOf, councilLabel, primaryContact, site } from '@/lib/site'

const attendedCities = cityLabelsOf(site.locations)

export const metadata = buildMetadata({
  title: `Sobre ${site.practitioner.displayName}`,
  description: `${site.practitioner.displayName}, ${site.practitioner.specialty}. ${councilLabel()}.`,
  path: '/sobre',
})

const AboutPage = () => {
  const { practitioner } = site
  return (
    <div className="container-page grid gap-10 py-10 md:grid-cols-[1fr_20rem]">
      <div>
        <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Sobre' }]} />
        <h1 className="mt-4 text-4xl font-semibold">{practitioner.displayName}</h1>
        <p className="mt-2 text-xl text-primary">{practitioner.specialty}</p>
        <p className="mt-2 text-muted">Atende em {attendedCities.join(', ')}.</p>
        <p className="mt-2 text-sm font-semibold text-muted">
          {councilLabel()}
          {practitioner.rqe.length ? ` · RQE ${practitioner.rqe.join(', ')}` : null}
        </p>
        <p className="mt-6 text-lg text-text/85">{practitioner.bio}</p>
        <h2 className="mt-10 text-2xl font-semibold">Formação</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-text/85">
          {practitioner.credentials.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ContactButton contact={primaryContact()} placement="about" className="mt-8" />
      </div>
      <Image
        src={practitioner.photo.src}
        alt={practitioner.photo.alt}
        width={practitioner.photo.width}
        height={practitioner.photo.height}
        sizes="(min-width: 768px) 20rem, 92vw"
        className="h-auto w-full rounded-2xl"
      />
    </div>
  )
}

export default AboutPage
