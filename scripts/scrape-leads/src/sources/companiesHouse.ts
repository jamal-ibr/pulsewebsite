import { KEYS } from '../config.js';
import type { CompaniesHouseOfficer } from '../types.js';
import { fetchText } from '../utils/http.js';
import { log } from '../utils/logger.js';

/**
 * Companies House public API. Free, but requires a personal API key.
 * https://developer.company-information.service.gov.uk/
 *
 * We use `/search/companies?q=...` to find the practice's limited company,
 * then `/company/{number}/officers` to enumerate active directors. This is
 * our best source for the *legal* owner name, which is often not the same
 * as the website's "principal dentist" entry.
 */
const API = 'https://api.company-information.service.gov.uk';

interface CompanySearchResult {
  items?: Array<{
    title: string;
    company_number: string;
    company_status: string;
    address_snippet?: string;
  }>;
}

interface OfficerList {
  items?: Array<{
    name: string;
    officer_role: string;
    appointed_on?: string;
    resigned_on?: string;
  }>;
}

function authHeader(): Record<string, string> {
  const token = Buffer.from(`${KEYS.companiesHouse}:`).toString('base64');
  return { authorization: `Basic ${token}` };
}

export async function findActiveDirectors(
  practiceName: string,
  postcode?: string,
): Promise<CompaniesHouseOfficer[]> {
  if (!KEYS.companiesHouse) return [];
  try {
    const q = buildSearchQuery(practiceName);
    const searchRes = await fetchText(
      `${API}/search/companies?q=${encodeURIComponent(q)}&items_per_page=10`,
      { headers: authHeader() },
    );
    if (searchRes.status !== 200) {
      log.debug(`companies-house: search HTTP ${searchRes.status}`);
      return [];
    }
    const search = JSON.parse(searchRes.body) as CompanySearchResult;
    const candidates = (search.items ?? [])
      .filter((c) => c.company_status === 'active')
      .filter((c) => matchScore(c, practiceName, postcode) > 0)
      .sort(
        (a, b) =>
          matchScore(b, practiceName, postcode) -
          matchScore(a, practiceName, postcode),
      )
      .slice(0, 2);

    const officers: CompaniesHouseOfficer[] = [];
    for (const c of candidates) {
      const offRes = await fetchText(
        `${API}/company/${c.company_number}/officers?register_view=false`,
        { headers: authHeader() },
      );
      if (offRes.status !== 200) continue;
      const list = JSON.parse(offRes.body) as OfficerList;
      for (const o of list.items ?? []) {
        if (o.resigned_on) continue;
        if (!/director|member|partner/i.test(o.officer_role)) continue;
        officers.push({
          companyNumber: c.company_number,
          companyName: c.title,
          name: reformatChName(o.name),
          role: o.officer_role,
          appointedOn: o.appointed_on,
        });
      }
    }
    return officers;
  } catch (err) {
    log.debug(`companies-house: ${(err as Error).message}`);
    return [];
  }
}

function buildSearchQuery(name: string): string {
  // Strip noise words that hurt match accuracy.
  return name
    .replace(/\b(dental|dentist|dentistry|practice|surgery|clinic|ltd|limited|llp)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchScore(
  c: { title: string; address_snippet?: string },
  practiceName: string,
  postcode?: string,
): number {
  let score = 0;
  const lowerTitle = c.title.toLowerCase();
  const lowerName = practiceName.toLowerCase();
  const keywords = lowerName
    .replace(/\b(dental|dentist|dentistry|practice|surgery|clinic|ltd|limited|llp|the|of)\b/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3);
  for (const k of keywords) if (lowerTitle.includes(k)) score += 2;
  if (postcode && c.address_snippet?.toUpperCase().includes(postcode.toUpperCase())) {
    score += 5;
  }
  if (/dental|dentist|orthodont/i.test(c.title)) score += 1;
  return score;
}

// Companies House returns "SMITH, John Alan" — flip to "John Alan Smith".
function reformatChName(raw: string): string {
  const m = raw.match(/^([A-Z' -]+),\s*(.+)$/);
  if (!m) return raw;
  const surname = m[1]
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
  const rest = m[2].trim();
  return `${rest} ${surname}`.replace(/\s+/g, ' ').trim();
}
