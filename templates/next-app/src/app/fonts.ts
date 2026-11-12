import { Inter, Source_Serif_4 } from 'next/font/google'

/**
 * Brand typography. Swap these two imports per client; keep the CSS variable
 * names, which the theme and components rely on.
 */
export const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
export const headingFont = Source_Serif_4({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })
