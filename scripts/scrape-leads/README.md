# Pulse — Orthodontic / Invisalign Lead Scraper

A pipeline that discovers Invisalign-providing dental & orthodontic practices
across Birmingham and the West Midlands, enriches them with owner / director
names, and ranks the list by **popularity × proximity** to Birmingham city
centre.

Output: up to 200 leads with `practiceName`, `ownerName`, `primaryPhone`,
`primaryEmail`, `website`, `address`, `rating`, `reviewCount`, composite
`score`, and the sources each record was derived from.

---

## Quick start

```bash
npm install
npm run scrape:leads
```

Outputs are written to:

- `data/leads/orthodontic-leads.csv` (canonical, overwritten each run)
- `data/leads/orthodontic-leads.json` (same, with run metadata)
- `data/leads/orthodontic-leads-<timestamp>.{csv,json}` (archived copy)

A run with no API keys relies on OpenStreetMap (Overpass) + the NHS directory +
direct website scraping. Expect ~60–120 usable leads in that mode. To reach
the full 200 and get rating / review data, provide:

```bash
export GOOGLE_PLACES_API_KEY=...        # Places API (New) — Text Search
export COMPANIES_HOUSE_API_KEY=...      # https://developer.company-information.service.gov.uk/
npm run scrape:leads
```

Tunable env vars:

| Var | Default | Purpose |
|---|---|---|
| `TARGET_LEADS` | `200` | Max rows emitted |
| `SCRAPE_CONCURRENCY` | `6` | Parallel website fetches |
| `SCRAPE_DELAY_MS` | `400` | Delay between fetches per worker |
| `SCRAPER_USER_AGENT` | Pulse bot UA | Sent with every request |
| `DEBUG` | unset | Verbose per-URL logs |

---

## How it works

```
 ┌─── Overpass (OSM) ────┐
 │    dentist / ortho    │
 ├─── Google Places ─────┤──► dedupe ──► website scrape ──► filter
 │    Invisalign queries │                (emails,            (must mention
 └─── NHS find-a-dentist ┘                 phones,             Invisalign)
                                            owner,                │
                                            Invisalign hits)       ▼
                                                               Companies
                                                                House
                                                             enrichment
                                                                  │
                                                                  ▼
                                                          score + rank
                                                          (popularity ×
                                                           proximity ×
                                                           invisalign)
                                                                  │
                                                                  ▼
                                                          CSV + JSON
```

### Scoring

```
popularity = rating × log10(reviewCount + 10)
proximity  = 10 / (1 + km_from_birmingham_centre)
invisalign = 1 + min(mentions, 20) / 20
score      = popularity × proximity × invisalign
```

Practices without a Google rating default to `3.5`. Anything without at least
one `invisalign` mention on its own site is filtered out before ranking.

### Owner / decision-maker resolution

For each practice we look for both:

1. **Website signals** — “Principal Dentist”, “Practice Owner”, “Clinical
   Director”, “Founder”, etc., paired with a `Dr / Mr / Mrs …` name.
2. **Companies House** (if API key provided) — active directors of the
   matching limited company, filtered by practice name keywords + postcode.

The website-derived owner wins when present (it's the person you actually
want to speak to); Companies House fills the gap when a site is vague.

---

## Legal & compliance notes — read before you dial

This tool gathers **publicly published business contact information**. That
is generally fine for B2B cold outreach, but *you* are responsible for
complying with the rules below. The code will not do this for you.

- **PECR — telephone calls (UK):** before calling any number in the list,
  screen it against the **TPS** (and **CTPS** for corporate subscribers).
  Calling a TPS/CTPS-registered number is a regulatory offence. See
  <https://www.tpsonline.org.uk/>.
- **PECR — marketing email:** B2B email to a *corporate subscriber* (limited
  company, LLP, etc.) does **not** require prior consent, but must contain a
  working opt-out and identify the sender. Sole traders & partnerships are
  treated as individuals and **do** require consent — keep that in mind for
  small practices.
- **UK GDPR:** you are processing personal data (the owner's name and work
  email/phone). Your lawful basis is typically *legitimate interest*; document
  a Legitimate Interests Assessment, keep a suppression list, and honour
  objections / erasure requests promptly.
- **robots.txt & rate limits:** the scraper uses a clearly identified user
  agent, delays requests, caps response size, and never bypasses auth. Don't
  raise `SCRAPE_CONCURRENCY` to antisocial levels.
- **Accuracy:** regex-based extraction is best-effort. Always sense-check a
  row before using it — especially the `ownerName`, which can false-positive
  on associate dentists mentioned alongside an owner role.

If you're unsure whether a specific source or use case is permitted, ask a
solicitor rather than me.

---

## Repo layout

```
scripts/scrape-leads/
├── README.md                ← you are here
├── tsconfig.json
└── src/
    ├── index.ts             ← orchestrator
    ├── types.ts
    ├── config.ts
    ├── sources/
    │   ├── overpass.ts      ← OSM dentist / orthodontist POIs
    │   ├── googlePlaces.ts  ← Google Places v1 Text Search
    │   ├── nhs.ts           ← NHS find-a-dentist directory
    │   └── companiesHouse.ts← director / owner enrichment
    ├── scraper/
    │   ├── website.ts       ← crawls homepage + /contact etc.
    │   └── contacts.ts      ← pure email / phone / owner extractors
    └── utils/
        ├── http.ts          ← fetch with timeout + byte cap
        ├── geo.ts           ← haversine
        ├── dedupe.ts        ← cross-source merge
        ├── score.ts         ← popularity × proximity × invisalign
        ├── csv.ts           ← CSV writer
        └── logger.ts
```

---

## Extending

- **Widen the catchment area:** edit `WEST_MIDLANDS_BBOX` in
  `src/config.ts`, or add more town queries to `sources/nhs.ts` /
  `sources/googlePlaces.ts`.
- **Add a source:** implement a function returning `RawPlace[]` and call it
  from `src/index.ts` before `dedupe(...)`.
- **Tighten or relax the Invisalign filter:** the check lives in
  `src/index.ts` just after the scrape phase (`l.invisalignMentions > 0`).
- **Change ranking:** formulas live in `src/utils/score.ts`.
