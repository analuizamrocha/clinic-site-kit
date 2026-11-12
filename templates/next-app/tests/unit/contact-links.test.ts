import { describe, expect, it } from 'vitest'
import { contactHref, sanitizeDestination } from '@/lib/contact-links'
import type { Contact } from '@/lib/site/types'

const whatsapp: Contact = {
  id: 'a',
  purpose: 'consulta',
  channel: 'whatsapp',
  e164: '+5548900000000',
  display: '(48) 90000-0000',
  ctaLabel: 'Agendar',
  message: 'Olá! Vim pelo site & quero agendar?',
}

describe('contact links', () => {
  it('encodes the WhatsApp message and strips punctuation from the number', () => {
    expect(contactHref(whatsapp)).toBe(
      'https://wa.me/5548900000000?text=Ol%C3%A1!%20Vim%20pelo%20site%20%26%20quero%20agendar%3F',
    )
  })

  it('builds tel: links in E.164', () => {
    expect(contactHref({ ...whatsapp, channel: 'phone', e164: '+554830000000' })).toBe('tel:+554830000000')
  })

  it('drops the query before a destination reaches analytics', () => {
    expect(sanitizeDestination(contactHref(whatsapp))).toBe('https://wa.me/5548900000000')
    expect(sanitizeDestination('tel:+554830000000')).toBe('tel:+554830000000')
    expect(sanitizeDestination('/contato?nome=x')).toBe('/contato')
  })
})
