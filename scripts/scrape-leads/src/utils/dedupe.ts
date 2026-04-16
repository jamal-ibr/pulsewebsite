import type { RawPlace } from '../types.js';
import { haversineKm } from './geo.js';

function normaliseName(n: string): string {
  return n
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\b(the|ltd|limited|llp|dental|dentist|dentistry|practice|surgery|clinic|orthodontic|orthodontics|centre|center)\b/g, ' ')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normaliseDomain(u?: string): string | undefined {
  if (!u) return undefined;
  try {
    return new URL(u).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return undefined;
  }
}

/**
 * Merge the multiple source records for the same practice. Matches on:
 *  1. Identical (normalised) domain.
 *  2. Identical postcode + fuzzy name.
 *  3. Within 150m + fuzzy name.
 * Later sources enrich the first; Google's rating/reviews always win.
 */
export function dedupe(places: RawPlace[]): RawPlace[] {
  const merged: RawPlace[] = [];

  for (const p of places) {
    const domain = normaliseDomain(p.website);
    const nName = normaliseName(p.name);
    const match = merged.find((m) => {
      const mDomain = normaliseDomain(m.website);
      if (domain && mDomain && domain === mDomain) return true;
      const mName = normaliseName(m.name);
      const nameHit = nName && mName && (nName === mName || mName.includes(nName) || nName.includes(mName));
      if (!nameHit) return false;
      if (p.postcode && m.postcode && p.postcode.replace(/\s+/g, '') === m.postcode.replace(/\s+/g, '')) {
        return true;
      }
      if (
        p.lat != null && p.lon != null && m.lat != null && m.lon != null &&
        haversineKm({ lat: p.lat, lon: p.lon }, { lat: m.lat, lon: m.lon }) < 0.15
      ) {
        return true;
      }
      return false;
    });
    if (!match) {
      merged.push({ ...p });
      continue;
    }
    // Prefer non-empty fields; always take Google's rating/reviews.
    match.website ??= p.website;
    match.phone ??= p.phone;
    match.address ??= p.address;
    match.postcode ??= p.postcode;
    match.city ??= p.city;
    match.lat ??= p.lat;
    match.lon ??= p.lon;
    if (p.source === 'google' || match.rating == null) {
      match.rating = p.rating ?? match.rating;
      match.reviewCount = p.reviewCount ?? match.reviewCount;
    }
  }
  return merged;
}
