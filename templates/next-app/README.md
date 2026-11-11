# Clinic site starter

Runnable starter generated into each new client repo. **All client facts live in
`site/site.config.ts`**; everything else derives from it. See
[ADR 0001](../../docs/adr/0001-harness-stack.md).

Use **Node 24** (`.nvmrc`). On Node 26 the jsdom test environment loses
`localStorage` (Node's own experimental Web Storage global shadows it), and the
consent tests fail for reasons unrelated to the code.

```bash
bun install
bun run dev        # http://localhost:3000
bun run theme      # regenerate src/app/theme.css after changing the palette
bun run check      # typecheck · lint · unit · build · e2e — must pass before a PR
```

## What the build refuses

`validateSiteConfig` runs on every import of the site and fails the build on:

- placeholders (`TODO`, `PREENCHER`, `XXX`, `lorem`, `<…>`) anywhere;
- phone numbers outside E.164, and dummy numbers on a real config;
- a prefilled WhatsApp message containing a clinical term;
- a service pointing at a missing contact or location; a draft marked indexable;
- palette pairs below WCAG AA (4.5:1);
- `fictional: true` on a Vercel production build.

## Customising per client

| What | Where |
|---|---|
| Facts, contacts, locations, services, FAQ, palette | `site/site.config.ts` (then `bun run theme`) |
| Fonts | `src/app/fonts.ts` (keep the CSS variable names) |
| Portrait and images | `public/images/` + `practitioner.photo` with real width/height |
| Extra clinical terms to block in messages | `CLINICAL_TERMS` in `src/lib/site/validate.ts` |

## Analytics and consent

With no `analytics.gtmId` there is no banner, no script and no event. With one,
GTM loads only after the visitor accepts (accept and refuse carry equal weight;
"Preferências de cookies" in the footer reopens the choice). Conversion clicks
push `whatsapp_click` / `phone_click` / `maps_click` with only `placement`,
`contact_purpose` and the destination **without its query**: no page path, no
title, no prefilled message.

Component classes live in `@layer components` so Tailwind utilities such as
`hidden`/`lg:hidden` keep working when combined with them.
