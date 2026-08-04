---
name: clinic-treatment-page
description: Create or update a single service/treatment/procedure page on a medical practice site, with page-scoped metadata, self-referencing canonical, MedicalProcedure + FAQPage + BreadcrumbList schema, answer-first body structure, matching visible FAQ, related-article link, CTA, and sitemap/llms.txt registration. Use whenever adding a "tratamentos/serviços/procedimentos" page or reworking an existing one. Triggers on "add a treatment page", "new service page", "create /tratamentos/<slug>", "page for <procedure>".
---

# Clinic Treatment Page

One service page, built to own its commercial intent cluster. Every page must
clear all 12 checkpoints — the checklist is the point of this skill.

## Before writing

1. **Check the ownership table** in `docs/seo-strategy.md`. Does this cluster
   already have an owner URL? If yes, update that page instead of creating a
   competitor. Add the new row if it's genuinely new.
2. **Search existing content** for the same intent (`rg -i "<condition>" src/app content/posts`).
   Overlapping treatment pages cannibalize each other far more damagingly than
   overlapping blog posts.
3. **Confirm the practitioner actually performs this.** From the brief, not from
   inference. A service page for a procedure they don't do is a liability.
4. **Collect the facts**: patient-facing name, slug, category, 3–6 real FAQs with
   sober answers, 3–5 target keywords (with city where local intent applies),
   image asset + exact dimensions, contraindications.

## Page structure

Copy the shape from an existing sibling page. Module-scope constants first:

```ts
const pageTitle = '<Condition> — <the question the page answers>'
const pageDescription = '<≤160 chars, names the concrete options, no promises>'
const pageUrl = `${WEBSITE_URL}/tratamentos/<slug>`
```

Then `export const metadata` using those plus the shared generators, then three
JSON-LD blocks, then the page body.

### Checklist — all 12 required

1. **Self-referencing canonical**: `alternates: { canonical: pageUrl }` where
   `pageUrl` is this page's own URL.
2. **Metadata**: title (no brand suffix — the layout template adds it),
   description, keywords, `openGraph: generateOpenGraphMetadata(...)`,
   `twitter: generateTwitterMetadata(...)`.
3. **`MedicalProcedure` JSON-LD**: `@id` = pageUrl, `name`, `description`,
   `procedureType`, `bodyLocation` (`AnatomicalStructure`), `performer`
   (Physician with `hasCredential` carrying the registration number),
   `preparation`, `followup`.
4. **`FAQPage` JSON-LD** via `generateFAQSchema(faqItems)`.
5. **`BreadcrumbList` JSON-LD** via `generateBreadcrumbSchema(breadcrumbItems)`.
6. **Visible breadcrumbs** matching the schema exactly.
7. **Header**: category badges → `h1` (the patient-facing service name) → a
   plain-language definition paragraph → hero image with intrinsic dimensions
   (`priority` only if it's the LCP element).
8. **Body, answer-first**: `##` headings phrased as the question a patient types;
   the answer in the first one or two sentences; then detail. Sentence case
   throughout. Bullet lists for indications, symptoms, and criteria. Include a
   **"when this is not indicated"** angle — contraindications, recurrence risk,
   realistic recovery. Each `##` section must stand alone if quoted in isolation.
9. **Related article card** linking to the blog post that supports this cluster
   (register the mapping in `src/lib/treatment-related-blog.ts`).
10. **Visible FAQ section** whose question and answer text is **character-identical**
    to the FAQ schema. Mismatch is a rich-results penalty.
11. **CTA card** with the primary conversion action and a descriptive
    `aria-label`.
12. **Prev/next links** to sibling service pages, plus a link back to the hub.

## Register the page

- `src/app/sitemap.ts` — add to the treatment slug list and to
  `STATIC_ROUTE_LAST_MODIFIED` with today's date.
- `public/llms.txt` — add under `## Tratamentos` with a descriptive one-liner.
- `src/lib/treatment-images.ts` — add the slug → image mapping with a stable
  procedure id.
- The hub page's `treatments` array (drives both the card grid and the
  `availableService` schema).
- `docs/seo-strategy.md` — add the ownership row.
- Site navigation, if the service is top-level.

## Compliance pass (mandatory before done)

Against **`docs/compliance-guidelines.md` §8** — the project-specific doc from
`clinic-compliance-research`. Run that skill first if the file is absent.

Service pages are where regulators look hardest, because this is the page that
sells. Pay particular attention to §4 (conditionally allowed): whether this
profession and jurisdiction permit before/after imagery, price disclosure, or
testimonials determines whether whole sections of this page may exist at all.

Floor that holds regardless:
- Educational, sober register. No guaranteed outcomes.
- No superiority claims — not over other techniques, not over other
  practitioners. Comparisons must be factual and two-sided.
- No fear-based framing.
- No identifiable patient data or imagery without documented consent.
- Practitioner identification present where required.

Write "may", "can", "in selected cases", "depends on assessment" — not "resolves",
"eliminates", "guarantees", "definitive".

## Verify

```bash
<pm> run test:run -- tests/content-discovery.test.ts tests/seo-metadata.test.ts
<pm> run lint && <pm> run build
```

Then eyeball: the rendered page at mobile and desktop widths; `view-source` to
confirm all three JSON-LD blocks are in the initial HTML; the FAQ text matches
the schema; every internal link resolves.
