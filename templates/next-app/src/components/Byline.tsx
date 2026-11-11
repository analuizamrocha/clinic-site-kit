import Link from 'next/link'
import { formatDate } from '@/lib/format'
import { councilLabel, site } from '@/lib/site'

interface BylineProps {
  lastModified?: string
  lastReviewed?: string
}

/** Who stands behind the page, visible where the reader decides — not only on /sobre. */
export const Byline = ({ lastModified, lastReviewed }: BylineProps) => (
  <div className="mt-4 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
    <span>
      Por{' '}
      <Link href="/sobre" className="font-semibold text-primary underline-offset-4 hover:underline">
        {site.practitioner.displayName}
      </Link>{' '}
      · {councilLabel()}
    </span>
    {lastModified ? <time dateTime={lastModified}>Atualizado em {formatDate(lastModified)}</time> : null}
    {lastReviewed ? (
      <time dateTime={lastReviewed}>
        Revisado por {site.practitioner.displayName} em {formatDate(lastReviewed)}
      </time>
    ) : null}
  </div>
)
