import { sanitizeDestination } from '@/lib/contact-links'

export interface ConversionEvent {
  event: 'whatsapp_click' | 'phone_click' | 'maps_click'
  placement: string
  contact_purpose?: string
  destination: string
}

/**
 * What a click on a conversion link reports. Deliberately minimal: no page
 * path or title (they can reveal a health interest), no query string (it
 * carries the prefilled message), nothing typed by the visitor.
 */
export const describeConversion = (anchor: HTMLAnchorElement): ConversionEvent | null => {
  const marker = anchor.dataset.conversion
  if (!marker) return null
  const href = anchor.getAttribute('href') ?? ''
  const event = href.startsWith('tel:')
    ? 'phone_click'
    : /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)
      ? 'whatsapp_click'
      : marker.startsWith('maps')
        ? 'maps_click'
        : null
  if (!event) return null
  return {
    event,
    placement: marker,
    ...(anchor.dataset.contactPurpose ? { contact_purpose: anchor.dataset.contactPurpose } : {}),
    destination: sanitizeDestination(href),
  }
}
