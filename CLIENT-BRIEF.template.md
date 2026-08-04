# Client Brief — <Client Name>

> Save the filled version as `docs/client-brief.md` in the new client's repo.
> The build agent treats every blank here as a hard blocker and will refuse to
> invent it. Anything genuinely unknown: write `UNKNOWN` rather than deleting the
> line, so it shows up in the blocker list.

## 1. Practitioner identity

| Field | Value |
|---|---|
| Full professional name | |
| Abbreviated name (headers/footers) | |
| Short/informal name | |
| Specialty (exact, as registered) | |
| Secondary specialties | |
| Medical council registration (e.g. CRM-PR 45351) | |
| Specialist qualification number (e.g. RQE 36221) | |
| Council name + URL (for `recognizedBy` in schema) | |
| Pronouns to use in copy | |

## 2. Credentials → schema `Physician` node

These are the E-E-A-T payload. Be specific; vague entries are worse than none.

| Field | Value |
|---|---|
| Medical school (`alumniOf`) | |
| Residency institution(s) + specialty each | |
| Fellowship(s) + institution + country | |
| Professional society memberships (`memberOf`) | |
| Notable certifications | |
| Languages of practice | |

## 3. Site & brand

| Field | Value |
|---|---|
| Canonical URL (**decide www vs non-www now**) | |
| Site language / locale (e.g. `pt-BR`) | |
| Brand positioning line (the h1 promise) | |
| Tone: 3 adjectives | |
| Existing design tokens — where do they live? | |
| Logo / OG image asset + **exact pixel dimensions** | |
| Google Search Console verification token | |

## 4. Contact & conversion

| Field | Value |
|---|---|
| Primary conversion action (WhatsApp / form / phone / booking tool) | |
| Scheduling WhatsApp number (E.164) | |
| Scheduling number, display format | |
| Pre-filled WhatsApp message text | |
| Secondary phone / email | |
| Instagram URL + handle | |
| LinkedIn / other socials | |
| Analytics: GA4 ID / GTM ID | |

## 5. Locations — repeat this block per address

| Field | Value |
|---|---|
| Clinic name | |
| Street address | |
| Neighbourhood | |
| City / State / Country | |
| Postal code | |
| Latitude, Longitude (from Google Maps, 6 decimals) | |
| Phone (display + E.164) | |
| WhatsApp (if different) | |
| Google Maps share URL | |
| Opening hours, schema.org format (`Mo-Fr 08:00-19:30`) | |
| Opening hours, display format | |
| What happens *here specifically* (consults? procedures? exams?) | |
| Clinic's own website | |

## 6. Services / treatments — the page-ownership seed

One row per service that deserves its own URL. A service earns a URL when
patients search for it by name *and* it's something the practitioner actually
performs. Everything else is a section on a hub page or a blog post.

| Service (patient-facing name) | URL slug | Category (Clinical / Surgical / Preventive) | One-line description | Search intent worth owning? |
|---|---|---|---|---|
| | | | | |

For each service, also collect:
- 3–6 real patient FAQs (question + a sober, accurate answer)
- The 3–5 keywords it should own, with the city where local intent applies
- Any image asset available, with exact dimensions
- Contraindications / "when this is NOT indicated" — patients search this and
  competitors never write it

## 7. Content strategy inputs

| Field | Value |
|---|---|
| Primary city/region for local SEO | |
| Secondary cities worth targeting | |
| Target audiences (patients / referring physicians / general public) | |
| Top 10 questions patients actually ask in consultation | |
| Existing content to migrate (URLs) | |
| Existing URLs that must keep working (→ 301 redirects) | |
| Competitor sites to review (not copy) | |
| Keyword research available? (source + file) | |

## 8. Compliance

| Field | Value |
|---|---|
| Regulator + governing resolution | |
| Required identification block, exact wording | |
| Standard educational disclaimer, exact wording | |
| Are patient testimonials in scope? Under what limits? | |
| Are before/after images in scope? Consent status? | |
| Privacy law in scope (LGPD / GDPR / …) | |
| Who signs off on medical accuracy, and how fast? | |

## 9. Scope of this engagement

| Field | Value |
|---|---|
| What's already built | |
| What this package covers | |
| Explicitly out of scope | |
| Deadline / launch date | |
| Who reviews before publish | |
