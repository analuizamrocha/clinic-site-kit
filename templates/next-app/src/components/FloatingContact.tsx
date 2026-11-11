import { contactHref, isExternalContact } from '@/lib/contact-links'
import { primaryContact } from '@/lib/site'

/** The one icon-only action; it carries an accessible name. */
export const FloatingContact = () => {
  const contact = primaryContact()
  const external = isExternalContact(contact)
  return (
    <a
      href={contactHref(contact)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={`${contact.ctaLabel} pelo ${contact.channel === 'whatsapp' ? 'WhatsApp' : 'telefone'}`}
      data-conversion={`${contact.channel}-floating`}
      data-contact-purpose={contact.purpose}
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="currentColor">
        <path d={contact.channel === 'whatsapp' ? WHATSAPP_GLYPH : PHONE_GLYPH} />
      </svg>
    </a>
  )
}

const PHONE_GLYPH =
  'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1Z'
const WHATSAPP_GLYPH =
  'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z'
