import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { DemoBanner } from '@/components/DemoBanner'
import { FloatingContact } from '@/components/FloatingContact'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { site } from '@/lib/site'
import { bodyFont, headingFont } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.brand.url),
  title: { default: site.brand.siteName, template: `%s | ${site.brand.siteName}` },
  description: site.brand.description,
}

export const viewport: Viewport = {
  themeColor: site.brand.palette.primary,
  width: 'device-width',
  initialScale: 1,
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang={site.brand.locale} className={`${bodyFont.variable} ${headingFont.variable}`}>
    <body className="font-sans antialiased">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-background focus:p-3">
        Pular para o conteúdo
      </a>
      <DemoBanner />
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <FloatingContact />
    </body>
  </html>
)

export default RootLayout
