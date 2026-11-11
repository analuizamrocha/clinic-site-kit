import { councilLabel, site } from '@/lib/site'

export const Footer = () => {
  const { practitioner } = site
  return (
    <footer className="mt-24 border-t border-text/10 bg-surface">
      <div className="container-page grid gap-2 py-10 text-sm text-muted">
        <p className="font-semibold text-text">{practitioner.displayName}</p>
        <p>
          {practitioner.specialty} · {councilLabel()}
          {practitioner.rqe.length ? ` · RQE ${practitioner.rqe.join(', ')}` : null}
        </p>
        <p>Conteúdo informativo. Não substitui a consulta médica.</p>
      </div>
    </footer>
  )
}
