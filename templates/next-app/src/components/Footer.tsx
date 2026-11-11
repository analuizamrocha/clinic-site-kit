import Link from 'next/link'
import { ConsentSettingsButton } from '@/components/analytics/ConsentSettingsButton'
import { FOOTER_ITEMS } from '@/lib/navigation'
import { councilLabel, site } from '@/lib/site'

export const Footer = () => {
  const { practitioner } = site
  return (
    <footer className="mt-24 border-t border-text/10 bg-surface">
      <div className="container-page grid gap-6 py-10 text-sm text-muted md:grid-cols-2">
        <div className="grid gap-2">
          <p className="font-semibold text-text">{practitioner.displayName}</p>
          <p>
            {practitioner.specialty} · {councilLabel()}
            {practitioner.rqe.length ? ` · RQE ${practitioner.rqe.join(', ')}` : null}
          </p>
          <p>Conteúdo informativo. Não substitui a consulta médica.</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-x-4">
            {FOOTER_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
            {site.analytics.gtmId ? (
              <li>
                <ConsentSettingsButton />
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
