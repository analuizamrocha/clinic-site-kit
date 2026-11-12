import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import HomePage from '@/app/page'
import { contactHref } from '@/lib/contact-links'
import { positioningLine, primaryContact, site } from '@/lib/site'

afterEach(cleanup)

describe('home page', () => {
  it('states name, specialty and city in a single H1', () => {
    render(<HomePage />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0].textContent).toBe(`${site.practitioner.displayName} ${positioningLine()}`)
  })

  it('points every contact button at a configured destination', () => {
    const { container } = render(<HomePage />)
    const allowed = new Set(site.contacts.map(contactHref))
    const links = [...container.querySelectorAll<HTMLAnchorElement>('a[data-conversion]')]
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) expect(allowed.has(link.getAttribute('href') ?? '')).toBe(true)
    expect(screen.getAllByRole('link', { name: primaryContact().ctaLabel })[0].getAttribute('href')).toBe(
      contactHref(primaryContact()),
    )
  })

  it('opens WhatsApp in a new tab without leaking the opener', () => {
    const { container } = render(<HomePage />)
    for (const link of container.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]')) {
      expect(link.target).toBe('_blank')
      expect(link.rel).toContain('noopener')
    }
  })
})
