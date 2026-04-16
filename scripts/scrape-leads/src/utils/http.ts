import { HTTP, USER_AGENT } from '../config.js';

export interface FetchResult {
  status: number;
  url: string;
  body: string;
  contentType: string;
}

export async function fetchText(
  url: string,
  init: RequestInit = {},
): Promise<FetchResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HTTP.timeoutMs);
  try {
    const res = await fetch(url, {
      ...init,
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': USER_AGENT,
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.9,*/*;q=0.8',
        'accept-language': 'en-GB,en;q=0.9',
        ...(init.headers ?? {}),
      },
    });
    const contentType = res.headers.get('content-type') ?? '';
    // Stream-limit to avoid huge pages exhausting memory.
    const reader = res.body?.getReader();
    if (!reader) {
      const body = await res.text();
      return { status: res.status, url: res.url, body, contentType };
    }
    const decoder = new TextDecoder('utf-8');
    let total = 0;
    let body = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      body += decoder.decode(value, { stream: true });
      if (total >= HTTP.maxBytes) {
        try {
          await reader.cancel();
        } catch {
          /* ignore */
        }
        break;
      }
    }
    body += decoder.decode();
    return { status: res.status, url: res.url, body, contentType };
  } finally {
    clearTimeout(timer);
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
