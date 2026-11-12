import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseBrief } from '../../scripts/create-site'

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
