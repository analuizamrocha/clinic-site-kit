---
name: clinic-foundation
description: Scaffold the SEO/AEO foundation of a medical or professional practice website — constants module, sitewide schema.org entity graph, reusable metadata generators, root layout metadata, sitemap, robots.txt with AI-crawler rules, llms.txt, next.config hardening, and the guardrail tests that keep all of it in sync. Use once per project, after a landing page exists and before building service, location, or blog pages. Triggers on "set up SEO", "add structured data", "add sitemap/robots/llms.txt", "SEO foundation", "port the SEO setup from the other client".
---

# Clinic Foundation

Build the substrate every other page depends on. Run this once per project.

## Preconditions

Stop and ask if any are missing:

- A filled `docs/client-brief.md` (or equivalent facts from the user).
- A decision on **canonical host** (www vs non-www). This can't be deferred —
  it's baked into `WEBSITE_URL`, canonicals, sitemap, and every schema `@id`.
- An existing landing page whose design tokens and component conventions you can
  match.

## Steps

### 1. Read first

Read the landing page, the styling entry point, `next.config`, any existing
`layout.tsx` metadata, and `docs/client-brief.md`. Match what's there. Never
introduce a second design system or a second way of setting metadata.

### 2. `src/lib/constants.ts`

Every client fact, exactly once, grouped with banner comments:
identity → registration numbers → descriptions → institutions → URLs → socials →
contact → one `as const` object per location.

Rules:
- Contact links are **derived** by a helper (`buildWhatsAppHref(phone, msg)`),
  never duplicated as literals.
- Location objects carry `coordinates: { latitude, longitude }` and
  `openingHours` in schema.org syntax (`'Mo-Fr 08:00-19:30'`) plus a separate
  human-readable display string.
- Export reusable description strings (`ORG_DESCRIPTION`, `PHYSICIAN_DESCRIPTION`,
  `WEBSITE_DESCRIPTION`, `BUSINESS_DESCRIPTION`) consumed by *both* metadata and
  JSON-LD so they can't drift.

### 3. `src/lib/structured-data.ts`

One `@graph`, stable `@id`s: `#organization`, `#physician`, `#website`,
`#localbusiness`, `#services`. Cross-reference by `@id`; never repeat an entity.

The `Physician` node must carry `alumniOf` (each with a `description` of what was
studied), `memberOf`, `hasCredential` (registration number as `identifier`,
`recognizedBy` naming the real council + URL), `medicalSpecialty[]`,
`workLocation` with `PostalAddress` + `GeoCoordinates`, `sameAs` socials,
`paymentAccepted`, `currenciesAccepted`. This is the E-E-A-T payload — do not
abbreviate it.

Export `getStructuredData()` returning `JSON.stringify(...)`.

### 4. `src/lib/seo-schemas.ts`

Pure generators: `generateFAQSchema`, `generateBreadcrumbSchema`,
`generateLocalBusinessSchema`, `generateOpenGraphMetadata`,
`generateTwitterMetadata`. The OG generator falls back to the default social
image **with its real pixel dimensions**, and must not invent dimensions for a
custom image supplied without them.

### 5. Root layout

`metadataBase`, `title.template`, description, keywords, authors/creator/
publisher, `alternates.canonical`, full icon set, OG with real dimensions,
Twitter `summary_large_image`, `robots.googleBot` with `max-image-preview: large`
and `max-snippet: -1`, `verification.google`, and `other` geo tags read from the
location constant.

In `<head>`: `<link rel="llms" href="/llms.txt" />` and the sitewide JSON-LD.
In `<body>`: skip link → `<main id="main" tabIndex={-1}>`.
Fonts via `next/font` with `display: 'swap'`, `preload`, `fallback`,
`adjustFontFallback`.

### 6. `src/app/sitemap.ts`

Hand-maintained `STATIC_ROUTE_LAST_MODIFIED` map for static routes (honest dates
— never `new Date()`), auto-discovery for markdown content. Priority tiers:
home 1.0 · service hub 0.95 · service detail 0.90 · locations 0.90 · blog index
0.85 (lastModified = max of posts) · about + posts + location details 0.80.

### 7. `public/robots.txt`

`Allow: /` + the canonical `Sitemap:` line + explicit named blocks for
`OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `Claude-SearchBot`, `Claude-User`,
`ClaudeBot`, `PerplexityBot`, `Perplexity-User`. If the client wants answer-engine
indexing *without* training use, flag `GPTBot` and `ClaudeBot` for their decision
rather than deciding for them.

### 8. `public/llms.txt`

Hand-curated. H1 with practitioner + specialty + city + country; a one-paragraph
summary in **English**, then the same in the site language; then linked sections
for main pages, services, and blog posts grouped by topic cluster. See
`reference/SEO-AEO-PLAYBOOK.md` §Part 2.1 for the exact shape.

### 9. `next.config.ts`

`compress`, `poweredByHeader: false`, `reactStrictMode`, `removeConsole` in prod
(excluding error/warn), security headers on `/(.*)` (X-Frame-Options,
X-Content-Type-Options, Referrer-Policy, HSTS), `images.formats:
['image/webp','image/avif']` with tuned `deviceSizes`, an empty `redirects()` to
grow, and bundle-analyzer wiring.

### 10. Guardrail tests

- `tests/seo-metadata.test.ts` — OG/Twitter helper invariants (real default
  dimensions; no invented dimensions for custom images).
- `tests/content-discovery.test.ts` — once blog content exists: on-disk post set
  **equals** the llms.txt post set (set equality, so stale entries fail too), and
  every post is in the sitemap.
- `tests/mdx-image-dimensions.test.ts` — once the image registry exists: every
  referenced image's registry dimensions match what `sharp` reads off disk.

## Verify

```bash
<pm> run lint && <pm> run test:run && <pm> run build
```

Then confirm by inspection:
- `curl -s localhost:3000 | grep -c 'application/ld+json'` → the graph is in the
  initial HTML, not injected client-side.
- The rendered JSON-LD validates at validator.schema.org.
- `/sitemap.xml`, `/robots.txt`, `/llms.txt` all resolve.
- Every URL in the sitemap uses the canonical host.

## Report

State which client facts were missing and stubbed, and hand over the launch
checklist: platform-level canonical-host 301 (**not** 302), GSC verification,
sitemap submission.
