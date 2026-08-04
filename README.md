# Clinic Site Kit

`v0.2.0`

A portable extraction of the architecture, SEO and AEO patterns proven on a
production medical practice site (Next.js App Router: landing page + treatment
pages + location pages + markdown blog, ~50 indexed pages, 46 posts).

Built to be **installed into another practice's repo** and reused. Nothing here
is specific to one client or one profession — client facts are fill-ins, and the
regulatory rules are *researched per project* rather than hardcoded.

## Install

```bash
bash clinic-site-kit/install.sh <target-repo>
```

Copies skills → `.claude/skills/`, reference docs → `docs/clinic-kit/`,
templates → `docs/` (never overwriting existing work).

Then: fill `docs/client-brief.md` → run `/clinic-compliance-research` → read
`docs/clinic-kit/WORKFLOW.md`.

## Contents

| Path | What it is |
|---|---|
| `WORKFLOW.md` | **Start here.** End-to-end sequence, including where `/tlc-spec-driven` and `/grill-with-docs` fit |
| `METAPROMPT.md` | The one-shot prompt for a fresh agent in a new repo. Phases -1 → 8 |
| `CLIENT-BRIEF.template.md` | The ~30 facts the agent refuses to invent |
| `reference/PATTERNS.md` | File-by-file map of the reference implementation, with the actual code shapes |
| `reference/SEO-AEO-PLAYBOOK.md` | Every SEO/AEO decision that worked, and why, as durable rules |
| `reference/compliance-examples/` | A worked compliance doc (Brazilian medicine / CFM) — **format reference only** |
| `templates/` | Seeds for `docs/seo-strategy.md` and `docs/blog-content-playbook.md` |
| `install.sh` | Bootstrap into a target repo |

## Skills

| Skill | When | Cadence |
|---|---|---|
| `clinic-compliance-research` | **First.** Which regulator, what it currently says → `docs/compliance-guidelines.md` | Once, then every 6 months |
| `clinic-foundation` | Constants, entity graph, metadata generators, sitemap, robots, llms.txt, guardrail tests | Once |
| `clinic-treatment-page` | One service page, 12-point checklist | Per service |
| `clinic-content-plan` | Mine the landing page for topics, **agree how each post gets written**, seed the launch batch | Per batch |
| `clinic-blog-post` | One article, end to end | Per article |
| `clinic-seo-audit` | Findings report: canonicals, schema, cannibalization, indexing errors, AEO readiness | Monthly / pre-launch |

## Two design decisions worth knowing about

**Compliance is researched, not assumed.** The first version of this kit
hardcoded Brazilian medical-council (CFM) rules. That was wrong the moment it
met a dentist: CFO *authorizes* patient before/after imagery under a signed
TCLE, where CFM heavily restricts it — same country, adjacent profession,
opposite default, and it changes what page types you build. So
`clinic-compliance-research` derives the rules per project from primary sources,
with dates, and is required to surface contradictions rather than resolve them
silently. (It currently has to: sources disagree on whether Brazilian dentists
may publish prices post-CADE, and CFO's advertising chapter is being rewritten.)

**The blog doesn't write itself behind your back.** `clinic-content-plan` stops
and asks, per post: do you supply the substance, do I draft for your review, or
skip? Posts carrying clinical judgment usually need the practitioner's own
voice, and generating them silently wastes the work.

## Portability

- Reference stack: Next.js 16 / React 19 / Tailwind v4 / Bun / Vitest /
  Playwright. The *patterns* survive a stack change; the *code* doesn't.
- Regulator-agnostic by construction. `regulator-seeds.md` has starting points
  for Brazilian councils (CFM, CFO, CFP, CFN, COFFITO, CFMV, COFEN, CFF) and
  pointers for US / UK / EU / PT / CA / AU — all flagged for re-verification.
- Non-YMYL reuse: keep the entity graph, ownership model and discovery tests;
  drop the compliance gate.

## Contributing back

When something proves out on a client site — a schema shape, a regulator quirk
worth generalizing, a better FAQ pattern — port it back here. The kit is the
asset; the client sites are instances of it.
