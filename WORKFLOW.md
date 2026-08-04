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

## Step 0 — Bootstrap (5 min)

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

## Step 6 — Service pages

```
/clinic-treatment-page   ×N
```

One per service, each clearing the 12-point checklist. These carry the
commercial intent and are where booking conversions come from — build them
before the blog.

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

One at a time, each fully finished before the next starts.

## Step 9 — Locations, if applicable

METAPROMPT Phase 4. Data-driven, one page per real staffed address.

## Step 10 — Audit and launch

```
/clinic-seo-audit
```

Then the launch checklist: platform-level canonical-host **301** (not 302), GSC
verification + sitemap submission, request indexing on the service pages first,
Lighthouse (90+ / 100 / 100 / 100), and a real phone-in-hand pass over the
critical journeys.

## Step 11 — Steady state

- Monthly: `/clinic-seo-audit`, focused on position 4–10 queries — improving
  those beats publishing new posts almost every time
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
