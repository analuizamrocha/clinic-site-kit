import type { Palette } from '@/lib/site/types'

const channel = (value: number) => {
  const srgb = value / 255
  return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
}

const luminance = (hex: string) => {
  const value = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((start) => parseInt(value.slice(start, start + 2), 16))
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/** WCAG 2.x contrast ratio between two `#rrggbb` colours. */
export const contrastRatio = (foreground: string, background: string) => {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

const TOKEN_NAMES: Record<keyof Palette, string> = {
  primary: 'primary',
  onPrimary: 'on-primary',
  accent: 'accent',
  background: 'background',
  surface: 'surface',
  text: 'text',
  muted: 'muted',
}

/**
 * Tailwind v4 `@theme` block for the palette. Written to `src/app/theme.css`
 * by `bun run theme`; a unit test fails if the file drifts from the config.
 */
export const renderThemeCss = (palette: Palette) => {
  const lines = (Object.keys(TOKEN_NAMES) as Array<keyof Palette>).map(
    (key) => `  --color-${TOKEN_NAMES[key]}: ${palette[key].toLowerCase()};`,
  )
  return [
    '/* Generated from site/site.config.ts by `bun run theme`. Do not edit by hand. */',
    '@theme {',
    ...lines,
    '}',
    '',
  ].join('\n')
}
