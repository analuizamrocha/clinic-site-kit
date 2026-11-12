import { describe, expect, it } from 'vitest'
// The validator is exercised against the fictional fixture, whatever the site's own config is.
import config from '../fixtures/demo-site.config'
import { findClinicalTerm, findRedirectTargetProblems, findSiteConfigProblems, validateSiteConfig } from '@/lib/site/validate'
import type { SiteConfig } from '@/lib/site/types'

const clone = (): SiteConfig => structuredClone(config)
const problemsOf = (mutate: (draft: SiteConfig) => void, env = {}) => {
  const draft = clone()
  mutate(draft)
  return findSiteConfigProblems(draft, env).join('\n')
}

describe('site config validation', () => {
  it('accepts the fictional demo config', () => {
    expect(findSiteConfigProblems(config)).toEqual([])
  })

  it('refuses to deploy demo data to production', () => {
    expect(() => validateSiteConfig(config, { vercelEnv: 'production' })).toThrow(/demo data/)
    expect(() => validateSiteConfig(config, { vercelEnv: 'preview' })).not.toThrow()
  })

  it('rejects redirects that are not plain paths, loop, repeat or chain', () => {
    const redirect = { from: '/antigo', to: '/novo', reason: 'teste' }
    expect(problemsOf((d) => (d.redirects = [{ ...redirect, to: 'https://outro.site/x' }]))).toMatch(/redirects\[0\]\.to: must be a path/)
    expect(problemsOf((d) => (d.redirects = [{ ...redirect, to: '/novo?utm=1' }]))).toMatch(/query or hash/)
    expect(problemsOf((d) => (d.redirects = [{ ...redirect, from: '/antigo#topo' }]))).toMatch(/query or hash/)
    expect(problemsOf((d) => (d.redirects = [{ ...redirect, from: '/' }]))).toMatch(/cannot redirect the home page/)
    expect(problemsOf((d) => (d.redirects = [{ ...redirect, to: '/antigo' }]))).toMatch(/points at itself/)
    expect(problemsOf((d) => (d.redirects = [redirect, { ...redirect, to: '/outro' }]))).toMatch(/duplicate redirect/)
    expect(problemsOf((d) => (d.redirects = [redirect, { from: '/novo', to: '/fim', reason: 'teste' }]))).toMatch(/chain/)
  })

  it('rejects a redirect that leaves the site or overwrites a page that exists', () => {
    const indexable = new Set(['/tratamentos/consulta'])
    const served = new Set(['/', '/contato', '/tratamentos/consulta', '/politica-privacidade'])
    const problems = findRedirectTargetProblems(
      [
        { from: '/contato', to: '/sumiu' },
        { from: '/atalho', to: '/politica-privacidade' },
      ],
      { indexable, served },
    ).join('\n')
    expect(problems).toMatch(/redirects\[0\]\.from: \/contato is already a page/)
    expect(problems).toMatch(/redirects\[0\]\.to: \/sumiu is not an indexable page/)
    expect(problems).toMatch(/redirects\[1\]\.to: \/politica-privacidade is not an indexable page/)
    expect(
      findRedirectTargetProblems([{ from: '/atalho', to: '/tratamentos/consulta' }], { indexable, served }),
    ).toEqual([])
  })

  it('rejects placeholders anywhere', () => {
    expect(problemsOf((d) => (d.brand.tagline = 'TODO: tagline'))).toMatch(/brand\.tagline: looks like a placeholder/)
    expect(problemsOf((d) => (d.practitioner.bio = 'PREENCHER'))).toMatch(/practitioner\.bio/)
    expect(problemsOf((d) => (d.services[0].summary = '<resumo>'))).toMatch(/services\[0\]\.summary/)
  })

  it('rejects numbers outside E.164 and dummy numbers on real configs', () => {
    expect(problemsOf((d) => (d.contacts[0].e164 = '(48) 99999-0000'))).toMatch(/E\.164/)
    expect(problemsOf((d) => (d.fictional = false))).toMatch(/dummy number/)
  })

  it('rejects clinical terms in prefilled WhatsApp messages', () => {
    expect(problemsOf((d) => (d.contacts[0].message = 'Olá, quero tratar minha acne.'))).toMatch(/clinical term .*acne/)
    expect(findClinicalTerm('Olá! Estou com dor ao evacuar')).toBe('dor')
    // Matched at the start of words only: "Doutora" and "agendador" are fine.
    expect(findClinicalTerm('Olá, Doutora! Falo com o agendador?')).toBeUndefined()
  })

  it('rejects broken references between services, contacts and locations', () => {
    expect(problemsOf((d) => (d.services[0].contactId = 'nao-existe'))).toMatch(/unknown contact nao-existe/)
    expect(problemsOf((d) => (d.services[0].locationIds = ['nao-existe']))).toMatch(/unknown location/)
    expect(problemsOf((d) => (d.brand.primaryContactId = 'x'))).toMatch(/primaryContactId/)
  })

  it('rejects palettes below WCAG AA', () => {
    expect(problemsOf((d) => (d.brand.palette.muted = '#b0b0b0'))).toMatch(/muted on background is .* below 4\.5/)
  })

  it('rejects drafts marked indexable and impossible review dates', () => {
    expect(problemsOf((d) => Object.assign(d.services[0], { state: 'draft', indexable: true }))).toMatch(/draft cannot be indexable/)
    expect(problemsOf((d) => (d.services[0].lastReviewed = '2026-02-31'))).toMatch(/real ISO date/)
  })
})
