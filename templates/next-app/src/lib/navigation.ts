export interface NavItem {
  href: string
  label: string
}

/** Header and footer navigation. Routes are added here as the site grows. */
export const NAV_ITEMS: NavItem[] = [
  { href: '/#servicos', label: 'Atendimentos' },
  { href: '/#atendimento', label: 'Onde atende' },
  { href: '/#duvidas', label: 'Dúvidas' },
]
