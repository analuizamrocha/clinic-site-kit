import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import ArticlePage from '@/app/blog/[slug]/page'
import TreatmentPage from '@/app/tratamentos/[slug]/page'
import { getAllPosts } from '@/lib/blog'
import { contactHref } from '@/lib/contact-links'
import { getContact, getPublishedServices, primaryContact } from '@/lib/site'

afterEach(cleanup)

const jsonLd = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].map((node) => JSON.parse(node.textContent ?? '{}'))

const renderService = async (slug: string) => render(await TreatmentPage({ params: Promise.resolve({ slug }) }))

const services = getPublishedServices()
const indexable = services.find((service) => service.indexable) ?? services[0]
const awaitingSignOff = services.find((service) => !service.indexable)

describe.runIf(services.length > 0)('service page', () => {
  it('books through the contact configured for the service', async () => {
    const { container } = await renderService(indexable.slug)
    const expected = contactHref(getContact(indexable.contactId))
    const ctas = [...container.querySelectorAll<HTMLAnchorElement>('a[data-conversion]')]
    const channel = getContact(indexable.contactId).channel
    expect(ctas.map((a) => a.dataset.conversion)).toEqual([`${channel}-service-intro`, `${channel}-service-sidebar`])
    for (const cta of ctas) expect(cta.getAttribute('href')).toBe(expected)
  })

  it('has one H1 and emits FAQPage only for questions shown on the page', async () => {
    const { container } = await renderService(indexable.slug)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const faq = jsonLd(container).find((node) => node['@type'] === 'FAQPage')
    const visible = indexable.faqs.map((item) => item.question)
    expect(faq?.mainEntity.map((q: { name: string }) => q.name) ?? []).toEqual(visible)
    for (const question of visible) expect(screen.getByText(question)).toBeTruthy()
  })

  it.runIf(Boolean(awaitingSignOff))('does not present a page awaiting clinical sign-off as medical content', async () => {
    // TODO: drop the non-null assertion once vitest's runIf narrows the type.
    const { container } = await renderService(awaitingSignOff!.slug)
    expect(jsonLd(container).some((node) => node['@type'] === 'MedicalWebPage')).toBe(false)
  })
})

const postWithService = getAllPosts().find((post) => post.relatedServiceSlugs.length > 0)

describe.runIf(Boolean(postWithService))('article page', () => {
  it('links the reader to the related treatment and keeps the CTA destination', async () => {
    // TODO: drop the non-null assertion once vitest's runIf narrows the type.
    const post = postWithService!
    const { container } = render(await ArticlePage({ params: Promise.resolve({ slug: post.slug }) }))
    const related = screen.getByRole('link', { name: 'Conhecer o tratamento' })
    expect(related.getAttribute('href')).toBe(`/tratamentos/${post.relatedServiceSlugs[0]}`)
    const cta = container.querySelector<HTMLAnchorElement>('a[data-conversion$="-article-end"]')
    expect(cta?.getAttribute('href')).toBe(contactHref(primaryContact()))
  })
})
