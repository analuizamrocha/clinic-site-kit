/**
 * Fetch built pages without running JavaScript and report title, H1, H2,
 * JSON-LD, missing image alt, canonical, and internal link counts.
 *
 *   bun run seo:html -- http://127.0.0.1:3000 / /sobre
 *
 * Not part of `bun run check`. Playwright already owns rendered H1, unique
 * titles, and the city line. This looks at the bytes a crawler downloads.
 */
import { auditHtml, formatSeoHtmlReport, resolveSeoHtmlTargets, type SeoHtmlReport } from '../src/lib/seo-html'

const usage = () => {
  console.error('uso: bun scripts/check-seo-html.ts <origem> [caminho...]')
  console.error('ex.: bun scripts/check-seo-html.ts http://127.0.0.1:3000 / /sobre')
}

const fetchReport = async (url: string): Promise<SeoHtmlReport> => {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { accept: 'text/html' },
    signal: AbortSignal.timeout(15_000),
  })
  const report = auditHtml(await response.text(), response.url || url)
  if (response.ok) return report
  return { ...report, issues: [`HTTP ${response.status}`, ...report.issues] }
}

const main = async () => {
  const args = process.argv.slice(2)
  if (args.length === 0 || args[0] === '--help') {
    usage()
    process.exit(args[0] === '--help' ? 0 : 1)
  }
  const origin = args[0]
  if (!/^https?:\/\//i.test(origin)) {
    usage()
    process.exit(1)
  }
  let failed = false
  for (const url of resolveSeoHtmlTargets(origin, args.slice(1))) {
    try {
      const report = await fetchReport(url)
      console.log(formatSeoHtmlReport(report))
      console.log('')
      if (report.issues.length > 0) failed = true
    } catch (error) {
      const message = error instanceof Error ? error.message : 'falha de rede'
      console.log(`${url}\n  problemas:\n    - ${message}\n`)
      failed = true
    }
  }
  if (failed) process.exit(1)
}

if ((import.meta as ImportMeta & { main?: boolean }).main) await main()
