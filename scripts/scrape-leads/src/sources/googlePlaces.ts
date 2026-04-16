import { KEYS } from '../config.js';
import type { RawPlace } from '../types.js';
import { fetchText } from '../utils/http.js';
import { log } from '../utils/logger.js';

/**
 * Optional enrichment via Google Places API v1 (Text Search + Place Details).
 * Requires GOOGLE_PLACES_API_KEY in env. Without a key this is a no-op.
 *
 * We perform *text* searches for each locality/keyword combo because the v1
 * API returns up to 20 results per query and gives us rating / review count
 * — which is the best free-tier signal for popularity.
 */
const TEXT_SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';

const QUERIES: string[] = [
  'Invisalign dentist Birmingham UK',
  'Invisalign provider Birmingham UK',
  'orthodontist Birmingham UK',
  'Invisalign Solihull',
  'Invisalign Sutton Coldfield',
  'Invisalign Edgbaston',
  'Invisalign Harborne',
  'Invisalign Moseley',
  'Invisalign Wolverhampton',
  'Invisalign Dudley',
  'Invisalign Walsall',
  'Invisalign West Bromwich',
  'Invisalign Halesowen',
  'Invisalign Stourbridge',
  'Invisalign Coventry',
  'Invisalign Redditch',
  'Invisalign Bromsgrove',
  'Invisalign Lichfield',
  'Invisalign Tamworth',
  'orthodontist Solihull',
  'orthodontist Coventry',
  'orthodontist Wolverhampton',
];

interface PlacesResponse {
  places?: Array<{
    id: string;
    displayName?: { text: string };
    formattedAddress?: string;
    internationalPhoneNumber?: string;
    nationalPhoneNumber?: string;
    websiteUri?: string;
    rating?: number;
    userRatingCount?: number;
    location?: { latitude: number; longitude: number };
    addressComponents?: Array<{ types: string[]; longText: string }>;
  }>;
}

export async function discoverFromGooglePlaces(): Promise<RawPlace[]> {
  if (!KEYS.googlePlaces) {
    log.warn('google-places: GOOGLE_PLACES_API_KEY not set — skipping');
    return [];
  }
  const out: RawPlace[] = [];
  const seen = new Set<string>();
  for (const q of QUERIES) {
    try {
      const results = await textSearch(q);
      for (const p of results) {
        if (seen.has(p.sourceId!)) continue;
        seen.add(p.sourceId!);
        out.push(p);
      }
      log.info(`google-places: "${q}" -> ${results.length} results`);
    } catch (err) {
      log.warn(`google-places: "${q}" failed: ${(err as Error).message}`);
    }
  }
  log.ok(`google-places: ${out.length} unique places`);
  return out;
}

async function textSearch(query: string): Promise<RawPlace[]> {
  const res = await fetchText(TEXT_SEARCH_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-goog-api-key': KEYS.googlePlaces,
      'x-goog-fieldmask':
        'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.location,places.addressComponents',
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'en-GB',
      regionCode: 'GB',
      maxResultCount: 20,
    }),
  });
  if (res.status !== 200) {
    throw new Error(`HTTP ${res.status}: ${res.body.slice(0, 200)}`);
  }
  const data = JSON.parse(res.body) as PlacesResponse;
  return (data.places ?? []).map((p) => ({
    source: 'google',
    sourceId: p.id,
    name: p.displayName?.text ?? 'Unknown',
    website: p.websiteUri,
    phone: p.nationalPhoneNumber ?? p.internationalPhoneNumber,
    address: p.formattedAddress,
    postcode: extractComponent(p.addressComponents, 'postal_code'),
    city: extractComponent(p.addressComponents, 'postal_town')
      ?? extractComponent(p.addressComponents, 'locality'),
    lat: p.location?.latitude,
    lon: p.location?.longitude,
    rating: p.rating,
    reviewCount: p.userRatingCount,
  }));
}

function extractComponent(
  components: Array<{ types: string[]; longText: string }> | undefined,
  type: string,
): string | undefined {
  return components?.find((c) => c.types.includes(type))?.longText;
}
