import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumb } from '@/lib/schema'

export interface Crumb {
  name: string
  path?: string
}

export const Breadcrumb = ({ items }: { items: Crumb[] }) => (
  <>
    <JsonLd data={breadcrumb(items)} />
    <nav aria-label="Navegação estrutural" className="text-sm text-muted">
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.path ? (
              <Link href={item.path} className="inline-flex min-h-11 items-center hover:text-primary">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="inline-flex min-h-11 items-center">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  </>
)
