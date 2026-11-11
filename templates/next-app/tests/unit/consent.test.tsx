import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ConsentAnalytics } from '@/components/analytics/ConsentAnalytics'
import { CONSENT_KEY } from '@/lib/consent'
import { describeConversion } from '@/lib/conversion'

type DataLayerWindow = Window & { dataLayer?: Array<Record<string, unknown>> }
// TODO: replace this cast with a typed global declaration for dataLayer.
const dataLayer = (): Array<Record<string, unknown>> => (window as DataLayerWindow).dataLayer ?? []

const addCta = () => {
  const anchor = document.createElement('a')
  anchor.href = 'https://wa.me/5548900000000?text=Ol%C3%A1%20vim%20pelo%20site'
  anchor.dataset.conversion = 'whatsapp-hero'
  anchor.dataset.contactPurpose = 'consulta'
  anchor.addEventListener('click', (event) => event.preventDefault())
  document.body.append(anchor)
  return anchor
}

beforeEach(() => {
  window.localStorage.clear()
  // TODO: replace this cast with a typed global declaration for dataLayer.
  delete (window as DataLayerWindow).dataLayer
})
afterEach(() => {
  cleanup()
  document.body.innerHTML = ''
})

describe('consent-gated analytics', () => {
  it('shows nothing and records nothing when no GTM id is configured', () => {
    const { container } = render(<ConsentAnalytics />)
    expect(container.innerHTML).toBe('')
    fireEvent.click(addCta())
    expect(dataLayer()).toEqual([])
  })

  it('records nothing before a choice and after a refusal', () => {
    render(<ConsentAnalytics gtmId="GTM-TEST" />)
    const cta = addCta()
    fireEvent.click(cta)
    expect(dataLayer()).toEqual([])

    fireEvent.click(screen.getByRole('button', { name: 'Recusar' }))
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe('rejected')
    expect(screen.queryByRole('region', { name: 'Consentimento de cookies' })).toBeNull()
    fireEvent.click(cta)
    expect(dataLayer().filter((entry) => entry.event === 'whatsapp_click')).toEqual([])
  })

  it('after acceptance, records a minimized conversion event', () => {
    render(<ConsentAnalytics gtmId="GTM-TEST" />)
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Aceitar' }))
    })
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe('accepted')
    fireEvent.click(addCta())
    const events = dataLayer().filter((entry) => entry.event === 'whatsapp_click')
    expect(events).toEqual([
      { event: 'whatsapp_click', placement: 'whatsapp-hero', contact_purpose: 'consulta', destination: 'https://wa.me/5548900000000' },
    ])
    expect(JSON.stringify(dataLayer())).not.toMatch(/text=|Ol%C3%A1|page_path|page_title/)
  })

  it('offers refusal with the same weight as acceptance', () => {
    render(<ConsentAnalytics gtmId="GTM-TEST" />)
    const reject = screen.getByRole('button', { name: 'Recusar' })
    const accept = screen.getByRole('button', { name: 'Aceitar' })
    expect(reject.className.includes('btn')).toBe(true)
    expect(accept.className.includes('btn')).toBe(true)
  })
})

describe('describeConversion', () => {
  it('ignores links that are not conversions', () => {
    const anchor = document.createElement('a')
    anchor.href = '/tratamentos'
    expect(describeConversion(anchor)).toBeNull()
  })

  it('classifies phone clicks and keeps the public number', () => {
    const anchor = document.createElement('a')
    anchor.href = 'tel:+554830000000'
    anchor.dataset.conversion = 'phone-contact-page'
    expect(describeConversion(anchor)).toEqual({ event: 'phone_click', placement: 'phone-contact-page', destination: 'tel:+554830000000' })
  })
})
