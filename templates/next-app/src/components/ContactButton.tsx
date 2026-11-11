import type { ReactNode } from 'react'
import { contactHref, isExternalContact } from '@/lib/contact-links'
import type { Contact } from '@/lib/site/types'

interface ContactButtonProps {
  contact: Contact
  /** Where on the page the button sits; reported as the conversion placement. */
  placement: string
  variant?: 'primary' | 'secondary'
  className?: string
  children?: ReactNode
}

/**
 * Every contact CTA goes through here, so the destination always comes from
 * the config and every click carries a placement for analytics.
 */
export const ContactButton = ({
  contact,
  placement,
  variant = 'primary',
  className = '',
  children,
}: ContactButtonProps) => {
  const external = isExternalContact(contact)
  return (
    <a
      href={contactHref(contact)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      data-conversion={`${contact.channel}-${placement}`}
      data-contact-purpose={contact.purpose}
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
    >
      {children ?? contact.ctaLabel}
    </a>
  )
}
