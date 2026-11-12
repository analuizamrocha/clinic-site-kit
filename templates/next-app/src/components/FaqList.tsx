import { JsonLd } from '@/components/JsonLd'
import { faqPage } from '@/lib/schema'
import type { Faq } from '@/lib/site/types'

/** Renders the questions and their FAQPage schema together, so one never exists without the other. */
export const FaqList = ({ faqs, headingId, title }: { faqs: Faq[]; headingId: string; title: string }) => {
  if (!faqs.length) return null
  return (
    <section aria-labelledby={headingId} className="mt-10">
      <JsonLd data={faqPage(faqs)} />
      <h2 id={headingId} className="text-2xl font-semibold">
        {title}
      </h2>
      <div className="mt-4 divide-y divide-text/10 border-y border-text/10">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-2">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-semibold">
              {faq.question}
              <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-4 text-text/85">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
