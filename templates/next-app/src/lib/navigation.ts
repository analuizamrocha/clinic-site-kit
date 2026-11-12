export interface NavItem {
  href: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/tratamentos', label: 'Tratamentos' },
  { href: '/locais-de-atendimento', label: 'Onde atende' },
  { href: '/blog', label: 'Blog' },
  { href: '/perguntas-frequentes', label: 'Dúvidas' },
  { href: '/sobre', label: 'Sobre' },
]

export const FOOTER_ITEMS: NavItem[] = [
  ...NAV_ITEMS,
  { href: '/contato', label: 'Contato' },
  { href: '/politica-privacidade', label: 'Privacidade' },
]
