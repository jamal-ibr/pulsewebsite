import type { Lead } from '../types.js';

/**
 * Composite score — popularity × proximity, with an Invisalign emphasis
 * multiplier. Values are normalised roughly to 0–10.
 *
 *  popularity = rating (0–5) × log10(reviewCount + 10)
 *  proximity  = 10 / (1 + km_from_birmingham_centre)
 *  invisalign = 1 + min(mentions, 20) / 20
 *  score      = popularity * proximity * invisalign
 *
 * Practices with no rating default to 3.5 (≈ industry median) so that we
 * don't throw away directory-only entries, but Google-rated practices win
 * ties. Leads without any Invisalign mention are filtered upstream.
 */
export function computeScores(lead: Lead): Lead {
  const rating = lead.rating ?? 3.5;
  const reviews = lead.reviewCount ?? 0;

  lead.popularityScore = round(rating * Math.log10(reviews + 10), 3);
  lead.proximityScore = round(10 / (1 + lead.distanceKmFromBham), 3);
  lead.invisalignScore = round(1 + Math.min(lead.invisalignMentions, 20) / 20, 3);
  lead.score = round(
    lead.popularityScore * lead.proximityScore * lead.invisalignScore,
    3,
  );
  return lead;
}

function round(n: number, p: number): number {
  const f = 10 ** p;
  return Math.round(n * f) / f;
}
