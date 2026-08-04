---
name: clinic-seo-audit
description: Audit a practice website's SEO and AEO health against the kit's standards — canonicals, structured-data entity graph, sitemap/robots/llms.txt consistency, page-ownership and cannibalization, internal linking, indexing-error triage, image/CLS issues, and answer-engine readiness. Produces a prioritized findings report and, only on request, the fixes. Use monthly, before a launch, after a redesign, or when Google Search Console reports indexing problems. Triggers on "SEO audit", "why isn't this indexed", "GSC errors", "check our SEO", "are we AEO-ready", "cannibalization".
---

# Clinic SEO Audit

Read-only by default. Produce findings first; apply fixes only when asked.

## Inputs to gather

Project root, public URL, and whichever of these exist: Search Console export,
ranking report, analytics, `docs/seo-strategy.md`. Missing data is a stated
limitation, not something to fill in with assumptions. **Never invent a ranking
position, search volume, or traffic number.**

## 1. Technical foundation

| Check | Pass condition |
|---|---|
| Canonical host | One host everywhere; the other 301s (not 302) at platform level |
| `metadataBase` | Set to the canonical host |
| Self-referencing canonical | On **every** route, pointing at its own URL |
| Title template | Set once in the layout; no page double-appends the brand |
| `robots` meta | `index/follow` + `max-image-preview: large`, `max-snippet: -1` |
| Sitemap | All routes present, canonical host, honest `lastModified`, no orphans |
| `robots.txt` | Correct `Sitemap:` line, AI-crawler blocks present |
| Redirects | Every historical URL has a permanent 301 |
| Security headers | X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS |
| Static rendering | Content present in `view-source`, not JS-injected |

```bash
curl -sI <url>                          # status, redirect chain
curl -s <url> | grep -i 'rel="canonical"'
curl -s <url>/sitemap.xml | grep -c '<loc>'
```

## 2. Structured data

- Is there **one** sitewide `@graph` with stable `@id`s, or scattered blobs?
- Do page schemas cross-reference by `@id` or duplicate entities?
- Does the `Physician` node carry `hasCredential` with the registration number
  and a real `recognizedBy`? (Highest-leverage YMYL gap.)
- Does every service page have `MedicalProcedure` + `FAQPage` + `BreadcrumbList`?
- Do blog posts have `MedicalWebPage` + `Article` + `BreadcrumbList`?
- **Does every FAQ schema match the visible text exactly?** Mismatches are a
  penalty, not a bonus. Check character-for-character.
- Does schema reference facts not present on the page?

Validate the rendered output at validator.schema.org — not the source, the
rendered HTML.

## 3. Page ownership & cannibalization

Rebuild the ownership table from what's actually deployed and compare with
`docs/seo-strategy.md`:

- Two or more URLs targeting the same intent → name them and recommend
  update / differentiate / consolidate, with the winner named.
- A blog post ranking for commercial/local intent → the service page is too thin
  or under-linked.
- A service page with no supporting article, or an article linking to no service
  page → orphaned.
- Index pages competing with their own children.

Compare `primaryKeyword` across all posts (`rg "primaryKeyword" content/posts`)
and look for near-duplicates.

## 4. Internal linking

- Every blog post links up to its owner service page.
- Every service page links to a supporting article.
- Locations ↔ services ↔ about are cross-linked.
- Footer and nav reach every top-level cluster.
- No broken internal links, no links to superseded slugs.

## 5. AEO readiness

- `llms.txt` exists, is linked from `<head>`, and its post set **exactly** equals
  the on-disk post set (a stale entry is worse than a missing one — it hands a
  model a dead URL).
- AI crawlers explicitly allowed in `robots.txt`.
- Headings are question-shaped; answers lead their sections.
- FAQ blocks present on service pages and major articles.
- Author credential + publish/modified dates visible *and* in schema.
- Content readable with JS disabled.

## 6. Performance & CLS

- Every markdown image has correct registered intrinsic dimensions.
- `priority` on the LCP image only.
- AVIF/WebP configured; no oversized originals.
- Third-party scripts consent-gated and deferred.

## 7. Indexing-error triage

Map each GSC bucket to a cause before proposing a fix — most are not code bugs:

| GSC bucket | Usual cause | Action |
|---|---|---|
| Discovered – not indexed | Recently submitted, crawl queued | Wait; request indexing on priority URLs |
| Crawled – not indexed (non-canonical host) | Redirect source, working as intended | None |
| Alternate page with proper canonical | Stale data *if* canonicals are self-referencing in code | Verify in code, then wait |
| 404 | Real broken slug | Add a permanent 301 |
| Soft 404 | Thin page, or crawled before content landed | Verify depth; add substance if thin |
| Page with redirect | Host-level redirect, expected | None |

Read the code before believing GSC. On the source site, six reported categories
contained exactly two real bugs — both superseded slugs with no redirect.

## Output

A prioritized report:

1. **Broken** — actively costing traffic (404s, wrong canonicals, missing
   redirects, schema/visible mismatches). Fix now.
2. **Weak** — present but underpowered (thin service pages, missing credentials
   in schema, orphaned content, cannibalization). Fix next.
3. **Opportunity** — position 4–10 queries, uncovered intents, AEO gaps.
   Highest ROI is almost always improving a 4–10 page, not publishing a new one.
4. **Fine** — explicitly list what's working, so it doesn't get "fixed".

Each finding: what, where (`file:line` or URL), why it matters, the fix, the
effort. Separate verified findings from hypotheses. Then ask before applying
anything.
