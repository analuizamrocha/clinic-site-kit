import { ContactButton } from '@/components/ContactButton'
import type { Contact } from '@/lib/site/types'

interface CtaCardProps {
  contact: Contact
  placement: string
  /** Short visible context, e.g. the service being read. Never goes into the message. */
  eyebrow?: string
  title: string
  body: string
}

export const CtaCard = ({ contact, placement, eyebrow, title, body }: CtaCardProps) => (
  <section className="rounded-2xl bg-primary p-6 text-on-primary">
    {eyebrow ? <p className="text-xs font-semibold tracking-[0.14em] uppercase opacity-85">{eyebrow}</p> : null}
    <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
    <p className="mt-2 opacity-90">{body}</p>
    <ContactButton
      contact={contact}
      placement={placement}
      className="mt-5 w-full bg-background text-primary sm:w-auto"
    />
  </section>
)
