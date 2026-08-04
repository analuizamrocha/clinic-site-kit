---
name: clinic-compliance-research
description: Identify the professional-advertising regulator that governs a specific practice (profession + country + state), research its current rules from primary sources, and generate a project-specific docs/compliance-guidelines.md that every content skill then enforces. Use once per project before writing any patient-facing copy, and re-run when rules change or the practice adds a regulated activity. Triggers on "which rules apply", "is this compliant", "CFM/CFO/CRP/CRN/regulator", "advertising rules for <profession>", "set up compliance guidelines", or any content work on a regulated practice with no compliance doc yet.
---

# Clinic Compliance Research

Regulated-practice advertising rules are **profession-specific, jurisdiction-specific,
and they move**. This skill derives the applicable rules instead of assuming them.

Worked example of why this matters: Brazilian medicine (CFM) treats patient
before/after imagery as high-risk and heavily restricted. Brazilian dentistry
(CFO) *authorizes* it under Resolução CFO-196/2019, given a signed TCLE. Same
country, adjacent professions, opposite defaults. Reusing a CFM checklist on a
dental site would produce guidance that is both over-restrictive and wrong.

## Output

One file: `docs/compliance-guidelines.md`, in the destination repo, following the
structure in `references/compliance-doc-template.md`. Every downstream skill
(`clinic-blog-post`, `clinic-treatment-page`, `clinic-content-plan`) reads that
file — not this one.

## Step 1 — Establish scope

Get these explicitly. Do not infer them from the domain name or the copy:

- **Profession(s)** as legally titled (medicine? dentistry? nutrition?
  psychology? physiotherapy? veterinary? more than one at the same clinic?)
- **Country**, and **state/province** — regional councils often add rules on top
  of the federal ones
- **Specialty**, if the specialty has its own society guidance
- **Regulated activities in scope**: patient imagery, testimonials, pricing,
  promotions, teleconsultation, procedure video, prescription products
- **Content surfaces**: website, blog, Instagram, paid ads — some regulators
  differentiate

If the practice spans two professions, both rule sets apply and **the stricter
one governs shared surfaces**. Say so explicitly in the output.

## Step 2 — Identify the regulator

Start from `references/regulator-seeds.md` for a known starting point, then
**confirm it's still the right body**. Councils merge, rename, and get their
rules overridden by competition or consumer-protection authorities.

Also check for a second layer:
- Consumer protection law (in Brazil, the CDC applies on top of council rules)
- Data protection law (LGPD / GDPR / HIPAA) for anything patient-identifiable
- Competition authority decisions that have *struck down* council restrictions —
  this is exactly what happened to CFO's pricing rules via CADE in 2023/2025
- Advertising self-regulation bodies (CONAR in Brazil)

## Step 3 — Research from primary sources

**Primary sources only for the rules themselves.** Council websites, the actual
resolution PDFs, official gazettes. Blog posts from marketing agencies are
useful for *finding* the resolution number and for spotting recent changes —
never for stating what the rule says.

For each rule you record:
- The instrument (resolution number, code article, law) and its date
- A direct URL to the primary source
- Whether it is currently in force, amended, suspended, or under revision
- The date you verified it

Watch for and explicitly flag:
- **Rules under active revision.** CFO has a special group (DECISÃO CFO-05-2025)
  rewriting its advertising chapter right now. Guidance written against a
  chapter being rewritten has a short shelf life — say so in the doc.
- **Contradictions between sources.** When two credible sources disagree — as
  they currently do on whether dentists may publish prices and promotions
  post-CADE — do **not** pick one silently. Record both readings, cite both, and
  escalate it to the client as a decision for their professional or legal
  counsel.
- **Model knowledge is stale by definition.** Anything you "know" about a
  regulation without a fetched, dated citation is a hypothesis, not a rule.

## Step 4 — Write `docs/compliance-guidelines.md`

Fill `references/compliance-doc-template.md`. The template's section structure
is fixed so downstream skills can rely on it; the content is entirely
jurisdiction-specific.

Two sections matter most operationally:

- **The mandatory identification block** — the exact wording that must appear on
  the site and in post footers, with the registration-number format for this
  profession. Downstream skills copy this verbatim.
- **The pre-publish checklist** — 8–12 binary checks phrased so a reviewer can
  answer yes/no without re-reading the resolution.

Also fill the **Open questions / needs professional sign-off** section. An empty
one means you didn't look hard enough.

## Step 5 — Hand off honestly

State plainly in your report:

- Which rules you verified against a primary source, with dates
- Which are inferred, contradicted, or under active revision
- What needs the practitioner's, their council's, or a lawyer's confirmation

> You are not the compliance authority. You are producing a well-sourced,
> dated, reviewable starting point that makes a professional's review fast. Say
> that in the generated doc's header. Never present researched guidance as legal
> advice, and never let a downstream skill publish copy that turns on an open
> question.

## Re-running

Re-run when: the practice adds a regulated activity, a resolution under revision
lands, a competition/consumer authority ruling drops, or every 6 months.
Bump the `Last verified` date at the top of the generated doc every time — a
compliance doc with no date is worse than none, because it looks authoritative.
