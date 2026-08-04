# Implementation Patterns — file-by-file map

Extracted from a production Next.js 16 App Router medical site (~50 indexed
pages, 46 markdown posts, 9 treatment pages, 2 location pages). Copy the
*shapes*, not the content.

## Target file layout

```
content/posts/<slug>.md              # one file per article, filename === slug
public/
  llms.txt                           # curated AEO inventory
  robots.txt                         # incl. explicit AI-crawler allows
  images/posts/<slug>/*.webp         # post assets namespaced by slug
src/
  app/
    layout.tsx                       # metadata + sitewide JSON-LD + a11y shell
    page.tsx                         # landing: composes sections, emits FAQ schema
    sitemap.ts                       # static registry + auto-discovered posts
    not-found.tsx  error.tsx
    sobre/page.tsx
    tratamentos/page.tsx             # hub
    tratamentos/<slug>/page.tsx      # one static dir per service
    locais-de-atendimento/page.tsx
    locais-de-atendimento/[slug]/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    politica-privacidade/page.tsx
  components/
    ui/          # primitives: Button, LinkButton, Card, Badge, Breadcrumb,
                 # CallToActionCard, FAQAccordion, MdxImage, TreatmentCard, …
    sections/    # landing-page compositions, barrel-exported via index.ts
    layout/      # CookieConsent, ClientProviders
    analytics/   # consent-gated GA/GTM
    icons/
  lib/
    constants.ts                     # ⭐ every client fact, once
    structured-data.ts               # ⭐ sitewide @graph
    seo-schemas.ts                   # reusable schema + OG/Twitter generators
    faq-schema.ts                    # homepage FAQPage
    blog.ts                          # parsing + post schema graph
    locations.ts                     # data-driven location pages
    navigation.ts                    # nav model + active-state logic
    treatment-images.ts              # slug → image + stable procedure id
    treatment-related-blog.ts        # slug → the blog post that supports it
    mdx-image-dimensions.ts          # path → intrinsic w/h registry
    utils.ts                         # cn()
  hooks/
tests/
  content-discovery.test.ts          # posts ⊂ sitemap ∩ llms.txt
  mdx-image-dimensions.test.ts       # registry vs. real files (sharp)
  seo-metadata.test.ts               # OG/Twitter helper invariants
  e2e/*.spec.ts                      # Playwright smoke + mobile nav
docs/
  seo-strategy.md                    # page-ownership table + measurement loop
  blog-content-playbook.md           # authoring contract
  cfm-compliance-guidelines.md       # regulator rules
  components.md                      # component inventory w/ usage counts
```

---

## 1. `lib/constants.ts` — the portability lever

Everything downstream imports from here. No client fact appears as a literal
anywhere else, *including inside JSON-LD*. This is what makes the whole codebase
re-skinnable for the next client.

Grouped with banner comments: identity → descriptions → institutions → URLs →
contact → one `as const` object per location.

Two patterns worth copying verbatim:

```ts
// Derive links, never duplicate them.
export const buildWhatsAppHref = (phone: string, encodedMessage: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodedMessage}`

export const WHATSAPP_HREF_SECRETARY = buildWhatsAppHref(
  WPP_NUMBER_SECRETARY,
  encodeURIComponent(WHATSAPP_MSG_TEXT_SECRETARY)
)

// Reusable description strings consumed by BOTH metadata and JSON-LD,
// so the two can never drift apart.
export const ORG_DESCRIPTION = '…'
export const PHYSICIAN_DESCRIPTION = '…'
export const WEBSITE_DESCRIPTION = '…'
export const BUSINESS_DESCRIPTION = '…'
```

Location objects carry `coordinates: { latitude, longitude }` and
`openingHours: 'Mo-Fr 08:00-19:30'` (schema.org syntax) alongside a separate
human display string. The geo meta tags in the root layout read straight off
this object.

## 2. `lib/structured-data.ts` — the sitewide entity graph

One `@graph`, five nodes, stable `@id`s. Rendered once in `layout.tsx`.

```ts
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'MedicalOrganization', '@id': `${WEBSITE_URL}/#organization`, … },
    { '@type': 'Physician',           '@id': `${WEBSITE_URL}/#physician`,    … },
    { '@type': 'MedicalProcedure',    '@id': `${WEBSITE_URL}/#services`,     … },
    { '@type': 'WebSite',             '@id': `${WEBSITE_URL}/#website`,      … },
    { '@type': 'LocalBusiness',       '@id': `${WEBSITE_URL}/#localbusiness`,… },
  ],
}
export function getStructuredData() { return JSON.stringify(structuredData) }
```

Cross-reference by id instead of repeating: `worksFor: { '@id': '…/#organization' }`,
`performer: { '@id': '…/#physician' }`, `publisher: { '@id': '…/#organization' }`.
Blog post schemas on other pages point at `…/#physician` too — one entity, many
pages, which is exactly what an entity graph is for.

The `Physician` node is the E-E-A-T payload. Include:
- `alumniOf: EducationalOrganization[]` — each with a `description` naming what
  was studied there
- `memberOf: Organization[]` — professional societies
- `hasCredential: EducationalOccupationalCredential[]` — the registration number
  as `identifier`, with `recognizedBy` pointing at the medical council's real
  name and URL
- `medicalSpecialty[]`, `workLocation` with full `PostalAddress` + `GeoCoordinates`
- `paymentAccepted`, `currenciesAccepted` — local-commerce signals

## 3. `lib/seo-schemas.ts` — the anti-drift generators

Pure functions, unit-tested, used by every page so no page hand-rolls metadata:

```ts
generateFAQSchema(faqs: FAQItem[])                // → FAQPage
generateBreadcrumbSchema(items: BreadcrumbItem[]) // → BreadcrumbList
generateLocalBusinessSchema(data)                 // → LocalBusiness
generateOpenGraphMetadata(data)                   // → Metadata['openGraph']
generateTwitterMetadata(data)                     // → Metadata['twitter']
```

The OG generator falls back to the default social image **with its real
dimensions**, and — critically — does *not* invent dimensions when a custom
image arrives without them. There's a test for exactly that.

## 4. `app/layout.tsx`

- `metadataBase: new URL(WEBSITE_URL)` — makes every relative OG/canonical resolve
- `title: { default, template: '%s | ${BRAND}' }`
- `alternates.canonical`, icons (ico + 48/192/512 png + apple), OG with **real
  pixel dimensions**, Twitter summary_large_image
- `robots.googleBot`: `'max-image-preview': 'large'`, `'max-snippet': -1`,
  `'max-video-preview': -1`
- `other: { 'geo.region', 'geo.placename', 'geo.position', ICBM }` from the
  location constants
- `<link rel="llms" href="/llms.txt" />` in `<head>`
- sitewide JSON-LD via `dangerouslySetInnerHTML={{ __html: getStructuredData() }}`
- a11y shell: skip link → `<main id="main" tabIndex={-1}>`
- fonts via `next/font/google` with `display: 'swap'`, `preload`, `fallback`,
  `adjustFontFallback` (kills font-swap CLS)

## 5. `app/sitemap.ts`

Hybrid: a hand-maintained `STATIC_ROUTE_LAST_MODIFIED` map (honest `lastModified`
dates you control) + auto-discovery for posts, so a new markdown file is in the
sitemap the moment it lands.

Priority tiers that encode the ownership model:

```
1.00  /                    weekly
0.95  /tratamentos         monthly   ← hub
0.90  /tratamentos/<slug>  monthly   ← commercial intent lives here
0.90  /locais-de-atendimento
0.85  /blog                weekly    ← lastModified = max(post.lastModified)
0.80  /sobre, /blog/<slug>, /locais-de-atendimento/<slug>
```

## 6. `app/tratamentos/<slug>/page.tsx` — the service-page template

Module-scope constants (`pageTitle`, `pageDescription`, `pageUrl`), then
`export const metadata` built from them + the shared generators, then three
JSON-LD script tags (`MedicalProcedure`, `FAQPage`, `BreadcrumbList`), then the
page. Self-referencing canonical is `alternates: { canonical: pageUrl }` where
`pageUrl` is literally this page's own URL — that single line is what keeps
these pages out of GSC's "alternate page with proper canonical tag" bucket.

Body order: visible breadcrumbs → badges → h1 → definition paragraph → hero
image → prose sections with question-shaped `##` → related blog card → visible
FAQ (text identical to the schema) → CTA card → prev/next sibling links.

## 7. `lib/blog.ts` — the markdown engine

```ts
getAllPosts(): BlogPost[]        // sorted by `order` asc, then publishDate desc
getPostBySlug(slug): BlogPost|null
getAllPostSlugs(): string[]      // → generateStaticParams
generateBlogPostSchema(post)     // → @graph
```

Three derived fields that are computed, never authored:
- `readingTime` — `ceil(words / 200)`
- `excerpt` — the **first fully-italic paragraph** of the body becomes the
  listing-card subtitle. Authors control the card by writing one `_hook line_`
  right after the frontmatter. Falls back to the first non-heading paragraph
  with emphasis stripped.
- `cardImage` — the first markdown image in the body, reused as the card image,
  so no separate `coverImage` field can go stale.

The post schema graph: `MedicalWebPage` (with `about: MedicalCondition` seeded
from `primaryKeyword`/`secondaryKeywords`, and `mainEntity: Article` carrying
`wordCount`, `timeRequired: PT{n}M`, `keywords`, `articleSection`, an `author`
with `knowsAbout` + `hasCredential`, `publisher` by `@id`, and `medicalAudience`)
+ `BreadcrumbList` + `FAQPage` when `faqs` exists. Typed against `schema-dts`.

## 8. `MdxImage` + `mdx-image-dimensions.ts` — zero CLS

Markdown `![]()` renders through `next/image`, and the width/height come from a
registry keyed by the exact markdown path:

```ts
const DEFAULT = { width: 1200, height: 800 }
const MDX_IMAGE_DIMENSIONS: Record<string, MdxImageDimensions> = { … }
export const getMdxImageDimensions = (src: string) =>
  MDX_IMAGE_DIMENSIONS[src] ?? DEFAULT
```

A test opens every referenced file with `sharp` and asserts the resolved
dimensions match reality — so a wrong entry (or a forgotten one on a
non-1200×800 asset) fails CI instead of shipping layout shift.

## 9. `lib/locations.ts` — data-driven location pages

A single fat typed interface (`LocationPageData`) holding facts, page copy,
CTAs, hero photo, hours, narrative, FAQ, related treatments/articles, and schema
inputs; an array of those; and `getLocationBySlug` / `getLocationPath` /
`getLocationPageStructuredData` helpers. The `[slug]` route is thin — all the
per-location variation is data. Adding location #3 is a data edit.

## 10. `next.config.ts`

`redirects()` holds one permanent 301 per historical URL. Two real bugs this
caught on the source site: a service page linked externally under an old slug,
and a blog post whose slug had been lengthened. Both were 404s draining link
equity; both are one-line fixes here. Cross-*domain* redirects (non-www → www)
can't live here — they belong at the hosting platform.

Also: `compress`, `poweredByHeader: false`, `reactStrictMode`,
`removeConsole` in prod (excluding error/warn), security headers on `/(.*)`,
`images.formats: ['image/webp','image/avif']` with tuned device sizes,
`optimizePackageImports` + `modularizeImports` for `lucide-react`.

## 11. Guardrail tests

`tests/content-discovery.test.ts` — the highest-value test in the repo:

```ts
const postSlugs = getAllPosts().map(p => p.slug).sort()
const sitemapUrls = new Set(sitemap().map(e => e.url))
const llmsPostSlugs = [...new Set(
  Array.from(llms.matchAll(/\/blog\/([a-z0-9-]+)/g), ([, s]) => s)
)].sort()

expect(llmsPostSlugs).toEqual(postSlugs)                       // exact set equality
for (const slug of postSlugs)
  expect(sitemapUrls.has(`${WEBSITE_URL}/blog/${slug}`)).toBe(true)
```

Set *equality* on llms.txt matters: it catches both the forgotten new post and
the stale entry for a deleted one.

## 12. Consent-gated analytics

`CookieConsent` writes `localStorage['lgpd-cookie-consent']`; `AnalyticsProvider`
renders `@next/third-parties/google` GA/GTM **only** after `=== 'accepted'`. No
third-party cookie is set before consent — which is also how the site holds a
100 Best Practices score. Progressive disclosure UX: reject is behind "manage
preferences", the X dismisses without persisting (banner returns next visit).

## Stack notes

Next.js 16 · React 19 · TypeScript · Tailwind v4 (`@theme` CSS variables, no
`tailwind.config` colors) · Bun · Vitest + Testing Library · Playwright +
axe-core · `gray-matter` + `next-mdx-remote/rsc` + `remark-gfm` · `schema-dts`
for typed JSON-LD · `sharp` (dev, for the dimension test) ·
`class-variance-authority` + `tailwind-merge` for variants.
