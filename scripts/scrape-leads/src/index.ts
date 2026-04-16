import fs from 'node:fs/promises';
import path from 'node:path';
import pLimit from 'p-limit';

import {
  BIRMINGHAM_CENTRE,
  HTTP,
  OUT_DIR,
  TARGET_LEADS,
} from './config.js';
import { discoverFromGooglePlaces } from './sources/googlePlaces.js';
import { discoverFromNhs } from './sources/nhs.js';
import { discoverFromOverpass } from './sources/overpass.js';
import { findActiveDirectors } from './sources/companiesHouse.js';
import { scrapeWebsite } from './scraper/website.js';
import type { Lead, OwnerCandidate, RawPlace } from './types.js';
import { toCsv } from './utils/csv.js';
import { dedupe } from './utils/dedupe.js';
import { haversineKm } from './utils/geo.js';
import { log } from './utils/logger.js';
import { computeScores } from './utils/score.js';

async function main() {
  const started = Date.now();
  log.info('=== Pulse orthodontic-lead scraper ===');

  // 1. Discovery — fan out across free/paid sources in parallel.
  log.info('phase 1: discovery');
  const [overpass, google, nhs] = await Promise.all([
    discoverFromOverpass().catch((e) => {
      log.error(`overpass failed: ${e.message}`);
      return [] as RawPlace[];
    }),
    discoverFromGooglePlaces().catch((e) => {
      log.error(`google-places failed: ${e.message}`);
      return [] as RawPlace[];
    }),
    discoverFromNhs().catch((e) => {
      log.error(`nhs failed: ${e.message}`);
      return [] as RawPlace[];
    }),
  ]);
  log.ok(
    `discovery: ${overpass.length} overpass + ${google.length} google + ${nhs.length} nhs = ${overpass.length + google.length + nhs.length} raw`,
  );

  // 2. Dedupe across sources.
  const merged = dedupe([...google, ...overpass, ...nhs]);
  log.ok(`dedupe: ${merged.length} unique practices`);

  // 3. Website scrape (concurrent, rate-limited).
  log.info('phase 2: website scrape');
  const limit = pLimit(HTTP.concurrency);
  const leads: Lead[] = [];
  let scraped = 0;
  await Promise.all(
    merged.map((place) =>
      limit(async () => {
        scraped++;
        if (scraped % 25 === 0) {
          log.info(`scraping ${scraped}/${merged.length}…`);
        }
        const lead = await buildLead(place);
        if (lead) leads.push(lead);
      }),
    ),
  );
  log.ok(`scrape: ${leads.length} practices returned contact data`);

  // 4. Filter — must mention Invisalign, must have at least one reach.
  const invisalignLeads = leads.filter(
    (l) =>
      l.invisalignMentions > 0 &&
      (l.phones.length > 0 || l.emails.length > 0),
  );
  log.ok(`filter: ${invisalignLeads.length} Invisalign-offering practices`);

  // 5. Companies House enrichment for the top-scoring candidates only
  //    (API has rate limits — don't burn it on low-ranked records).
  const ranked = invisalignLeads
    .map(computeScores)
    .sort((a, b) => b.score - a.score);

  const enrichCount = Math.min(ranked.length, TARGET_LEADS + 50);
  log.info(`phase 3: Companies House enrichment (top ${enrichCount})`);
  const chLimit = pLimit(2);
  await Promise.all(
    ranked.slice(0, enrichCount).map((lead) =>
      chLimit(async () => {
        if (lead.ownerName) return;
        const officers = await findActiveDirectors(
          lead.practiceName,
          lead.postcode,
        );
        if (officers.length) {
          const primary = officers[0];
          lead.ownerName = primary.name;
          lead.ownerRole = primary.role ?? 'Director';
          lead.ownerSource = 'companies-house';
          lead.notes.push(`CH: ${primary.companyName} (${primary.companyNumber})`);
          if (officers.length > 1) {
            lead.notes.push(
              `other directors: ${officers
                .slice(1, 4)
                .map((o) => o.name)
                .join('; ')}`,
            );
          }
        }
      }),
    ),
  );

  // 6. Final cut — top TARGET_LEADS.
  const final = ranked.slice(0, TARGET_LEADS).map((l, i) => ({
    ...l,
    rank: i + 1,
  }));

  // 7. Write outputs.
  await fs.mkdir(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const baseName = `orthodontic-leads-${stamp}`;
  const jsonPath = path.join(OUT_DIR, `${baseName}.json`);
  const csvPath = path.join(OUT_DIR, `${baseName}.csv`);
  const latestJson = path.join(OUT_DIR, 'orthodontic-leads.json');
  const latestCsv = path.join(OUT_DIR, 'orthodontic-leads.csv');

  const summary = {
    generatedAt: new Date().toISOString(),
    target: TARGET_LEADS,
    delivered: final.length,
    totals: {
      rawOverpass: overpass.length,
      rawGoogle: google.length,
      rawNhs: nhs.length,
      deduped: merged.length,
      scraped: leads.length,
      invisalignFiltered: invisalignLeads.length,
    },
    leads: final,
  };

  await fs.writeFile(jsonPath, JSON.stringify(summary, null, 2));
  await fs.writeFile(csvPath, toCsv(final));
  await fs.writeFile(latestJson, JSON.stringify(summary, null, 2));
  await fs.writeFile(latestCsv, toCsv(final));

  const mins = ((Date.now() - started) / 60_000).toFixed(1);
  log.ok(
    `done in ${mins}m — ${final.length} leads -> ${csvPath}`,
  );
  if (final.length < TARGET_LEADS) {
    log.warn(
      `Only ${final.length}/${TARGET_LEADS} leads found. To get more: set GOOGLE_PLACES_API_KEY, widen WEST_MIDLANDS_BBOX in config.ts, or lower the Invisalign-mention threshold.`,
    );
  }
}

async function buildLead(place: RawPlace): Promise<Lead | null> {
  const notes: string[] = [];
  let findings;
  if (place.website) {
    findings = await scrapeWebsite(place.website);
    if (findings.error) notes.push(`scrape: ${findings.error}`);
  }

  const phones = new Set<string>();
  if (place.phone) phones.add(place.phone.replace(/\s+/g, ' ').trim());
  for (const p of findings?.phones ?? []) phones.add(p);

  const emails = findings?.emails ?? [];
  const invisalignMentions = findings?.invisalignMentions ?? 0;
  const postcode = place.postcode ?? findings?.postcode;

  const owners: OwnerCandidate[] = findings?.owners ?? [];
  const primaryOwner = owners[0];

  let distanceKm = 0;
  if (place.lat != null && place.lon != null) {
    distanceKm = haversineKm(
      { lat: place.lat, lon: place.lon },
      BIRMINGHAM_CENTRE,
    );
  } else {
    // Unknown lat/lon — assume edge of West Midlands so it ranks below
    // geocoded practices of equal popularity.
    distanceKm = 25;
    notes.push('no coordinates — proximity estimated');
  }

  const sources = new Set<string>([place.source]);
  if (place.website) sources.add('website');

  const lead: Lead = {
    practiceName: place.name,
    ownerName: primaryOwner?.name,
    ownerRole: primaryOwner?.role,
    ownerSource: primaryOwner ? 'website' : undefined,
    phones: [...phones],
    primaryPhone: [...phones][0],
    emails,
    primaryEmail: emails[0],
    website: place.website,
    address: place.address,
    postcode,
    city: place.city,
    lat: place.lat,
    lon: place.lon,
    rating: place.rating,
    reviewCount: place.reviewCount,
    invisalignMentions,
    distanceKmFromBham: distanceKm,
    popularityScore: 0,
    proximityScore: 0,
    invisalignScore: 0,
    score: 0,
    sources: [...sources],
    notes,
  };
  return lead;
}

main().catch((err) => {
  log.error(`fatal: ${err.stack ?? err.message}`);
  process.exit(1);
});
