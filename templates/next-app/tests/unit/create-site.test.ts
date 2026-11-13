import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import config from '../fixtures/demo-site.config'
import { complianceResearchPending, parseBrief, renderClaudeMd, renderComplianceGuidelines } from '../../scripts/create-site'

const exampleBrief = path.resolve(process.cwd(), '../../examples/demo-pediatria/client.json')

describe('create-site brief', () => {
  it('refuses invalid JSON and a brief without a portrait before anything is written', () => {
    expect(() => parseBrief('{')).toThrow(/not valid JSON/)
    expect(() => parseBrief('{"practitioner":{}}')).toThrow(/practitioner\.photo\.file or practitioner\.photo\.alt/)
    expect(() => parseBrief('null')).toThrow(/JSON object/)
  })

  it('reads the example brief', () => {
    const raw = readFileSync(exampleBrief, 'utf8')
    expect(parseBrief(raw).practitioner.photo.file).toBe('portrait.jpg')
  })
})

describe('generated compliance skeleton', () => {
  it('stays pending and names the council from the brief', () => {
    const doc = renderComplianceGuidelines(config)
    expect(doc).toContain('**Last verified:** PENDENTE')
    expect(doc).toContain('Última verificação: PENDENTE')
    expect(doc).toContain('CRM-SC')
    expect(doc).toContain('Dermatologista')
    expect(doc).toContain('## 8. Pre-publish checklist')
    expect(complianceResearchPending(doc)).toBe(true)
  })

  it('accepts a verification date and sets the next review six months later', () => {
    const doc = renderComplianceGuidelines(config, '2026-11-12')
    expect(doc).toContain('**Last verified:** 2026-11-12')
    expect(doc).toContain('**Next review due:** 2027-05-12')
    expect(complianceResearchPending(doc)).toBe(false)
  })

  it('points CLAUDE.md at the two sources and does not grow its own post steps', () => {
    const claude = renderClaudeMd()
    expect(claude).toContain('AGENTS.md')
    expect(claude).toContain('docs/compliance-guidelines.md')
    expect(claude).not.toMatch(/adding posts/i)
    expect(claude).not.toContain('content/posts')
  })
})
