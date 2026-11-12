# ADR 0001 — The kit becomes a harness: one starter app, driven by one config

- Status: proposed
- Date: 2026-11-10

## Context

Up to v0.2.0 the kit was prompts, skills and reference docs extracted from a
single production site. Every new client still meant hand-building ~40 files
the agent re-derived from `PATTERNS.md`.

A comparison of three production practice sites (two coloproctology, one
neurosurgery; same agency, built 2025–2026) showed that most of each site is
the same shape, and that each site solved a different part best:

| Concern | Best existing solution |
|---|---|
| Contact destinations per kind of care (consulta / exame / secretária) | site A: separate WhatsApp constants per purpose |
| Consent before any third-party script (LGPD) | site A: `CookieConsent` + consent-gated provider — the only one of three |
| Data-driven treatment catalog with a clinical sign-off gate (`state` + `indexable`) | site C |
| Conversion events that never carry the prefilled message | site C: `sanitizeWhatsAppUrl` |
| Delegated, labelled conversion tracking (`data-conversion`) | site B |
| Post → treatment relation declared in data, tested | sites B and C |
| One `check` command (unit, lint, build, e2e on 3 viewports) | site C |

It also showed what made the sites diverge and cost time: three package
managers and test runners, Tailwind v3 vs v4, one hand-written directory per
treatment, and component CSS outside Tailwind's layers that silently beat
`hidden` utilities.

## Decision

Ship a runnable starter at `templates/next-app/`, generated into a new client
repo by `scripts/new-site`. **Every client fact lives in one typed file,
`site/site.config.ts`**; pages, metadata, JSON-LD, sitemap, `robots`, `llms.txt`
and the Markdown variant are derived from it.

| Choice | Decision | Why |
|---|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript strict | all three sites |
| Styling | Tailwind v4, theme as CSS variables generated from the config palette; component classes inside `@layer components` | v4 on two of three; layer rule avoids the `hidden` override bug |
| Package manager | Bun | fastest install/run; Vercel-native; one lockfile format across clients |
| Runtime | Node 24 (`.nvmrc`) | Node 26 drops flags some tooling still passes |
| Unit tests | Vitest (jsdom) | renders components; one runner |
| E2E | Playwright, mobile / tablet / desktop projects | site C's coverage caught real layout bugs |
| Gate | `bun run check` = typecheck + lint + unit + build + e2e | one command a PR must pass |
| Content | Markdown posts (`gray-matter` + `react-markdown` + `remark-gfm`) | no MDX runtime needed for patient education |
| Treatments | data-driven `[slug]` route from the config, not one dir per service | adding a service = one config entry |
| Analytics | off by default; GTM/GA4 only after consent; events minimized | LGPD; health context |
| Contacts | `Contact.purpose` + `Service.contactId` | the destination depends on the service |

## Guardrails the starter enforces (build fails otherwise)

1. Placeholders (`TODO`, `PREENCHER`, `XXX`, `lorem`, `<...>`) anywhere in the config.
2. Phone numbers not in E.164; a service pointing at a missing contact or location.
3. A prefilled WhatsApp message mentioning a condition or procedure.
4. A fictional/demo config deployed to Vercel production.
5. Theme text/background pairs below WCAG AA.
6. Structured data for anything not rendered on the page.

## Explicitly out of scope

- No CMS, no database, no shared npm package: each client repo owns its copy
  and can diverge.
- No migration of the existing production sites onto the starter. Patterns flow
  back by porting, case by case.
- Regulator rules stay researched per project (`clinic-compliance-research`);
  nothing regulator-specific is hardcoded beyond safe defaults.
- No client data in this repository. Fixtures describe a fictional clinic.

## Consequences

- New client: fill the brief → generate → replace photos/palette/copy → `check`.
- The skills shift from "build these files" to "fill and review this config".
- The starter must be kept green in this repo's CI, or it rots.
