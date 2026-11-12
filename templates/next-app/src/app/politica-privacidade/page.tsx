import { Breadcrumb } from '@/components/Breadcrumb'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Política de privacidade',
  description: 'Como este site trata dados pessoais e cookies.',
  path: '/politica-privacidade',
  indexable: false,
})

/**
 * Baseline text for a brochure site with consent-gated analytics. Adapt it
 * with the practice's legal advisor; it is not legal advice.
 */
const PrivacyPage = () => (
  <div className="container-page max-w-3xl space-y-4 py-10 text-text/85">
    <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Privacidade' }]} />
    <h1 className="text-4xl font-semibold text-text">Política de privacidade</h1>
    <p>
      Controlador dos dados: {site.privacy.controller}. Contato para assuntos de privacidade:{' '}
      <a className="text-primary underline" href={`mailto:${site.privacy.email}`}>
        {site.privacy.email}
      </a>
      .
    </p>
    <h2 className="pt-4 text-2xl font-semibold text-text">O que este site coleta</h2>
    <p>
      O site não tem formulários nem cadastro. Ferramentas de medição de audiência só são carregadas depois que você
      aceita os cookies, e você pode retirar o consentimento a qualquer momento.
    </p>
    <h2 className="pt-4 text-2xl font-semibold text-text">Contato pelo WhatsApp e telefone</h2>
    <p>
      Ao tocar em um botão de contato, você sai do site e fala diretamente com a equipe. As mensagens trocadas seguem a
      política do aplicativo usado e o sigilo médico.
    </p>
  </div>
)

export default PrivacyPage
