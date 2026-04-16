import type { Lead } from '../types.js';

const COLUMNS: Array<[string, (l: Lead) => unknown]> = [
  ['rank', (l) => l.rank ?? ''],
  ['practiceName', (l) => l.practiceName],
  ['ownerName', (l) => l.ownerName ?? ''],
  ['ownerRole', (l) => l.ownerRole ?? ''],
  ['ownerSource', (l) => l.ownerSource ?? ''],
  ['primaryPhone', (l) => l.primaryPhone ?? ''],
  ['allPhones', (l) => l.phones.join(' | ')],
  ['primaryEmail', (l) => l.primaryEmail ?? ''],
  ['allEmails', (l) => l.emails.join(' | ')],
  ['website', (l) => l.website ?? ''],
  ['address', (l) => l.address ?? ''],
  ['postcode', (l) => l.postcode ?? ''],
  ['city', (l) => l.city ?? ''],
  ['rating', (l) => l.rating ?? ''],
  ['reviewCount', (l) => l.reviewCount ?? ''],
  ['invisalignMentions', (l) => l.invisalignMentions],
  ['distanceKmFromBham', (l) => l.distanceKmFromBham.toFixed(2)],
  ['popularityScore', (l) => l.popularityScore],
  ['proximityScore', (l) => l.proximityScore],
  ['invisalignScore', (l) => l.invisalignScore],
  ['score', (l) => l.score],
  ['sources', (l) => l.sources.join('|')],
  ['notes', (l) => l.notes.join(' / ')],
];

export function toCsv(leads: Lead[]): string {
  const header = COLUMNS.map(([h]) => h).join(',');
  const rows = leads.map((l) =>
    COLUMNS.map(([, fn]) => csvCell(String(fn(l) ?? ''))).join(','),
  );
  return [header, ...rows].join('\n') + '\n';
}

function csvCell(s: string): string {
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
