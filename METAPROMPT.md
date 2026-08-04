# METAPROMPT — Clinic / Practice Website: Content & SEO Architecture Build-Out

> **How to use:** open a fresh Claude Code (Opus) session in the *new client's*
> repo. Paste everything below the line. Attach or copy `reference/PATTERNS.md`,
> `reference/SEO-AEO-PLAYBOOK.md`, and your filled-in `client-brief.md` into that
> repo first — the prompt references them.

---

You are building out the content and SEO architecture of a medical practice
website. A landing page already exists. Your job is to add everything that turns
a single-page site into an organic-acquisition asset: service/treatment pages,
location pages, a markdown blog, and the SEO + AEO layer that makes all of it
discoverable by search engines *and* by LLM answer engines.

This is a **YMYL (Your Money or Your Life) medical site**. Accuracy and
regulatory compliance outrank cleverness at every decision point.

## Ground rules

1. **Never invent a client fact.** Names, credentials, registration numbers,
   addresses, coordinates, phone numbers, hours, prices, credentials, hospital
   affiliations, and the list of procedures actually performed all come from
   `docs/client-brief.md`. If a fact you need is missing, list it as a blocker
   and keep building everything that doesn't depend on it.
2. **Never invent a medical claim, and never assume which rules apply.** No
   efficacy guarantees, no superiority claims, no
   "revolutionary/miraculous/definitive". Educational, sober register only.
   Which *specific* rules govern this practice is a research task, not an
   assumption — see Phase -1. Professions differ sharply: Brazilian dentistry
   (CFO) permits patient before/after imagery under a signed TCLE, Brazilian
   medicine (CFM) heavily restricts it. Getting this wrong changes page
   architecture, not just wording.
3. **Read before you write.** The landing page already encodes brand voice,
   color tokens, spacing scale, component conventions. Match them. Do not
   introduce a second design system or a second way of doing metadata.
4. **One source of truth per fact.** Every client fact lives in exactly one
   constants module and is imported everywhere else — including into JSON-LD.
   If a phone number appears as a literal in two files, that is a bug.
5. **Ship in reviewable slices.** Phase boundaries below are commit boundaries.
6. Report honestly. If a phase is blocked, finish the other phases and say
   plainly what you left out and why.

## Phase -1 — Compliance research (before anything else)

Establish which professional-advertising regulator governs this practice, in
this jurisdiction, for this profession — then research its current rules from
primary sources and write `docs/compliance-guidelines.md`.

Run the `clinic-compliance-research` skill if available; otherwise follow its
method: scope the profession and jurisdiction, identify the council plus the
consumer-protection, data-protection, self-regulation and competition-authority
layers on top of it, research from primary sources with dated citations, and
record contradictions and rules under active revision rather than resolving them
silently.

This comes first because it can change the *architecture*, not just the copy —
whether a consent-tracked case gallery is a page type at all, whether prices can
appear, whether testimonials are a component you need to build.

Output the doc, then flag every open question that blocks a specific page.

## Phase 0 — Audit (read-only, no edits)

Produce a written audit before touching anything:

- **Stack & conventions**: framework version, router, styling system, package
  manager, test runner, lint config, path aliases, deployment target.
- **Existing landing page**: what sections exist, what components are reusable,
  where the design tokens live, how metadata is currently set, what CTAs exist
  and where they point.
- **SEO baseline**: does the site have `metadataBase`, a title template,
  canonicals, OG/Twitter tags, JSON-LD, `sitemap.ts`, `robots.txt`,
  `not-found.tsx`, redirects, security headers, image optimization? Mark each
  present / partial / missing.
- **AEO baseline**: `llms.txt`? AI-crawler rules in robots? Is the content
  server-rendered in the initial HTML (LLM crawlers do not execute JS)?
- **Gaps vs. the target architecture** in `reference/PATTERNS.md`.
- **Blockers**: every client fact you need and don't have.

Then propose a phased plan and **stop for approval**. Do not start Phase 1 until
the plan is approved.

## Phase 1 — Foundation

The non-negotiable substrate everything else hangs off.

- `src/lib/constants.ts` — every client fact, typed, grouped, commented.
  Practitioner identity, registration/licence numbers, specialty, site URL,
  socials, contact channels (with a `buildWhatsAppHref`-style helper so links
  are derived, not duplicated), one object per physical location including
  `coordinates`, `openingHours` in schema.org syntax, and reusable description
  strings used by both metadata and JSON-LD.
- `src/lib/structured-data.ts` — the **sitewide entity graph**: a single
  `@graph` containing `MedicalOrganization`, `Physician`, `WebSite`,
  `LocalBusiness`, and the procedure list, each with a stable `@id` of the form
  `${SITE_URL}/#organization`, `#physician`, `#website`, `#localbusiness`.
  Cross-reference by `@id` rather than repeating entities. Put the practitioner's
  `alumniOf`, `memberOf`, and `hasCredential` (registration number +
  `recognizedBy` the medical council) in the `Physician` node — this is the
  E-E-A-T payload for a YMYL site and it is the single highest-leverage schema
  you will write. Render it once, in the root layout.
- `src/lib/seo-schemas.ts` — small pure generators reused by every page:
  `generateFAQSchema`, `generateBreadcrumbSchema`, `generateLocalBusinessSchema`,
  `generateOpenGraphMetadata`, `generateTwitterMetadata`. These exist so no page
  ever hand-rolls an OG block and drifts.
- Root layout metadata: `metadataBase`, `title.template`, description, keywords,
  authors/creator/publisher, `alternates.canonical`, icons, OG (with real image
  dimensions), Twitter, `robots` incl. `max-image-preview: large` and
  `max-snippet: -1`, `verification.google`, and geo `other` tags
  (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
- `next.config.ts`: `compress`, `poweredByHeader: false`, security headers
  (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS), image
  `formats: ['image/webp','image/avif']` with tuned `deviceSizes`, an empty
  `redirects()` you will grow, and bundle-analyzer wiring.
- `src/app/sitemap.ts`, `public/robots.txt`, `public/llms.txt`,
  `src/app/not-found.tsx`, `src/app/error.tsx`.
- Accessibility floor: skip-to-content link, `<main id="main" tabIndex={-1}>`,
  `lang` set correctly, focus-visible rings on every interactive element.

## Phase 2 — Page-ownership model

Before writing page copy, write `docs/seo-strategy.md` containing a table that
assigns **exactly one owner URL to each commercial-intent cluster**:

| Cluster | Owner URL | Role of supporting content |
|---|---|---|

Rules that this table enforces for the life of the site:

- A commercial/local intent ("treatment X in <city>") is owned by a service page,
  never by a blog post.
- An informational intent ("does X always need surgery?") is owned by a blog
  post, which links *up* to the owner service page.
- Two URLs must never target the same intent. When they would, you update,
  differentiate, or consolidate — you do not create the second URL.
- The index page (`/tratamentos`) organizes; it never competes with its children.

Derive the cluster list from what the practitioner actually does, per the brief.

## Phase 3 — Service / treatment pages

Build `/<services-segment>` as a hub plus one static child route per service.

Hub page: metadata + canonical + `MedicalOrganization.availableService` schema
listing every child as a `MedicalProcedure` with `url` and `image`; a card grid;
a CTA block; links out to locations and blog.

Each detail page carries, in this order:
1. Page-scoped `metadata`: title, description, keywords, **self-referencing
   canonical**, OG and Twitter via the shared generators.
2. Three JSON-LD blocks: `MedicalProcedure` (with `bodyLocation`, `performer`
   referencing the physician's credential, `preparation`, `followup`),
   `FAQPage`, `BreadcrumbList`.
3. Visible breadcrumbs matching the schema.
4. `h1`, a plain-language definition paragraph, a hero image with intrinsic
   dimensions.
5. Body in answer-first shape: `##` headings phrased as the question a patient
   would type, each answered in its first one or two sentences, then detail.
   Sentence case, never Title Case.
6. A related-article card linking to the blog post that supports this cluster.
7. A visible FAQ section whose Q&A text **matches the FAQ schema exactly**
   (mismatched schema is a rich-results penalty, not a bonus).
8. CTA card, then prev/next links between sibling service pages.

Drive the per-page content model from a typed data module rather than hardcoding
strings in JSX where more than three pages share a shape.

## Phase 4 — Location pages (only if there is more than one location, or one location with real local-search value)

Data-driven: one `src/lib/locations.ts` exporting a typed `LocationPageData[]`
that holds facts, copy, CTAs, related links, FAQs, and a schema generator.
`/<locations-segment>` index + `[slug]` detail via `generateStaticParams`.
Detail schema: `WebPage` + `MedicalClinic` + `PostalAddress` + `GeoCoordinates` +
`Service` + `BreadcrumbList`. Cross-link locations ↔ services ↔ about ↔ footer.

Do not create near-duplicate pages per neighbourhood — that is a doorway pattern
and it gets penalized. One page per real, staffed address.

## Phase 5 — Markdown blog

- Content in `content/posts/<slug>.md`. **Filename must equal the `slug`
  frontmatter field** — enforce it with a test.
- `src/lib/blog.ts`: `gray-matter` parsing, reading-time calc, excerpt
  extraction, first-body-image extraction for the listing card, ordering
  (explicit `order` field first, then `publishDate` desc), and a
  `generateBlogPostSchema` returning a `@graph` of `MedicalWebPage` (with
  `about: MedicalCondition`, `mainEntity: Article` carrying `wordCount`,
  `timeRequired`, `keywords`, author with credentials, `medicalAudience`) +
  `BreadcrumbList` + conditional `FAQPage`.
- Frontmatter contract (all required unless noted): `title`, `metaDescription`,
  `slug`, `publishDate`, `lastModified`, `primaryKeyword`, `secondaryKeywords[]`,
  `targetAudience`, `intent` (awareness | consideration | decision), `featured`,
  `order`, `faqs[]`, `relatedPosts[]` (optional).
- `/blog` listing + `/blog/[slug]` with `generateStaticParams`, per-post
  metadata, self-referencing canonical, `article:*` meta, and visible
  published/updated dates.
- Markdown images render through `next/image` via a custom `img` component that
  reads intrinsic dimensions from a registry module — this is what keeps CLS at
  zero. Default to one size and register every asset that differs.
- Author signature + educational disclaimer block at the end of every post,
  using the exact identification wording from `docs/compliance-guidelines.md`.

Once the infrastructure renders, **do not start writing articles unprompted.**
Produce a content plan from the landing page's own copy and the brief, then ask
the user how each post gets written — they supply the substance, you draft for
their review, or skip. Then seed a launch batch of 5–8 finished posts, one at a
time. The `clinic-content-plan` skill covers this; the checkpoint is not
optional, because the posts that carry the practitioner's clinical judgment
usually need to be in their own voice.

## Phase 6 — AEO (answer-engine optimization)

Treat LLM answer engines as a first-class traffic source with different needs
than Google:

- `public/llms.txt` — a curated, hand-grouped inventory of the site: an H1 with
  practitioner + specialty + city + country, a one-paragraph summary **in
  English** (LLM crawlers reason better over English context) followed by the
  same summary in the site language, then linked sections: main pages, services,
  and blog posts grouped by topic cluster with descriptive labels.
- `<link rel="llms" href="/llms.txt" />` in `<head>`.
- `robots.txt` — explicitly `Allow: /` for `GPTBot`, `OAI-SearchBot`,
  `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`,
  `PerplexityBot`, `Perplexity-User`, plus the canonical `Sitemap:` line.
  Explicit allows beat relying on the wildcard.
- **Content shape for extraction**: question-shaped headings; the answer in the
  first sentence under each heading; each `##` section self-contained enough to
  be quoted without its neighbours (answer engines retrieve chunks, not pages);
  definition sentences of the form "X é ..." near the top; FAQ blocks; explicit
  visible dates and author credentials.
- **Everything statically rendered.** Content that needs JS to appear does not
  exist to an LLM crawler. Keep interactive components leaf-level and
  client-only.
- Consider (optional, propose before building): `/llms-full.txt` with full post
  text concatenated, and `speakable` schema on FAQ answers.

## Phase 7 — Guardrail tests

These are cheap and they are the reason the SEO layer does not rot:

- **Content-discovery test** — every post slug on disk appears in *both* the
  sitemap and `llms.txt`, and nothing extra appears in either.
- **Image-dimension test** — read every image referenced by every post, inspect
  the real file with `sharp`, assert the registry's dimensions match.
- **Social-metadata test** — the OG helper emits the default image's real
  dimensions and does not invent dimensions for custom images.
- **Slug-integrity test** — filename equals frontmatter slug; every
  `relatedPosts` entry resolves to a real post.
- **Canonical test** — every static route exports a self-referencing canonical.
- Plus a Playwright smoke test on the critical routes and an axe accessibility
  pass.

## Phase 8 — Compliance & handoff

- Run the professional-advertising compliance pass over all new copy, against
  `docs/compliance-guidelines.md` — the project-specific doc produced in
  Phase -1. Required identification block, no guarantees, no superiority, no
  fear-based hooks, no patient data beyond what that doc permits.
- Write `docs/seo-strategy.md`, `docs/blog-content-playbook.md`, and update
  `AGENTS.md` / `CLAUDE.md` so the next agent inherits the contract.
- Verify: lint, typecheck, unit tests, build, then Lighthouse (targets:
  Performance 90+, Accessibility 100, Best Practices 100, SEO 100).
- Give me a launch checklist: canonical host redirect (non-www → www or the
  reverse, **301 not 302**, at the platform level), sitemap submission, GSC
  property verification, and which URLs to request indexing for first.

## Deliverables

1. The Phase 0 audit + phased plan (before any edits).
2. The code, committed in phase-sized commits.
3. `docs/seo-strategy.md` with the page-ownership table.
4. `docs/blog-content-playbook.md` with the frontmatter contract, image
   workflow, and validation commands.
5. A blocker list of every client fact still missing.
6. The launch checklist.

Start with Phase 0.
