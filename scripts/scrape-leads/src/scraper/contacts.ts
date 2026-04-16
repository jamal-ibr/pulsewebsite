/**
 * Pure extractors — given text, pull emails / phones / postcodes / owner
 * candidates. Kept side-effect free for easy testing.
 */
import type { OwnerCandidate } from '../types.js';

// Robust enough for typical practice sites; rejects obvious junk.
const EMAIL_RE =
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}\b/g;

// UK landline + mobile patterns. Accepts spacing, brackets, hyphens.
const PHONE_RE =
  /(?:\+44\s?|0)(?:\(0\)\s?)?(?:1\d{2,3}|2\d|3\d{2}|7\d{3}|8\d{2})[\s-]?\d{3,4}[\s-]?\d{3,4}/g;

const POSTCODE_RE =
  /\b(?:GIR ?0AA|[A-PR-UWYZ](?:[0-9]{1,2}|[A-HK-Y][0-9]|[A-HK-Y][0-9][0-9]|[0-9][A-HJKPS-UW]|[A-HK-Y][0-9][ABEHMNPRV-Y]) ?[0-9][ABD-HJLNP-UW-Z]{2})\b/gi;

const GENERIC_EMAIL_LOCAL =
  /^(info|hello|contact|reception|enquiries|admin|appointments|bookings|team|practice|frontdesk|office|hi|mail|support|help)$/i;

const IMG_EMAIL_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|ico|pdf)$/i;

export function extractEmails(text: string, domain?: string): string[] {
  const raw = text.match(EMAIL_RE) ?? [];
  const cleaned = raw
    .map((e) => e.toLowerCase())
    .filter((e) => !IMG_EMAIL_EXT.test(e))
    .filter((e) => !e.endsWith('.png') && !e.endsWith('.jpg'))
    .filter((e) => !/(sentry|wixpress|example|yourdomain|test)/.test(e));
  const unique = Array.from(new Set(cleaned));
  // Prefer same-domain emails, then personal-looking locals, then generics.
  return unique.sort((a, b) => score(b, domain) - score(a, domain));
}

function score(email: string, domain?: string): number {
  const [local, host] = email.split('@');
  let s = 0;
  if (domain && host && host.endsWith(stripSubdomain(domain))) s += 10;
  if (!GENERIC_EMAIL_LOCAL.test(local)) s += 5;
  if (local.includes('.')) s += 2;
  if (/(gmail|yahoo|hotmail|outlook|icloud|aol)\./.test(host ?? '')) s -= 3;
  return s;
}

function stripSubdomain(host: string): string {
  return host.replace(/^www\./, '');
}

export function extractPhones(text: string): string[] {
  const raw = text.match(PHONE_RE) ?? [];
  const normalised = raw.map(normaliseUkPhone);
  return Array.from(new Set(normalised));
}

export function normaliseUkPhone(s: string): string {
  let digits = s.replace(/[^\d+]/g, '');
  if (digits.startsWith('+44')) digits = '0' + digits.slice(3);
  if (digits.startsWith('0044')) digits = '0' + digits.slice(4);
  // Format: 0121 123 4567 or 07xxx xxx xxx.
  if (digits.startsWith('07') && digits.length === 11) {
    return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  if (digits.startsWith('02') && digits.length === 11) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  if (digits.startsWith('01') && digits.length === 11) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return digits;
}

export function extractPostcode(text: string): string | undefined {
  const m = text.match(POSTCODE_RE);
  return m ? m[0].toUpperCase().replace(/\s+/g, ' ') : undefined;
}

export function countInvisalign(text: string): number {
  const m = text.match(/invisalign/gi);
  return m ? m.length : 0;
}

/**
 * Owner candidates: look for lines that pair a "Dr …" / name with one of
 * the typical owner/principal role labels found on practice sites.
 */
const OWNER_ROLES = [
  'principal dentist',
  'principal orthodontist',
  'practice principal',
  'practice owner',
  'clinic owner',
  'owner',
  'founder',
  'co-founder',
  'managing director',
  'clinical director',
  'director',
  'lead dentist',
  'lead clinician',
];

const NAME_TOKEN =
  "[A-Z][A-Za-z'\\u00C0-\\u017F-]+(?:\\s+[A-Z][A-Za-z'\\u00C0-\\u017F-]+){0,3}";

export function extractOwnerCandidates(
  cleanText: string,
): OwnerCandidate[] {
  const candidates: OwnerCandidate[] = [];
  for (const role of OWNER_ROLES) {
    // "Dr John Smith — Principal Dentist" and variants.
    const re = new RegExp(
      `(?:Dr|Dr\\.|Mr|Mrs|Ms|Miss|Mx)\\s+${NAME_TOKEN}` +
        `(?:\\s*(?:[-–—,|:]|\\s(?:is|our|the))\\s*(?:the\\s+)?)` +
        `[A-Za-z &/]*${role.replace(/ /g, '\\s+')}`,
      'gi',
    );
    for (const m of cleanText.matchAll(re)) {
      const hit = m[0];
      const nameMatch = hit.match(
        new RegExp(`(?:Dr|Dr\\.|Mr|Mrs|Ms|Miss|Mx)\\s+${NAME_TOKEN}`),
      );
      if (!nameMatch) continue;
      candidates.push({
        name: nameMatch[0].replace(/\s+/g, ' ').trim(),
        role: titleCase(role),
        source: 'website',
        confidence: role.includes('principal') || role.includes('owner') ? 0.9 : 0.7,
      });
    }
    // Reverse order: "Principal Dentist: Dr John Smith".
    const re2 = new RegExp(
      `${role.replace(/ /g, '\\s+')}[\\s:–—-]+` +
        `(?:Dr|Dr\\.|Mr|Mrs|Ms|Miss|Mx)\\s+${NAME_TOKEN}`,
      'gi',
    );
    for (const m of cleanText.matchAll(re2)) {
      const hit = m[0];
      const nameMatch = hit.match(
        new RegExp(`(?:Dr|Dr\\.|Mr|Mrs|Ms|Miss|Mx)\\s+${NAME_TOKEN}`),
      );
      if (!nameMatch) continue;
      candidates.push({
        name: nameMatch[0].replace(/\s+/g, ' ').trim(),
        role: titleCase(role),
        source: 'website',
        confidence: role.includes('principal') || role.includes('owner') ? 0.85 : 0.65,
      });
    }
  }
  return dedupeOwners(candidates);
}

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1));
}

function dedupeOwners(list: OwnerCandidate[]): OwnerCandidate[] {
  const byName = new Map<string, OwnerCandidate>();
  for (const c of list) {
    const key = c.name.toLowerCase();
    const existing = byName.get(key);
    if (!existing || c.confidence > existing.confidence) {
      byName.set(key, c);
    }
  }
  return [...byName.values()].sort((a, b) => b.confidence - a.confidence);
}
