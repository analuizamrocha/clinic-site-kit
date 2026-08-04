# SEO + AEO Playbook

The durable rules, separated from the code. Baseline they produced on the source
site: 328 tracked queries, 66 in the Top 3, 96 in the Top 10, across ~50 pages.
That's a point-in-time measurement, not a promise — but the rules below are what
generated it and they transfer.

---

# Part 1 — SEO

## 1. Page ownership beats page volume

Assign **exactly one owner URL per intent cluster**, write it down in
`docs/seo-strategy.md`, and treat it as architecture:

| Cluster | Owner URL | Supporting content role |
|---|---|---|
| Broad local specialty | `/` | Explain the practice, route to the right service |
| Service discovery | `/tratamentos` | Organize the portfolio, never compete with children |
| One condition/procedure | `/tratamentos/<slug>` | Own consultation + treatment intent |
| One physical address | `/locais-de-atendimento/<slug>` | Own "specialty near me / in <area>" |
| A patient question | `/blog/<slug>` | Answer it, link *up* to the owner service page |

Consequences you have to actually enforce:
- Commercial/local intent never lives on a blog post.
- Before creating a URL, search existing content for the same intent. Update,
  differentiate, or consolidate first. Similar wording alone isn't grounds to
  merge — compare actual intent and clinical purpose.
- When the wrong URL ranks for a query, that's a cannibalization bug in the
  ownership table, not a content-quantity problem.

## 2. Self-referencing canonicals, everywhere, no exceptions

`alternates: { canonical: pageUrl }` where `pageUrl` is that page's own absolute
URL. Combined with `metadataBase`, this is a one-line-per-page discipline that
eliminates GSC's entire "alternate page with proper canonical tag" bucket.

Decide www vs non-www **once**, before launch, and enforce it with a platform-level
**301** (a 302 wastes link equity). Everything in the codebase — `WEBSITE_URL`,
sitemap, canonicals, schema `@id`s — uses that one host.

## 3. An entity graph, not a pile of JSON-LD

One `@graph` in the root layout with stable `@id` anchors, referenced by id from
every page-level schema. Search engines resolve this into one connected entity
for the practice and one for the practitioner. Ten disconnected `Physician`
blobs across ten pages do not.

For YMYL, the credential chain does the heavy lifting:
`Physician.hasCredential` → `EducationalOccupationalCredential` with the
registration number as `identifier` and `recognizedBy` naming the real medical
council with its real URL. Plus `alumniOf` (each with what was studied),
`memberOf` (societies), `medicalSpecialty[]`. This is machine-readable proof of
expertise for exactly the query class Google treats most conservatively.

Per page type, layer on:

| Page | Schema |
|---|---|
| Home | sitewide `@graph` + `FAQPage` |
| Service hub | `MedicalOrganization.availableService[]` of `MedicalProcedure` |
| Service detail | `MedicalProcedure` (+`bodyLocation`, `performer`, `preparation`, `followup`) + `FAQPage` + `BreadcrumbList` |
| Location | `WebPage` + `MedicalClinic` + `PostalAddress` + `GeoCoordinates` + `Service` + `BreadcrumbList` |
| Blog post | `MedicalWebPage` + `Article` + `BreadcrumbList` + conditional `FAQPage` |

**FAQ schema must match visible text exactly.** Schema-only FAQs are a
manipulation signal.

## 4. Local SEO is a data problem

`GeoCoordinates` in schema + `geo.region` / `geo.placename` / `geo.position` /
`ICBM` meta + `LocalBusiness` with `openingHours` in schema.org syntax +
`areaServed` + `hasMap` + `priceRange` + `paymentAccepted` + `currenciesAccepted`
— all read from one location constant. Include the city name naturally in
titles, h1s, and FAQ answers.

One page per **real, staffed address**. Do not generate a page per
neighbourhood; that's a doorway pattern and it gets penalized.

## 5. Sitemap: auto-discover content, hand-curate structure

Posts auto-discovered from disk (so publishing can't forget). Static routes in an
explicit `lastModified` registry (so dates are honest, not `new Date()` — a
sitemap that claims every page changed today teaches Google to ignore your
`lastModified`). `/blog`'s date = the max of its posts' dates.

## 6. Zero CLS on content images

Markdown images through `next/image` with **exact intrinsic dimensions** from a
registry, verified against the real files by a test. AVIF/WebP formats, tuned
`deviceSizes`, `priority` only on the LCP image, lazy everywhere else. This is
the difference between a 90 and a 99 on Performance for a content site.

## 7. Redirect discipline

- Filename ≡ slug, enforced by test.
- Every renamed URL gets a permanent 301 in `redirects()`, forever.
- Audit GSC's 404 and "page with redirect" buckets quarterly; each real 404 there
  is link equity leaking.

Two genuine bugs the source site found this way: an externally-linked service
page under a superseded slug, and a post whose slug had been lengthened. Both
were silent 404s; both were one-line fixes.

## 8. Tests are the SEO layer's immune system

Discovery, image dimensions, social metadata, slug integrity, canonical presence.
Cheap to write, and they're why the SEO layer still holds after 46 posts and
several redesigns. Without them, the llms.txt and the sitemap drift apart within
about three publishing sessions.

## 9. Measurement loop (monthly)

Track a *focused* keyword portfolio, not every variant. Then:

| Signal | Action |
|---|---|
| High impressions, low CTR | Test title/description — preserving medical accuracy |
| Position 4–10 | Improve intent match, depth, internal links. **Highest ROI.** |
| Wrong URL ranking | Fix ownership / cannibalization |
| Rankings but no consultations | Fix the journey and CTA relevance, not the rankings |
| No real demand | Don't publish just because a tracker has the keyword |

Protect page-one positions before chasing new ones. Measure booked consultations,
not keyword count.

---

# Part 2 — AEO (Answer Engine Optimization)

LLM answer engines — ChatGPT Search, Claude, Perplexity, AI Overviews — are a
distinct channel with distinct mechanics. Three facts drive everything here:
**they mostly don't execute JS**, **they retrieve chunks rather than pages**, and
**they need to attribute a claim to a credentialed source**.

## 1. `public/llms.txt` — a curated inventory

Not auto-generated. Hand-grouped, because the grouping *is* the signal — it tells
a model your topical structure in one fetch.

Structure that works:

```md
# <Practitioner> — <Specialty> in <City>, <Country>

> One paragraph in ENGLISH: who this is, where, what the content covers,
> what language the content is in, primary and secondary audience.

> The same paragraph in the site's language.

## Main pages
- [Home](url): what it's for.
- [Treatments](url): hub of services and procedures.
- [Blog](url): educational articles.
- [About](url): credentials, training, career.

## Treatments
- [<Service>](url): symptoms, diagnosis, treatment options.
…

## Blog — educational articles
### <Topic cluster>
- [<Full article title>](url)
…
```

Why the English summary when the site is Portuguese: the model's reasoning about
*what this site is* happens in English, and giving it that framing directly beats
making it infer. Keep both.

Then declare it: `<link rel="llms" href="/llms.txt" />` in `<head>`.

## 2. `robots.txt` — allow AI crawlers explicitly

Wildcard `Allow: /` technically covers them; explicit named blocks remove all
ambiguity and document the intent for whoever edits this next.

```
User-agent: *
Allow: /
Sitemap: https://<canonical-host>/sitemap.xml

# OpenAI
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: GPTBot
Allow: /

# Anthropic
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: ClaudeBot
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
```

(Separate the *search/answer* bots from *training* bots if the client wants
indexing without training — `GPTBot` and `ClaudeBot` are the training-adjacent
ones. That's a client decision, not a default.)

## 3. Write for chunk retrieval

An answer engine retrieves a *section*, not your page. Every `##` section must
survive being quoted alone:

- **Question-shaped headings.** `## A ligadura elástica dói?` — literally what a
  patient types. Not `## Sobre o procedimento`.
- **Answer in the first sentence.** State the conclusion, then qualify. Inverted
  pyramid. A model that truncates after two sentences should still be right.
- **Self-contained sections.** No "as mentioned above" — the chunk won't have it.
- **A definition sentence near the top.** "X é ..." / "X is ..." is the single
  most-extracted sentence pattern.
- **Explicit numbers, stages, criteria.** Grades, timeframes, indication lists.
  Specificity is what gets cited over a competitor's vagueness.
- **Sentence case headings.** Title Case reads as marketing copy to both humans
  and extractors.
- **Cover the negative case.** "When this is NOT indicated", contraindications,
  recurrence risk. Almost no competitor writes it, patients search it, and models
  reward balanced sources on health topics.

## 4. Make attribution easy

Every article carries, visibly *and* in schema: author name, credential + council
registration, specialty, publish date, last-modified date. `hasCredential` +
`knowsAbout` on the `Article.author` node. For YMYL, an answer engine that can't
identify a credentialed author will prefer a source that can.

## 5. Static rendering is non-negotiable

Content that needs JS to appear does not exist to most LLM crawlers. Keep every
content route statically generated; keep interactivity leaf-level and
client-only. This is also the reason the FAQ has to be in the HTML, not behind an
accordion that renders empty.

## 6. FAQ blocks are the highest-yield AEO format

Frontmatter `faqs[]` → `FAQPage` schema → the same text rendered visibly. It maps
1:1 onto the question/answer shape both Google rich results and LLM retrieval
want. Six real FAQs per service page and per major article.

## 7. Keep the inventory honest

The discovery test asserting `llms.txt` post set ≡ on-disk post set is what stops
the file from silently becoming a lie. A stale llms.txt is worse than none —
you're handing a model dead URLs.

## 8. Optional next steps (propose, don't assume)

- `/llms-full.txt` — full text of key pages concatenated, for models that fetch
  one file rather than crawling.
- Per-post `.md` endpoints (`/blog/<slug>.md`) serving raw markdown.
- `speakable` schema on FAQ answers.
- An `AboutPage`/`ProfilePage` schema on `/sobre` to strengthen the person entity.

---

# Part 3 — YMYL compliance is an SEO feature

For medical content, the regulator's rules and Google's quality guidelines point
the same direction, which is convenient:

| Regulator forbids | Google/LLMs also penalize |
|---|---|
| Guaranteed outcomes | Unsupported claims |
| Superiority claims | Thin promotional content |
| Fear-based hooks | Clickbait, low trust signals |
| Missing practitioner ID | Missing E-E-A-T signals |
| Sensationalism | Low-quality YMYL content |

So the compliance pass isn't overhead layered on top of the SEO work — sober,
credentialed, educational, balanced content is what both audiences reward. Run
the pass before publish, every time, against the project's own
`docs/compliance-guidelines.md`.

**Where regulators differ, they differ on the same three things:** imagery,
testimonials, and pricing. Those are precisely the surfaces with the biggest
conversion impact, so getting the research right is commercial as well as legal
— e.g. a dental practice permitted to run a consent-backed before/after gallery
has a page type (and a rich-results opportunity) that a medical practice under
CFM generally does not. Never inherit another project's answer here; derive it
with `clinic-compliance-research`.
