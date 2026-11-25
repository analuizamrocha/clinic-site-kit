# Workflow — from empty client repo to a shipping content site

The kit's skills are the *execution* layer. This is the sequence that gets you
there, including where the general-purpose planning skills fit.

## Skill roles

| Skill | Origin | Role here |
|---|---|---|
| `/grill-with-docs` | yours, if installed | Interrogate the brief + generated compliance doc + landing page **before** planning, to surface contradictions and missing facts while they're still cheap |
| `/tlc-spec-driven` | yours | Specify → Design → Tasks → Execute. Owns phasing, atomic tasks, verification criteria, commits, and cross-session memory |
| `clinic-*` | this kit | Domain execution: what a compliant, SEO-and-AEO-correct clinic page actually contains |

They compose: `tlc-spec-driven` decides *when and in what order*, the `clinic-*`
skills decide *what good looks like*. Don't make either one do the other's job.

> If `grill-with-docs` isn't installed in the target repo, skip step 2 — nothing
> downstream depends on it. Its slot is "adversarial Q&A against a document set";
> substitute any equivalent, or do the questioning manually against the brief's
> blockers list.

---

## Step 0 (new site) — Generate from the starter (≈ 1 hour with a complete brief)

The meeting, what to collect, and what to tell the client about the first year
are in [`docs/novo-cliente.md`](docs/novo-cliente.md). The slides are in
[`presentations/novo-cliente`](presentations/novo-cliente/slides.md).

For a client without a site, skip the manual bootstrap: fill the brief, run
`/clinic-compliance-research`, then `/clinic-new-site`. It produces a repo from
`templates/next-app/` that already passes `bun run check`. Step 0b wraps that
generation: Taste, if used, comes before it, and Impeccable comes after it.
Then continue at Step 3.

## Step 0b — Design pass

[Taste Skill](https://www.tasteskill.dev/) and [Impeccable](https://impeccable.style/)
stay installed on the machine. `create-site` does not copy them into the client
repo. Install or update there, not inside the generated site:

```bash
npx skills add Leonxlnx/taste-skill
npx impeccable install
```

Impeccable may already be present at `~/.claude/skills/impeccable`.

1. **Once, before generate, optional.** Taste deals three directions. A person
   picks one. Do not download stock photos in place of the practitioner's
   portrait, and do not run Taste again after the site exists.
2. **Generate** with `/clinic-new-site`. The chosen direction is already the
   palette and the brief.
3. **In the new repo:** `/impeccable init`, then `/impeccable document`. This
   writes `PRODUCT.md` and `DESIGN.md` from the generated site. The brief's
   palette, the fonts, and `AGENTS.md` stay pinned.
4. **Refine only:** `/impeccable typeset`, `layout`, `quieter`, `polish`,
   `audit`. `bolder`, `overdrive` and `delight` wait for an explicit request.

Taste replaces a look. Impeccable keeps `DESIGN.md`. Running both on the same
pass makes them fight. One chooses. The other refines.

## Step 0 (existing repo) — Bootstrap (5 min)

```bash
cd <new-client-repo>
bash <path-to>/clinic-site-kit/install.sh .
```

Copies the skills to `.claude/skills/`, the reference docs to
`docs/clinic-kit/`, and the templates to `docs/`. Then fill
`docs/client-brief.md`.

## Step 1 — Compliance first

```
/clinic-compliance-research
```

**Before any copy exists.** For a dentist this establishes CFO (not CFM) and,
critically, whether before/after imagery is in scope — which changes the page
architecture, not just the wording. Produces `docs/compliance-guidelines.md`.

Doing this first also means the planning steps below can treat compliance
constraints as *inputs* rather than late-stage rework.

## Step 2 — Grill the inputs *(optional)*

```
/grill-with-docs   → docs/client-brief.md, docs/compliance-guidelines.md, the landing page
```

You want it to surface, before a line of code: facts the brief marks UNKNOWN
that are actually blocking; contradictions between what the landing page claims
and what the regulator permits; open compliance questions that gate specific
pages; and services listed in the brief that the practitioner may not actually
perform.

Feed everything it surfaces back into the brief and the compliance doc's §10.

## Step 3 — Specify and design

```
/tlc-spec-driven   → "map codebase", then "specify feature"
```

Give it `METAPROMPT.md` as the feature description and
`docs/clinic-kit/PATTERNS.md` + `SEO-AEO-PLAYBOOK.md` as the design reference.

The metaprompt's Phase 0 audit maps cleanly onto tlc's *Specify*, and its phases
1–8 onto *Design* → *Tasks*. Let tlc own task decomposition and verification
criteria; don't re-derive them by hand.

Approve the plan before execution. This is the last cheap moment to change scope.

## Step 4 — Foundation

```
/clinic-foundation
```

Constants, entity graph, metadata generators, root layout, sitemap, robots +
AI-crawler rules, llms.txt, next.config hardening, guardrail tests.

Verify before moving on: JSON-LD in initial HTML, `/sitemap.xml` `/robots.txt`
`/llms.txt` all resolve, tests green.

## Step 5 — Ownership model

Fill `docs/seo-strategy.md` from `templates/seo-strategy.template.md`. One owner
URL per commercial cluster. Everything after this depends on the table being
right, and it's much cheaper to argue about now than after 20 pages exist.

The ownership table and the subject map are the same decision written two ways.
Build the map with `reference/seo/02-mapa-do-assunto.md` (installed copy:
`docs/clinic-kit/seo/02-mapa-do-assunto.md`; prompt:
`reference/seo/prompts/mapa-do-assunto.md`). On the client repo the filled map
is `docs/mapa-do-assunto.md`, not inside `docs/clinic-kit/` — install replaces
that tree. Questions the practice actually hears belong on the map even when a
keyword tool shows no volume.

## Step 6 — Service pages

```
/clinic-treatment-page   ×N
```

One per service, each clearing the 12-point checklist. These carry the
commercial intent and are where booking conversions come from — build them
before the blog. New clinical text ships `indexable: false`. The page checklist
for the PR is `templates/checklist-pagina-pr.template.md` in the kit and
`docs/checklist-pagina-pr.md` on the client repo.

## Step 7 — Blog infrastructure, then content plan

Blog infra (parsing, routes, schema, image registry) per METAPROMPT Phase 5,
then:

```
/clinic-content-plan
```

This is where you'll be asked **how each post gets written** — you supply the
substance, the agent drafts for your review, or skip. Have an answer ready for
the signature-procedure posts especially; those usually want to be in the
practitioner's own voice.

## Step 8 — Write the launch batch

```
/clinic-blog-post   ×5–8
```

One at a time, each fully finished before the next starts. Drafts follow
`reference/seo/05-conteudo-e-ia.md`: the model assists, a person reviews every
line, and a detector score is not a Google verdict. The prompt
`reference/seo/prompts/auditoria-ia-gptzero.md` is for prioritizing rewrites.
Do not invent a score when there is no API key and the text was not pasted
into the tool.

## Step 9 — Locations, if applicable

METAPROMPT Phase 4. Data-driven, one page per real staffed address.

## Step 10 — Audit and launch

```
/clinic-seo-audit
```

Then the launch checklist: platform-level canonical-host **301** (not 302), GSC
verification + sitemap submission, request indexing on the service pages first,
Lighthouse (90+ / 100 / 100 / 100), a real phone-in-hand pass over the
critical journeys, and an Is Agentic scan of the canonical host:

```bash
npx is-agentic <canonical-host> --json
```

Fix `essential` failures before calling the launch done. The report URL goes
in the handoff. Details and the six-hour snapshot rule are in
`clinic-seo-audit`.

The no-JS HTML spot check is `bun run seo:html` in the starter (see
`reference/seo/04-tecnico.md`). It does not replace this audit or `bun run check`.
Once the canonical host is public, record an AI-visibility baseline with
`reference/seo/08-visibilidade-ia.md` and keep the table in
`docs/visibilidade-ia.md`. The score is an observation, not a promise that a
model will recommend the practice. The kit does not ship a `visibilidade-ia`
skill yet.

## Step 11 — Steady state

- Monthly: `/clinic-seo-audit`, focused on position 4–10 queries — improving
  those beats publishing new posts almost every time. The audit runs
  `npx is-agentic <canonical-host> --json` and compares `score` and
  `scanned_at` with the last handoff. The operational loop (changelog,
  core update, AI-content audit) is `reference/seo/07-medicao.md`.
- After a relevant content or profile change: repeat the AI-visibility test
  and compare per tool, still without promising citations.
- Per new service: `/clinic-treatment-page`
- Per new article: `/clinic-content-plan` (to place it) → `/clinic-blog-post`
- Every 6 months, or on a regulatory change: `/clinic-compliance-research`

---

## Sequencing rules worth not violating

1. **Compliance before copy.** For dentistry it determines whether a whole page
   type (case galleries) exists.
2. **Ownership table before pages.** Retrofitting it means consolidating live
   URLs and eating redirects.
3. **Service pages before blog posts.** Posts link *up* to owners; the owners
   have to exist.
4. **Foundation before everything.** Every page imports the constants and the
   metadata generators.
5. **One post finished at a time.** Half-written posts break the discovery test.

## Porting improvements back

When something proves out on a client site — a schema shape, a better FAQ
pattern, a regulator quirk worth generalizing — port it back into the kit rather
than leaving it in one client's repo. The kit is the asset; the client sites are
instances of it.
