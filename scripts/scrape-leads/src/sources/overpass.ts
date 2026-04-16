import { WEST_MIDLANDS_BBOX } from '../config.js';
import type { RawPlace } from '../types.js';
import { fetchText } from '../utils/http.js';
import { log } from '../utils/logger.js';

/**
 * Query OpenStreetMap via the Overpass API for dental / orthodontic practices
 * in the West Midlands. OSM is free, open, and widely used for POI discovery.
 *
 * Returns raw practice records. Invisalign filtering happens later via the
 * website scrape — OSM tags rarely list specific brand treatments.
 */
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
];

interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

export async function discoverFromOverpass(): Promise<RawPlace[]> {
  const { south, west, north, east } = WEST_MIDLANDS_BBOX;
  const bbox = `${south},${west},${north},${east}`;

  // Dentists, orthodontists, and any healthcare place with an orthodontics
  // speciality. Trailing `out center;` ensures ways/relations get a centroid.
  const query = `
    [out:json][timeout:60];
    (
      node["healthcare"="dentist"](${bbox});
      way["healthcare"="dentist"](${bbox});
      node["amenity"="dentist"](${bbox});
      way["amenity"="dentist"](${bbox});
      node["healthcare"="orthodontist"](${bbox});
      way["healthcare"="orthodontist"](${bbox});
      node["healthcare:speciality"~"ortho",i](${bbox});
      way["healthcare:speciality"~"ortho",i](${bbox});
    );
    out center tags;
  `.trim();

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      log.info(`overpass: querying ${endpoint}`);
      const res = await fetchText(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (res.status !== 200) {
        log.warn(`overpass: ${endpoint} -> HTTP ${res.status}`);
        continue;
      }
      const data = JSON.parse(res.body) as { elements: OverpassElement[] };
      const places = data.elements
        .map((el) => elementToPlace(el))
        .filter((p): p is RawPlace => !!p);
      log.ok(`overpass: ${places.length} raw POIs`);
      return places;
    } catch (err) {
      log.warn(`overpass: ${endpoint} failed: ${(err as Error).message}`);
    }
  }
  log.error('overpass: all endpoints failed');
  return [];
}

function elementToPlace(el: OverpassElement): RawPlace | null {
  const t = el.tags ?? {};
  const name = t.name ?? t['operator'] ?? t['brand'];
  if (!name) return null;
  const lat = el.lat ?? el.center?.lat;
  const lon = el.lon ?? el.center?.lon;

  const addrParts = [
    t['addr:housename'],
    [t['addr:housenumber'], t['addr:street']].filter(Boolean).join(' '),
    t['addr:suburb'] ?? t['addr:hamlet'],
    t['addr:city'] ?? t['addr:town'] ?? t['addr:village'],
    t['addr:postcode'],
  ].filter(Boolean);

  return {
    source: 'overpass',
    sourceId: `${el.type}/${el.id}`,
    name: cleanName(name),
    website: cleanUrl(t.website ?? t['contact:website'] ?? t.url),
    phone: t.phone ?? t['contact:phone'],
    address: addrParts.length ? addrParts.join(', ') : undefined,
    postcode: t['addr:postcode'],
    city: t['addr:city'] ?? t['addr:town'] ?? t['addr:village'],
    lat,
    lon,
  };
}

function cleanName(n: string): string {
  return n.replace(/\s+/g, ' ').trim();
}

function cleanUrl(u?: string): string | undefined {
  if (!u) return undefined;
  const trimmed = u.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
