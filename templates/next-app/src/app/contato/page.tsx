import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ContactButton } from '@/components/ContactButton'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

const PURPOSE_LABEL = {
  consulta: 'Consultas',
  exame: 'Exames',
  secretaria: 'Secretaria',
  clinica: 'Clínica',
} as const

export const metadata = buildMetadata({
  title: 'Contato',
  description: `Como agendar com ${site.practitioner.displayName}: WhatsApp, telefone e endereços.`,
  path: '/contato',
})

const ContactPage = () => (
  <div className="container-page py-10">
    <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Contato' }]} />
    <h1 className="mt-4 text-4xl font-semibold">Contato</h1>
    <p className="mt-3 text-lg text-text/85">Escolha o canal de acordo com o que você precisa.</p>
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {site.contacts.map((contact) => (
        <li key={contact.id} className="card">
          <h2 className="text-xl font-semibold">{PURPOSE_LABEL[contact.purpose]}</h2>
          <p className="mt-1 text-text/85">{contact.display}</p>
          <ContactButton contact={contact} placement="contact-page" className="mt-4" />
        </li>
      ))}
    </ul>
    <p className="mt-8">
      <Link href="/locais-de-atendimento" className="inline-flex min-h-11 items-center font-semibold text-primary">
        Ver endereços e horários
      </Link>
    </p>
  </div>
)

export default ContactPage
