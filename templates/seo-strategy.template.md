# SEO Strategy — <Practice Name>

**Site:** <canonical URL — decide www vs non-www here, once>
**Primary market:** <city, region>
**Last updated:** <YYYY-MM-DD>

## Page ownership model

Exactly one owner URL per intent cluster. This table is architecture, not a
suggestion — change ownership only after checking Search Console queries and
which URLs actually rank.

| Cluster | Owner URL | Intent | Supporting content role |
|---|---|---|---|
| Broad local specialty | `/` | local + brand | Explain the practice, route to the right service |
| Service discovery | `/<services>` | commercial, broad | Organize the portfolio; never compete with children |
| <Condition A> | `/<services>/<slug>` | commercial | Own consultation + treatment intent; posts answer symptom and comparison questions |
| <Location A> | `/<locations>/<slug>` | local | Own "<specialty> in <area>" |

## Rules this table enforces

1. Commercial and local intent live on service or location pages, never on posts.
2. Informational intent lives on posts, which link **up** to their owner page.
3. Two URLs never target the same intent. When they would: update, differentiate,
   or consolidate — don't create the second URL.
4. Index pages organize; they don't compete with their own children.
5. One page per real, staffed address. No per-neighbourhood doorway pages.

## Known overlap areas

Topics where near-duplicate content is likely and every new URL needs extra
scrutiny:

- <e.g. procedure X vs procedure Y comparisons>
- <e.g. general prevention/hygiene advice>

## Baseline

Point-in-time measurement, not a promise. Re-measure monthly.

| Metric | Value | Date |
|---|---|---|
| Tracked queries | | |
| Top 3 | | |
| Top 10 | | |
| Published posts | | |
| Service pages | | |

Data sources available: <Search Console / ranking tool / analytics / none yet>.
Note explicitly what is **not** available — attribution claims without it are
guesses.

## Measurement loop — monthly

| Signal | Action |
|---|---|
| High impressions, low CTR | Test title/description, preserving accuracy |
| Position 4–10 | Improve intent match, depth, internal links — **highest ROI** |
| Wrong URL ranking | Fix ownership / cannibalization |
| Ranking but no bookings | Fix the journey and CTA relevance, not the ranking |
| No real demand | Don't publish just because a tracker has the keyword |

Protect page-one positions before chasing new ones. The success metric is booked
consultations, not keyword count.

## Compliance constraint

All content is subject to `docs/compliance-guidelines.md`. No page promises
outcomes, implies superiority, or uses fear to earn clicks — which is also what
the ranking and answer-engine systems reward.

## Validation

```bash
<pm> run test:run -- tests/content-discovery.test.ts tests/mdx-image-dimensions.test.ts tests/seo-metadata.test.ts
<pm> run lint && <pm> run build
```
