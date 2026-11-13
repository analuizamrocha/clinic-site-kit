import { describe, expect, it } from 'vitest'
import { getAllPosts } from '@/lib/blog'
import { site } from '@/lib/site'
import { findBannedAdvertisingPhrase, identificationProblems } from '@/lib/advertising'

const helena = {
  displayName: 'Dra. Helena Exemplo',
  specialty: 'Dermatologista',
  council: { body: 'CRM', region: 'SC', number: '00000' },
  rqe: ['00000'],
}

const footer = `**Dra. Helena Exemplo**
Dermatologista
CRM-SC 00000 | RQE 00000`

describe('advertising phrases', () => {
  it('flags a guarantee, a ranking and an exclusive method', () => {
    expect(findBannedAdvertisingPhrase('O procedimento tem resultado garantido.')).toBe('resultado garantido')
    expect(findBannedAdvertisingPhrase('Ela é a melhor dermatologista da cidade.')).toBe('a melhor')
    expect(findBannedAdvertisingPhrase('Trata-se de técnica exclusiva.')).toBe('técnica exclusiva')
  })

  it('lets a negation and an ordinary sentence through', () => {
    expect(findBannedAdvertisingPhrase('O resultado não é garantido.')).toBeUndefined()
    expect(findBannedAdvertisingPhrase('A cirurgia não é o único caminho.')).toBeUndefined()
    expect(findBannedAdvertisingPhrase('Não é o melhor momento para decidir.')).toBeUndefined()
    expect(findBannedAdvertisingPhrase('A consulta explica o que a avaliação individual pode mudar.')).toBeUndefined()
  })
})

describe('identification footer', () => {
  it('requires the brief on the ending, and skips a specialist number the brief does not have', () => {
    expect(identificationProblems(`Texto.\n\n${footer}`, helena)).toEqual([])
    expect(identificationProblems('Texto sem rodapé.', helena).join()).toMatch(/practitioner name/)
    expect(identificationProblems(`Texto.\n\n${footer}`, { ...helena, rqe: [] })).toEqual([])
  })

  it('holds the posts in this repo to the same floor', () => {
    for (const post of getAllPosts()) {
      expect(findBannedAdvertisingPhrase(post.body), post.slug).toBeUndefined()
      expect(identificationProblems(post.body, site.practitioner), post.slug).toEqual([])
    }
  })
})
