import * as cheerio from 'cheerio';
import type { RawPlace } from '../types.js';
import { fetchText, sleep } from '../utils/http.js';
import { log } from '../utils/logger.js';

/**
 * NHS "Find a dentist" directory search. Public directory, SSR HTML, no API.
 * We search by a set of West Midlands town names / postcodes and parse the
 * result cards. Most NHS-listed practices also offer private treatment
 * (Invisalign) — this gives us breadth for the website scrape phase.
 */
const NHS_SEARCH = 'https://www.nhs.uk/service-search/find-a-dentist/results/';

const AREAS: string[] = [
  'Birmingham',
  'Edgbaston',
  'Harborne',
  'Moseley',
  'Kings Heath',
  'Sutton Coldfield',
  'Solihull',
  'Shirley',
  'Wolverhampton',
  'Dudley',
  'Walsall',
  'West Bromwich',
  'Halesowen',
  'Stourbridge',
  'Coventry',
  'Redditch',
  'Bromsgrove',
  'Lichfield',
  'Tamworth',
];

export async function discoverFromNhs(): Promise<RawPlace[]> {
  const out: RawPlace[] = [];
  const seenNames = new Set<string>();

  for (const area of AREAS) {
    try {
      const url = `${NHS_SEARCH}?location=${encodeURIComponent(area)}&distance=5`;
      const res = await fetchText(url);
      if (res.status !== 200) {
        log.warn(`nhs: ${area} -> HTTP ${res.status}`);
        continue;
      }
      const parsed = parseNhsResults(res.body);
      let added = 0;
      for (const p of parsed) {
        const key = `${p.name}|${p.postcode ?? ''}`.toLowerCase();
        if (seenNames.has(key)) continue;
        seenNames.add(key);
        out.push(p);
        added++;
      }
      log.info(`nhs: ${area} -> ${parsed.length} results (${added} new)`);
      await sleep(250);
    } catch (err) {
      log.warn(`nhs: ${area} failed: ${(err as Error).message}`);
    }
  }
  log.ok(`nhs: ${out.length} unique places`);
  return out;
}

function parseNhsResults(html: string): RawPlace[] {
  const $ = cheerio.load(html);
  const out: RawPlace[] = [];
  // NHS uses a repeating "results__card" list; selectors have changed over
  // time, so we cast a wide net then validate each candidate.
  $('[data-test-id*="result"], .results__card, li.results__list-item, article')
    .each((_, el) => {
      const $el = $(el);
      const name = $el
        .find('h2, h3, [data-test-id*="title"], a.nhsuk-u-font-weight-bold')
        .first()
        .text()
        .trim();
      if (!name) return;
      const text = $el.text().replace(/\s+/g, ' ').trim();
      const postcode = matchUkPostcode(text);
      const phone = matchUkPhone(text);
      const link = $el.find('a[href*="find-a-dentist"]').first().attr('href');
      if (!/dentist|orthodont/i.test(name) && !/dentist|orthodont/i.test(text)) {
        return;
      }
      out.push({
        source: 'nhs',
        sourceId: link,
        name: name.replace(/\s+/g, ' ').trim(),
        phone,
        address: text.split(name).pop()?.trim().slice(0, 300),
        postcode,
      });
    });
  return out;
}

function matchUkPostcode(s: string): string | undefined {
  const m = s.match(/\b[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}\b/);
  return m ? m[0].toUpperCase() : undefined;
}

function matchUkPhone(s: string): string | undefined {
  const m = s.match(/(?:\(?0\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4})/);
  return m?.[0];
}
