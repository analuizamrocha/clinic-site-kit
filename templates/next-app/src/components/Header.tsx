import Link from 'next/link'
import { ContactButton } from '@/components/ContactButton'
import { NAV_ITEMS } from '@/lib/navigation'
import { primaryContact, site } from '@/lib/site'

export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-text/10 bg-background/95 backdrop-blur">
    <div className="container-page flex items-center justify-between gap-4 py-2">
      <Link href="/" className="inline-flex min-h-11 items-center font-serif text-lg font-semibold text-text">
        {site.brand.siteName}
      </Link>
      <nav aria-label="Navegação principal" className="hidden lg:block">
        <ul className="flex gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-primary">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <ContactButton contact={primaryContact()} placement="header" className="hidden sm:inline-flex" />
        {/* No-JS disclosure: works before hydration and with scripts blocked. */}
        <details className="group relative lg:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-text/15 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Abrir menu</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </summary>
          <nav
            aria-label="Menu"
            className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-text/10 bg-background p-2 shadow-lg"
          >
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center rounded-lg px-3 hover:bg-surface">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </div>
  </header>
)
