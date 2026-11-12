import { describe, expect, it } from 'vitest'
import { cityLabel, locationPageTitle, servicePlaceLabel, singlePlaceTitle } from '@/lib/site'
import type { Location } from '@/lib/site/types'

const address = (city: string): Location['address'] => ({
  street: 'Rua Exemplo',
  number: '1',
  district: 'Centro',
  city,
  region: 'SC',
  postalCode: '88000-000',
})

const location = (id: string, city: string, name: string): Location => ({
  id,
  slug: id,
  name,
  address: address(city),
  contactIds: [],
})

describe('which page owns a city query', () => {
  const home = location('home', 'Florianópolis', 'Consultório Centro')
  const other = location('other', 'São José', 'Consultório São José')
  const context = { specialty: 'Dermatologista', address: home.address }

  it('keeps the home city on an address title and gives another city the specialty query', () => {
    expect(locationPageTitle(home, context)).toBe('Endereço e agendamento: Consultório Centro')
    expect(locationPageTitle(other, context)).toBe('Dermatologista em São José - SC: Consultório São José')
  })

  it('names the cities a service is offered in, and does not collapse several into one title', () => {
    const fallback = cityLabel(home.address)
    expect(servicePlaceLabel({ locationIds: ['other'] }, [home, other], fallback)).toBe('São José - SC')
    expect(servicePlaceLabel({ locationIds: ['home', 'other'] }, [home, other], fallback)).toBe(
      'Florianópolis - SC, São José - SC',
    )
    expect(servicePlaceLabel({ locationIds: [] }, [home, other], fallback)).toBe(fallback)
    expect(singlePlaceTitle('Tratamentos', ['Florianópolis - SC'])).toBe('Tratamentos em Florianópolis - SC')
    expect(singlePlaceTitle('Tratamentos', ['Florianópolis - SC', 'São José - SC'])).toBe('Tratamentos')
  })
})
