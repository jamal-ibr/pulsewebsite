import * as cheerio from 'cheerio';
import { EXTRA_PATHS } from '../config.js';
import type { WebsiteFindings } from '../types.js';
import { fetchText, sleep } from '../utils/http.js';
import { log } from '../utils/logger.js';
import {
  countInvisalign,
  extractEmails,
  extractOwnerCandidates,
  extractPhones,
  extractPostcode,
} from './contacts.js';

/**
 * Visit the homepage plus a short list of likely contact / team / invisalign
 * pages. Merge extracted signals and return them in WebsiteFindings.
 */
export async function scrapeWebsite(homepage: string): Promise<WebsiteFindings> {
  const findings: WebsiteFindings = {
    url: homepage,
    fetchedUrls: [],
    emails: [],
    phones: [],
    invisalignMentions: 0,
    owners: [],
  };

  const base = new URL(homepage);
  const domain = base.hostname;
  const visited = new Set<string>();
  const pagesToFetch: string[] = [homepage];

  try {
    // Fetch homepage first so we can harvest anchors for contact/team pages.
    const home = await fetchText(homepage);
    findings.fetchedUrls.push(home.url);
    if (home.status < 400 && home.body) {
      absorb(home.body, home.url, findings, domain);
      const $ = cheerio.load(home.body);
      findings.rawTitle = $('title').first().text().trim();
      $('a[href]').each((_, a) => {
        const href = $(a).attr('href');
        if (!href) return;
        const full = safeUrl(href, base);
        if (!full) return;
        if (full.hostname !== base.hostname) return;
        if (!shouldCrawl(full.pathname)) return;
        pagesToFetch.push(full.toString());
      });
    }
    visited.add(homepage);

    // Also try the hard-coded common paths on the same origin.
    for (const p of EXTRA_PATHS) {
      pagesToFetch.push(new URL(p, base).toString());
    }

    const unique = Array.from(new Set(pagesToFetch.map((u) => u.split('#')[0])));
    const toFetch = unique.filter((u) => !visited.has(u)).slice(0, 8);

    for (const u of toFetch) {
      if (visited.has(u)) continue;
      visited.add(u);
      try {
        const r = await fetchText(u);
        findings.fetchedUrls.push(r.url);
        if (r.status < 400 && r.body) absorb(r.body, r.url, findings, domain);
      } catch (err) {
        log.debug(`website: ${u} -> ${(err as Error).message}`);
      }
      await sleep(150);
    }
  } catch (err) {
    findings.error = (err as Error).message;
    log.warn(`website: ${homepage} failed: ${findings.error}`);
  }

  // Deduplicate + re-sort using priority logic against the primary domain.
  findings.emails = extractEmails(findings.emails.join(' '), domain);
  findings.phones = Array.from(new Set(findings.phones));
  return findings;
}

function absorb(
  html: string,
  url: string,
  findings: WebsiteFindings,
  domain: string,
) {
  const $ = cheerio.load(html);
  $('script, style, noscript').remove();
  const rawHtml = $.html();
  const text = $('body').text().replace(/\s+/g, ' ').trim();

  // mailto / tel: anchors are the most reliable contact signal.
  $('a[href^="mailto:"]').each((_, a) => {
    const v = $(a).attr('href')!.replace(/^mailto:/, '').split('?')[0];
    if (v) findings.emails.push(v.toLowerCase());
  });
  $('a[href^="tel:"]').each((_, a) => {
    const v = $(a).attr('href')!.replace(/^tel:/, '');
    if (v) findings.phones.push(v);
  });

  for (const e of extractEmails(rawHtml, domain)) findings.emails.push(e);
  for (const p of extractPhones(text)) findings.phones.push(p);
  findings.invisalignMentions += countInvisalign(text);
  findings.postcode ??= extractPostcode(text);
  for (const c of extractOwnerCandidates(text)) {
    findings.owners.push(c);
  }
}

function shouldCrawl(pathname: string): boolean {
  return /\/(contact|about|team|staff|meet|dentists?|invisalign|treatments?|services?|orthodont|principal)/i.test(
    pathname,
  );
}

function safeUrl(href: string, base: URL): URL | null {
  try {
    return new URL(href, base);
  } catch {
    return null;
  }
}
