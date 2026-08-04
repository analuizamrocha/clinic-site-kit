---
name: clinic-blog-post
description: Write, review, or update a markdown blog post on a medical practice site — frontmatter contract, italic hook that drives the listing-card subtitle, answer-first body for search and LLM extraction, images with registered intrinsic dimensions, llms.txt registration, identification footer, and the medical-advertising compliance pass. Use for every new article and every substantive edit to an existing one. Triggers on "write a blog post", "new article about X", "add a post", "update the post on Y", "review this post for compliance".
---

# Clinic Blog Post

Blog posts own **informational** intent and link *up* to the service page that
owns the corresponding commercial intent. That relationship is the whole point of
the blog — an article that doesn't support a service page is orphaned traffic.

## Before writing — the overlap check

```bash
rg -il "<topic>" content/posts
rg -i "primaryKeyword" content/posts | rg -i "<topic>"
```

Then decide, explicitly: **update / differentiate / consolidate / create**.
Creating a second URL for a question you already answer is the most common way
these sites lose rankings to themselves. Similar wording alone isn't grounds to
merge — compare actual reader intent.

Then define, in one line each, before writing:
- the single primary query
- the distinct reader question
- the owner service page this article supports

## Frontmatter contract

`content/posts/<slug>.md` — **filename must equal the `slug` field**.

```yaml
---
title: 'Sentence case title that reads like the question'
metaDescription: 'Under 160 chars. Concrete, no promises.'
slug: 'post-slug'
publishDate: '2026-08-03'
lastModified: '2026-08-03'
primaryKeyword: 'the one query'
secondaryKeywords:
  - 'variant 1'
  - 'variant 2'
  - '<specialty> <city>'
targetAudience: 'patients'        # patients | referring-doctors | general-public
intent: 'consideration'           # awareness | consideration | decision
featured: false
order: <max existing + 1>
relatedPosts:
  - 'existing-slug'               # optional; must resolve to real posts
faqs:
  - question: 'Real question a patient asks?'
    answer: 'Sober, accurate, complete in 1–3 sentences.'
---
```

## Body

### The italic hook (controls the listing card)

The **first non-heading paragraph** becomes the card subtitle. If it's fully
italic, the emphasis markers are stripped and that exact text is used. So:

```md
_One line that frames the tension the article resolves._
```

Immediately after the frontmatter. No heading before it. This is the only way to
control the card copy — there is no separate excerpt field.

### First image = card image

The first markdown image in the body is reused as the listing card image. Put the
most representative one first.

### Structure for both search and LLM extraction

- `##` headings phrased as the question a patient types.
- The answer in the **first sentence** under each heading, then the detail. A
  model that truncates after two sentences should still be right.
- Each `##` section self-contained — answer engines retrieve chunks, not pages.
  No "as mentioned above".
- A definition sentence near the top (`X é ...`).
- Sentence case for the title and every heading. Never Title Case.
- Bullet lists for symptoms, signs, indications, and criteria.
- Explicit numbers, stages, timeframes — specificity is what gets cited.
- Cover the negative case: when it's *not* indicated, recurrence risk, what won't
  work. Competitors skip this; patients search it; models reward balance.
- CTA in the conclusion, linking to the owner service page.

### Images

```md
![Descriptive, accessible alt text — not keyword stuffing](/images/posts/<slug>/<name>.webp)
```

1. WebP unless transparency requires PNG.
2. Lowercase hyphenated filename, namespaced under the post slug.
3. Inspect the file's **real** width/height. If it differs from the registry
   default, add an exact entry to `src/lib/mdx-image-dimensions.ts` keyed by the
   exact markdown path.
4. Run the dimension test — it opens every file with `sharp` and fails on a
   mismatch. This is what keeps CLS at zero.

### Footer (identical on every post)

```md
---

**<Practitioner name>**  
<Specialty title>  
<CRM-XX 00000> | <RQE 00000>  
<Specialist qualification>

> _Este conteúdo tem caráter educativo e não substitui a consulta médica. Procure sempre orientação profissional para diagnóstico e tratamento adequados._
```

## Register the post

1. `public/llms.txt` — add under the most relevant topic cluster, with the full
   article title. **Required** — the discovery test asserts set equality between
   on-disk posts and llms.txt entries.
2. The sitemap picks it up automatically. Verify anyway.
3. If it's the best support article for a service page, register the mapping in
   `src/lib/treatment-related-blog.ts`.
4. Add reciprocal `relatedPosts` entries on the 1–2 most closely related existing
   posts.

## Compliance pass — mandatory, before done

**Run the checklist in `docs/compliance-guidelines.md` §8** — the
project-specific doc generated by `clinic-compliance-research`. If that file
doesn't exist, stop and run that skill first; do not substitute another
project's rules. Dentistry, medicine, psychology and nutrition differ materially
on exactly the things a blog post touches — imagery, testimonials, pricing.

Nothing ships that depends on an open question from §10 of that doc.

Jurisdiction-independent floor, true almost everywhere but **not a substitute**
for the generated doc:

- [ ] Educational focus, sober tone
- [ ] No guaranteed outcomes, no "definitive/miraculous/revolutionary"
- [ ] No superiority claims over techniques or colleagues
- [ ] No fear-based hooks or panic-inducing framing
- [ ] No identifiable patient data or imagery without documented consent
- [ ] Claims supported by mainstream professional literature
- [ ] Identification + disclaimer footer present, exact wording from §2
- [ ] Any comparison of techniques is factual and two-sided

Prefer "may", "can", "in selected cases", "depends on individual assessment".

## Verify

```bash
<pm> run test:run -- \
  tests/content-discovery.test.ts \
  tests/mdx-image-dimensions.test.ts \
  tests/seo-metadata.test.ts
<pm> run lint && <pm> run build
```

Then check the `/blog` card (subtitle + image render correctly) and the rendered
article at mobile width.

## Report

Name the primary query, the owner service page it supports, the overlap decision
you made and why, and any medical claim that needs the practitioner's sign-off.
