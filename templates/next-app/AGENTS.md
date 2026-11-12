# AGENTS.md

Working agreement for coding agents in this practice website. Generated from
the clinic-site-kit starter.

## Non-negotiable rules

1. **Every practice fact lives in `site/site.config.ts`.** Names, council
   numbers, addresses, phones, hours, services. If it is not in the config or
   the client brief, it does not go on the site. Never invent a fact.
2. **Clinical copy ships unindexed.** New or changed service text goes in with
   `indexable: false`; only the practitioner's approval flips it to `true`.
   `lastReviewed` is set only from the practitioner's own sign-off.
3. **No promises.** No outcome, superiority, percentage or timeline claims
   unless sourced and approved. Follow `docs/compliance-guidelines.md`.
4. **Contacts are sacred.** Never change a number or destination without the
   client. Prefilled messages stay generic (the build rejects clinical terms);
   context belongs in the visible label, never in the message.
5. **Privacy by default.** No new tracking vendor, cookie or redirector without
   approval. Analytics only after consent; events never carry the page path,
   title, query string or prefilled message.
6. **Structured data mirrors the page.** Emit JSON-LD only for what is visible.

## Search rules the tests enforce

- The home page alone owns "<specialty> em <primary city>" in its title,
  description and body. A location in another city owns that city's line.
  No two pages share a title.
- Every indexable post lists at least one `relatedServiceSlugs`.
- Search titles ≤ 60 characters including the ` | site name` suffix
  (`seoTitle` when the visible title is longer), descriptions ≤ 160.
- Redirects live in `site.config.ts` with a `reason`. The source is not an
  existing page; the destination is an indexable page. Never in `next.config.ts`.

## Conventions

- Tailwind utilities; shared component classes in `@layer components` in
  `src/app/globals.css`. Palette changes: edit the config, run `bun run theme`.
- `const Component = () => {}`, early returns, `handle*` event handlers.
- Touch targets ≥ 44px; 390px is the design viewport, 320px must not overflow.
- Add a type cast only with a `TODO` comment explaining how to remove it.

## Before a PR

- `bun run check` (Node 24) must pass: typecheck, lint, unit, build, e2e on
  mobile/tablet/desktop.
- Screenshots at 390px and 1440px for any visual change.
- PR description in Portuguese: problem, change, expected benefit (as a
  hypothesis), tests, pending items, how to evaluate later.
