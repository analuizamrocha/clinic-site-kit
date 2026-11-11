import { site } from '@/lib/site'

/** Visible on fictional configs, so demo data is never mistaken for a real practice. */
export const DemoBanner = () => {
  if (!site.fictional) return null
  return (
    <p role="note" className="bg-text px-4 py-2 text-center text-sm text-background">
      Site de demonstração: nomes, números e endereços são fictícios.
    </p>
  )
}
