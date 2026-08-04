# Regulator seeds

**Starting points for research, not answers.** Every entry must be re-verified
against the council's current site before it reaches a generated compliance doc.
Councils rename, merge, get overruled by competition authorities, and rewrite
their advertising chapters. An unverified seed is a hypothesis.

Format: what to search for, where the primary source lives, and what's known to
be distinctive about that profession's rules.

---

## Brazil — federal councils

Brazilian professional councils follow a `CF<X>` (federal) / `CR<X>` (regional,
per state) structure. The regional council can add rules on top of the federal
ones, so always check both — e.g. a practice in Paraná is governed by CFO *and*
CRO-PR.

| Profession | Council | Primary source | Registration format |
|---|---|---|---|
| Medicine | CFM | portal.cfm.org.br | `CRM-<UF> <number>` + `RQE <number>` for specialists |
| Dentistry | CFO | website.cfo.org.br | `CRO-<UF> <number>` |
| Psychology | CFP | cfp.org.br | `CRP <region>/<number>` |
| Nutrition | CFN | cfn.org.br | `CRN-<region> <number>` |
| Physiotherapy | COFFITO | coffito.gov.br | `CREFITO-<region>/<number>` |
| Veterinary | CFMV | cfmv.gov.br | `CRMV-<UF> <number>` |
| Nursing | COFEN | cofen.gov.br | `COREN-<UF> <number>` |
| Pharmacy | CFF | cff.org.br | `CRF-<UF> <number>` |

Cross-cutting layers that apply **on top of** any council's rules in Brazil:

- **CDC** (Código de Defesa do Consumidor) — consumer protection
- **LGPD** — anything patient-identifiable
- **CONAR** — advertising self-regulation
- **CADE** — competition authority; has struck down council advertising
  restrictions, notably against CFO on pricing/promotions

### Medicine (CFM) — known posture

Restrictive. Resolution 2.336/2023 governs medical advertising (in force since
March 2024). Distinctive: heavy restrictions on before/after imagery,
testimonial limits, prohibition on guaranteed results and superiority claims,
mandatory CRM + RQE identification.

A full worked example of a CFM-derived compliance doc lives at
`../../../reference/compliance-examples/cfm-brazil-medicine.md`. **Use it as a
format reference for medicine only** — its specific rules do not transfer to
other professions.

### Dentistry (CFO) — known posture, verified 2026-08-03

Materially different from CFM. Anchors to start from — **all require
re-verification, this area is actively in flux**:

- **Código de Ética Odontológica** — the base code, chapter on
  "do Anúncio, da Propaganda e da Publicidade"
- **Resolução CFO-196/2019** — `website.cfo.org.br/resolucao-cfo-196-2019/`
  Authorizes disclosure of selfies and of images showing diagnosis and final
  results of dental treatment, conditioned on prior patient authorization via
  **TCLE** (Termo de Consentimento Livre e Esclarecido). Prohibits images
  allowing identification of equipment, instruments, materials and biological
  tissues. Expressly prohibits video/images showing procedures *in progress*
  except in scientific publications. Non-compliant image disclosure is
  classified as a **serious** ethical infraction.
- **Resolução CFO-SEC-271/2025** — published June 2025, amending the code
  following a **CADE** decision.
- **DECISÃO CFO-05-2025** — instituted a special group to study and propose
  amendments to the advertising chapter. **The chapter is being rewritten.**

⚠️ **Known contradiction to resolve, do not silently pick a side.** Sources
disagree on whether dentists may now publish prices, discounts and promotions
post-CADE. Some report new freedom to disclose discounts and promotions subject
to ethics and consumer law; others still describe disclosure of values,
promotions, instalments and "combo" offers as prohibited. Resolve this against
the current primary text, and if it remains ambiguous, escalate to the client's
professional or legal counsel rather than deciding for them.

**Delta vs. medicine that most affects a website build:** before/after galleries
are potentially *in scope* for dentistry with proper TCLE — which changes the
page architecture (you may need a consent-tracked case gallery, image
provenance metadata, and a consent register), whereas for medicine you would
generally design that surface away entirely.

---

## Other jurisdictions — where to start

| Jurisdiction | Bodies to check |
|---|---|
| United States | State medical/dental board (licensure + advertising), FTC (truth in advertising, endorsements), HIPAA (patient data), state-specific telehealth rules |
| United Kingdom | GMC (doctors), GDC (dentists), ASA/CAP Code (advertising), ICO (UK GDPR) |
| European Union | National competent authority per profession, plus GDPR, plus national advertising codes |
| Portugal | Ordem dos Médicos / Ordem dos Médicos Dentistas, ERS, CNPD |
| Canada | Provincial college (CPSO, RCDSO, etc.) — provincial, not federal |
| Australia | AHPRA National Law advertising guidelines — unusually explicit about testimonials |

Common invariants across essentially every jurisdiction, safe as a working
default *until* research says otherwise:

1. Mandatory professional identification with a registration number
2. No guaranteed outcomes
3. No superiority claims over named or implied colleagues
4. No sensationalism or fear-based hooks
5. No identifiable patient data without documented consent
6. Claims must be supportable by mainstream professional literature

The differences between jurisdictions are almost always about **imagery,
testimonials, and pricing**. Research those three hardest.
