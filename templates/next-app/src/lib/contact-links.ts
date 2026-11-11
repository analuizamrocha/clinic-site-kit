import type { Contact } from '@/lib/site/types'

const digits = (e164: string) => e164.replace(/\D/g, '')

/** The href a contact button points at: wa.me with the generic message, or tel:. */
export const contactHref = (contact: Contact) =>
  contact.channel === 'whatsapp'
    ? `https://wa.me/${digits(contact.e164)}?text=${encodeURIComponent(contact.message ?? '')}`
    : `tel:+${digits(contact.e164)}`

/** Whether the link opens outside the site (new tab + noopener). */
export const isExternalContact = (contact: Contact) => contact.channel === 'whatsapp'

/**
 * The destination as analytics may see it: scheme, host and path only. The
 * query carries the prefilled message; it never leaves the browser in an event.
 */
export const sanitizeDestination = (href: string) => {
  try {
    const url = new URL(href)
    return url.protocol.startsWith('http') ? `${url.origin}${url.pathname}` : `${url.protocol}${url.pathname}`
  } catch {
    return href.split(/[?#]/)[0]
  }
}
