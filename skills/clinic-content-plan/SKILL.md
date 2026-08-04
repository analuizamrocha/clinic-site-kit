---
name: clinic-content-plan
description: Turn an existing landing page plus the client brief into a concrete blog and service content plan — mine the copy already on the site for topics, map each to the page-ownership table, then agree per-post how it gets written (practitioner supplies it, agent drafts it, or skip) and seed the first batch so /blog launches with real articles instead of empty. Use right after the blog infrastructure exists and before writing individual posts. Triggers on "what should we write about", "content plan", "seed the blog", "we need posts", "generate posts from the landing page", "editorial calendar".
---

# Clinic Content Plan

Bridges "the blog renders" and "the blog has content worth ranking". Produces an
agreed, sourced plan — never a pile of unreviewed generated articles.

## The rule that governs this skill

**You do not decide alone how a post gets written.** Some posts must come from
the practitioner's own words; some can be drafted and then reviewed; some
shouldn't exist. Step 4 is a real checkpoint — stop there and get answers.

## Step 1 — Mine what already exists

The landing page is a compressed version of everything the practice wants to
say. Read it properly before proposing anything:

- Every service, condition, and procedure named anywhere in the copy
- The exact vocabulary used for each (patient-facing wording beats clinical
  wording for search — collect both)
- FAQ entries, hero promises, section subheads
- Existing CTAs and what objection each one answers
- The brief's "top questions patients actually ask in consultation" — this is
  the single richest source, because those questions are literally the queries

Also inventory what's already published: existing posts, their `primaryKeyword`,
and any content elsewhere (Instagram captions, PDFs, printed patient handouts)
that can be adapted rather than written cold.

## Step 2 — Cluster and map to ownership

For every candidate topic, decide **intent** first:

| Reader question shape | Intent | Owner page type |
|---|---|---|
| "what is X", "is X normal", "symptoms of X" | awareness | blog post |
| "X vs Y", "does X always need surgery" | consideration | blog post |
| "treatment for X in <city>", "cost/how it works" | decision / commercial | **service page** |

Commercial intent goes to a service page, never a post. Then, for each proposed
post, name the **owner service page it links up to**. A post with no owner is
orphaned — either find its owner or cut it.

Check every candidate against existing content for overlap before it enters the
plan. Update/differentiate/consolidate beats creating a near-duplicate.

## Step 3 — Draft the plan

A table, ordered by priority. Priority = (real patient demand) × (supports a
service page that converts), not by how easy it is to write.

| # | Working title | Primary query | Intent | Owner service page | Why it earns a URL | Priority |
|---|---|---|---|---|---|---|

Recommend a **launch batch of 5–8 posts**, not 30. A blog with 6 strong articles
that each answer a real question outranks 30 thin ones, and it's reviewable in
one sitting by a busy practitioner.

Cover the mix deliberately: 2–3 awareness (broad reach), 2–3 consideration
(closest to booking), 1–2 that establish authority on the practice's signature
procedure.

## Step 4 — Agree the sourcing mode — **ASK, DO NOT ASSUME**

Present the plan and ask the user, explicitly, for each post or for the batch:

> **How do you want each of these written?**
>
> **A — You supply it.** You'll prompt/dictate/write the substance (voice notes,
>   a rough draft, a consultation transcript, bullet points) and I turn it into a
>   compliant, SEO-structured post. Best for anything reflecting clinical
>   judgment, the practice's specific approach, or the practitioner's voice.
>
> **B — I draft it, you review.** I write from the landing page, the brief, and
>   mainstream professional sources; it ships only after the practitioner signs
>   off on medical accuracy. Best for well-established general education.
>
> **C — Skip / later.** Not worth a URL right now.
>
> You can mix — e.g. A for the signature-procedure posts, B for the general ones.
>
> If you pick A for any post: how will you get me the raw material, and when?
> I'll set up the file with frontmatter and a section skeleton so you can drop
> content straight in.

Record the answer per post in the plan table as a `Source` column. **Do not
write a single post before this is answered.** Guessing here produces either
generic content in the wrong voice, or wasted work on posts the practitioner
wanted to write personally.

For mode **A**, create the stub now: correct filename, complete frontmatter,
italic-hook placeholder, and `##` skeleton headings phrased as the questions —
so the practitioner is filling in answers, not facing a blank page.

For mode **B**, confirm before drafting: who signs off on medical accuracy, and
how fast? A drafted post that can't get reviewed is not an asset.

## Step 5 — Seed the launch batch

Write the agreed posts via the `clinic-blog-post` skill — one at a time, each
fully finished (frontmatter, italic hook, images with registered dimensions,
llms.txt entry, related posts, identification footer, compliance pass) before
starting the next. Half-finished posts break the discovery test and are worse
than absent ones.

Vary genuinely: different `intent`, different `targetAudience`, different
article shape (explainer / comparison / decision guide / "when to seek care").
Six posts that read like the same template with words swapped are visibly
low-quality to both readers and ranking systems.

## Step 6 — Verify the blog actually renders

Before calling this done:

- `/blog` lists every post with correct card subtitle and card image
- Every `/blog/<slug>` renders, with schema in the initial HTML
- Related-post links resolve both directions
- Every post links up to its owner service page, and at least one service page
  links back down
- Discovery test passes: on-disk posts ≡ llms.txt ≡ sitemap
- Read one post end-to-end on a phone-width viewport

## Step 7 — Hand over the calendar

Leave behind `docs/content-plan.md`: the full table with sourcing mode, what
shipped, what's queued, and the next 5 topics with their owner pages already
assigned. Note which posts are awaiting practitioner input, so the next session
doesn't re-derive the plan.

## Report

Shipped posts with their primary queries; posts stubbed and awaiting the
practitioner's material; topics deliberately cut and why; any medical claim
flagged for sign-off; and the ownership-table rows added.
