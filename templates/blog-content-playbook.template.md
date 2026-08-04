# Blog Content Playbook — <Practice Name>

Operational contract for creating and maintaining posts in this project.
Strategy lives in `docs/seo-strategy.md`; compliance in
`docs/compliance-guidelines.md`.

## Where content lives

| Thing | Path |
|---|---|
| Posts | `content/posts/<slug>.md` |
| Listing page | `src/app/blog/page.tsx` |
| Post route | `src/app/blog/[slug]/page.tsx` |
| Parser + excerpt logic | `src/lib/blog.ts` |
| Post images | `public/images/posts/<slug>/` |
| Markdown image renderer | `src/components/ui/MdxImage.tsx` |
| Intrinsic dimensions registry | `src/lib/mdx-image-dimensions.ts` |
| Machine-readable inventory | `public/llms.txt` |

## Frontmatter contract

Filename **must** equal the `slug` field.

```yaml
---
title: 'Sentence case title'
metaDescription: 'Under 160 chars'
slug: 'post-slug'
publishDate: 'YYYY-MM-DD'
lastModified: 'YYYY-MM-DD'
primaryKeyword: 'the one query'
secondaryKeywords: ['variant 1', 'variant 2']
targetAudience: 'patients'      # patients | referring-doctors | general-public
intent: 'awareness'             # awareness | consideration | decision
featured: false
order: <max existing + 1>
relatedPosts: ['existing-slug'] # optional, must resolve
faqs:
  - question: '…?'
    answer: '…'
---
```

## Card subtitle — the italic hook

The listing card subtitle comes from the **first non-heading paragraph**. If it's
fully italic, that text is used verbatim (markers stripped). So every post opens
with one italic hook line immediately after the frontmatter, before any heading.

```md
_One line framing the tension the article resolves._
```

The **first markdown image** in the body becomes the card image.

## Capitalization

Sentence case for `title` and all `##` / `###` headings. Capitalize only the
first word and proper nouns. Never Title Case.

## Body conventions

- `##` headings phrased as the question a patient would type
- The answer in the first sentence under each heading, then detail
- Each section self-contained — answer engines retrieve chunks, not pages
- Bullet lists for symptoms, indications, criteria
- Cover the negative case: when something is *not* indicated, limits, recurrence
- CTA in the conclusion, linking to the owner service page

## Image workflow

```md
![Descriptive accessible alt text](/images/posts/<slug>/<name>.webp)
```

1. WebP unless transparency requires PNG
2. Lowercase hyphenated filename, namespaced under the slug
3. Check the file's **real** dimensions; if they differ from the registry
   default, add an exact entry to `src/lib/mdx-image-dimensions.ts`
4. Run the dimension test — it verifies against the real file with `sharp`

## Discovery

New posts enter the sitemap automatically. They must **also** be added to
`public/llms.txt` under the right topic cluster — the discovery test asserts set
equality, so both a missing entry and a stale one fail.

## Footer block — identical on every post

```md
---

**<Practitioner name>**  
<Professional title>  
<Registration number(s)>

> _<Educational disclaimer, exact wording from docs/compliance-guidelines.md>_
```

## Compliance pass — mandatory before publish

Run the checklist in `docs/compliance-guidelines.md` §8. Nothing ships that
depends on an open question from §10.

## Authoring workflow

1. Scan existing posts for overlapping intent
2. Decide: update / differentiate / consolidate / create
3. Name the primary query, the reader question, and the owner service page
4. Create the file with valid frontmatter
5. Italic hook + body
6. Images + register non-default dimensions
7. Add to `public/llms.txt`
8. Identification + disclaimer footer
9. Compliance pass
10. Tests, lint, build
11. Review the `/blog` card and the rendered article at phone width

## Validation

```bash
rg -n "<topic>" content/posts        # duplicate check
<pm> run test:run -- tests/content-discovery.test.ts tests/mdx-image-dimensions.test.ts tests/seo-metadata.test.ts
<pm> run lint && <pm> run build
```
