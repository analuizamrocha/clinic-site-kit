---
name: clinic-new-site
description: Generate a new practice website from a filled client brief with the clinic-site-kit starter — brief → client.json → validated repo that passes `bun run check`. Use when starting a site for a new doctor/clinic client, "gerar site novo", "novo cliente", "create clinic site".
---

# clinic-new-site

Turns a filled `CLIENT-BRIEF.md` plus photos into a running, tested repo.
The generator refuses to write anything if the brief is incomplete or unsafe.

## Inputs (ask for anything missing — never invent)

- The filled client brief (`docs/client-brief.md` or the kit template).
- Portrait photo (≥ 900px wide), palette (7 hex colours or a reference to
  derive them from), fonts if the brand has them.
- The compliance doc from `/clinic-compliance-research` for this profession.

## Steps

1. **Brief → `client.json`.** Map the brief onto the shape of
   `examples/demo-pediatria/client.json` (types: `templates/next-app/src/lib/site/types.ts`).
   - One `Contact` per real line; `purpose` says what it books
     (consulta / exame / secretaria / clinica). Services point at the contact
     that actually books them (`contactId`).
   - Prefilled messages: generic. "Olá! Vim pelo site e gostaria de agendar
     uma consulta." No condition, procedure or personal detail.
   - Service copy you draft goes in as `indexable: false` and is listed for the
     practitioner's review. Use only what the brief states.
   - Unknown fact → stop and ask. Do not fill with plausible values.
2. **Palette.** Pick `primary`, `onPrimary`, `accent`, `background`,
   `surface`, `text`, `muted`. The generator rejects pairs under 4.5:1 and
   tells you which; adjust lightness, not hue, to keep the brand.
3. **Generate.**
   ```bash
   cd <kit>/templates/next-app && bun install
   bun scripts/create-site.ts --brief <client.json> --out <new-repo> --check
   ```
   Fix every reported problem in `client.json` and rerun; nothing is written
   until the brief validates.
4. **Brand pass in the new repo.** Fonts in `src/app/fonts.ts`; extra blocked
   terms for the specialty in `CLINICAL_TERMS`; extra photos in `public/images/`.
   Then the design pass in `WORKFLOW.md` (Step 0b): `/impeccable init` and
   `document`, then `typeset`, `layout`, `quieter`, `polish`, `audit`. Taste
   Skill, if used, already ran once before this step. Do not vendor either
   skill into the repo, and do not let Taste fetch stock photos or redraw the
   site.
5. **Verify.** `bun run check`, then screenshots at 390px and 1440px of home,
   one service, one location. Confirm every CTA destination against the brief.
6. **Hand-off list.** Services awaiting clinical sign-off, facts still marked
   unknown in the brief, analytics/consent decision, domain and Vercel setup.

## Never

- Copy text, branding or clinical content from another client's site.
- Set `fictional: false` with dummy numbers, or deploy a fictional config
  (the build fails on Vercel production by design).
- Add tracking vendors or put health data in URLs, messages or events.
