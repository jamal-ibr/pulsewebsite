import fs from 'node:fs';
import path from 'node:path';

// Walk up from CWD until we find the repo's package.json. This keeps the
// output path correct whether the scraper is run via tsx from source or
// via node from a compiled build.
function findRepoRoot(start: string): string {
  let dir = start;
  while (dir !== path.parse(dir).root) {
    if (fs.existsSync(path.join(dir, 'package.json')) &&
        fs.existsSync(path.join(dir, 'next.config.ts'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return start;
}

export const ROOT = process.env.PULSE_REPO_ROOT ?? findRepoRoot(process.cwd());
export const OUT_DIR = process.env.LEADS_OUT_DIR ?? path.join(ROOT, 'data', 'leads');

// Birmingham city centre (Victoria Square / New Street).
export const BIRMINGHAM_CENTRE = { lat: 52.4800, lon: -1.9025 };

// West Midlands bounding box: covers Birmingham, Solihull, Wolverhampton,
// Dudley, Walsall, West Bromwich, Sutton Coldfield, Coventry, Redditch,
// Bromsgrove, Cannock, Lichfield, Tamworth.
export const WEST_MIDLANDS_BBOX = {
  south: 52.15,
  west: -2.45,
  north: 52.78,
  east: -1.30,
};

export const TARGET_LEADS = Number(process.env.TARGET_LEADS ?? 200);

export const USER_AGENT =
  process.env.SCRAPER_USER_AGENT ??
  'PulseLeadResearchBot/0.1 (+contact: ops@pulse.agency; respects robots.txt)';

export const HTTP = {
  timeoutMs: 15_000,
  maxBytes: 2_500_000,
  concurrency: Number(process.env.SCRAPE_CONCURRENCY ?? 6),
  delayMs: Number(process.env.SCRAPE_DELAY_MS ?? 400),
};

export const KEYS = {
  googlePlaces: process.env.GOOGLE_PLACES_API_KEY ?? '',
  companiesHouse: process.env.COMPANIES_HOUSE_API_KEY ?? '',
};

// Paths on a typical UK dental practice website worth visiting for contact
// details, team bios, and service pages that confirm Invisalign provision.
export const EXTRA_PATHS = [
  '/contact',
  '/contact-us',
  '/contact.html',
  '/about',
  '/about-us',
  '/team',
  '/meet-the-team',
  '/our-team',
  '/staff',
  '/dentists',
  '/invisalign',
  '/treatments/invisalign',
  '/services/invisalign',
];
