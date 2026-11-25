import { describe, expect, it } from 'vitest'
import { auditHtml, formatSeoHtmlReport, resolveSeoHtmlTargets } from '@/lib/seo-html'

const page = (body: string, extras = '') => `<!doctype html>
<html><head>
<title>Consulta | Clínica</title>
<link rel="canonical" href="https://exemplo.test/sobre">
<script type="application/ld+json">{ "@type": "WebPage" }</script>
${extras}
</head><body>
<a href="/">Home</a>
<main>
${body}
</main>
<a href="/contato">Contato no rodapé</a>
</body></html>`

describe('auditHtml', () => {
  it('reads title, headings, JSON-LD, alt and internal links from the raw HTML', () => {
    const report = auditHtml(
      page(`<h1>Sobre &amp; equipe</h1>
        <h2>Quem atende</h2>
        <h2>Como chegar</h2>
        <img src="/fachada.webp" alt="Fachada">
        <img src="/decor.svg" alt="">
        <a href="/tratamentos">Tratamentos</a>
        <a href="https://exemplo.test/blog">Blog</a>
        <a href="https://outro.test/x">Fora</a>
        <a href="mailto:a@exemplo.test">Email</a>
        <a href="tel:+5541999999999">Telefone</a>
        <a href="#equipe">Âncora</a>`),
      'https://exemplo.test/sobre',
    )
    expect(report.title).toBe('Consulta | Clínica')
    expect(report.h1).toEqual(['Sobre & equipe'])
    expect(report.h2).toEqual(['Quem atende', 'Como chegar'])
    expect(report.jsonLdCount).toBe(1)
    expect(report.canonical).toBe('https://exemplo.test/sobre')
    expect(report.imagesMissingAlt).toEqual([])
    expect(report.internalLinksInMain).toBe(2)
    expect(report.internalLinkCount).toBe(4)
    expect(report.issues).toEqual([])
    expect(formatSeoHtmlReport(report)).toContain('problemas: nenhum')
  })

  it('flags a shell that only has the signals inside comments or script', () => {
    const html = `<html><head></head><body>
      <!-- <h1>Fantasma</h1><script type="application/ld+json">{}</script> -->
      <script>document.write('<h1>Depois do JS</h1>')</script>
      <img src="/sem-alt.webp">
      <main><a href="/tratamentos">Tratamentos</a></main>
    </body></html>`
    const report = auditHtml(html, 'https://exemplo.test/')
    expect(report.h1).toEqual([])
    expect(report.jsonLdCount).toBe(0)
    expect(report.issues).toEqual([
      'title ausente',
      'h1: esperado 1, encontrado 0',
      'JSON-LD ausente',
      'img sem alt: /sem-alt.webp',
      'canonical ausente',
    ])
  })

  it('counts two h1 elements as a failure and ignores an empty JSON-LD block', () => {
    const html = `<html><head><title>Duplo</title>
      <link rel="canonical" href="https://exemplo.test/">
      <script type="application/ld+json">   </script>
    </head><body><main><h1>Um</h1><h1>Dois</h1></main></body></html>`
    const report = auditHtml(html, 'https://exemplo.test/')
    expect(report.issues).toContain('h1: esperado 1, encontrado 2')
    expect(report.issues).toContain('JSON-LD ausente')
  })
})

describe('resolveSeoHtmlTargets', () => {
  it('defaults to the origin root and joins paths without duplicating the slash', () => {
    expect(resolveSeoHtmlTargets('http://127.0.0.1:3000/', [])).toEqual(['http://127.0.0.1:3000/'])
    expect(resolveSeoHtmlTargets('http://127.0.0.1:3000', ['/', 'sobre', 'https://exemplo.test/blog'])).toEqual([
      'http://127.0.0.1:3000/',
      'http://127.0.0.1:3000/sobre',
      'https://exemplo.test/blog',
    ])
  })
})
