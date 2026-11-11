import { Breadcrumb } from '@/components/Breadcrumb'
import { FaqList } from '@/components/FaqList'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Dúvidas frequentes',
  description: `Respostas sobre agendamento e atendimento com ${site.practitioner.displayName}.`,
  path: '/perguntas-frequentes',
})

const FaqPage = () => (
  <div className="container-page max-w-3xl py-10">
    <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Dúvidas frequentes' }]} />
    <h1 className="mt-4 text-4xl font-semibold">Dúvidas frequentes</h1>
    <FaqList faqs={site.faqs} headingId="perguntas" title="Perguntas sobre o atendimento" />
  </div>
)

export default FaqPage
