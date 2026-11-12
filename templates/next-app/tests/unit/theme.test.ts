import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import config from '@site/site.config'
import { contrastRatio, renderThemeCss } from '@/lib/theme'

describe('theme', () => {
  it('computes WCAG contrast ratios', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0)
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5)
  })

  it('keeps src/app/theme.css in sync with the config palette (run `bun run theme`)', () => {
    const onDisk = readFileSync(join(process.cwd(), 'src', 'app', 'theme.css'), 'utf8')
    expect(onDisk).toBe(renderThemeCss(config.brand.palette))
  })
})
