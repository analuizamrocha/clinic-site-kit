# Clinic site starter

Runnable starter generated into each new client repo. **All client facts live in
`site/site.config.ts`**; everything else derives from it. See
[ADR 0001](../../docs/adr/0001-harness-stack.md).

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

Component classes live in `@layer components` so Tailwind utilities such as
`hidden`/`lg:hidden` keep working when combined with them.
