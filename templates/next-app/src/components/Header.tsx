import Link from 'next/link'
import { ContactButton } from '@/components/ContactButton'
import { NAV_ITEMS } from '@/lib/navigation'
import { primaryContact, site } from '@/lib/site'

export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-text/10 bg-background/95 backdrop-blur">
    <div className="container-page flex items-center justify-between gap-4 py-3">
      <Link href="/" className="min-h-11 content-center font-serif text-lg font-semibold text-text">
        {site.brand.siteName}
      </Link>
      <nav aria-label="Navegação principal" className="hidden md:block">
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
      <ContactButton contact={primaryContact()} placement="header" className="hidden sm:inline-flex" />
    </div>
  </header>
)
