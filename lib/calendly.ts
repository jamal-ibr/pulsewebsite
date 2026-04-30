const CSS_HREF = 'https://assets.calendly.com/assets/external/widget.css';
const JS_SRC = 'https://assets.calendly.com/assets/external/widget.js';

const THEME = {
  background_color: '0A1628',
  text_color: 'FAFAFA',
  primary_color: '06B6D4',
};

const HIDE = {
  hide_event_type_details: '1',
  hide_gdpr_banner: '1',
};

type CalendlyAPI = {
  initPopupWidget: (opts: { url: string }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyAPI;
  }
}

export function buildCalendlyUrl(url: string) {
  const u = new URL(url);
  Object.entries({ ...THEME, ...HIDE }).forEach(([k, v]) => {
    u.searchParams.set(k, v);
  });
  return u.toString();
}

let scriptLoading: Promise<void> | null = null;

/**
 * Loads Calendly's external widget assets (CSS + JS) on demand. Idempotent.
 * Returns a promise that resolves once `window.Calendly` is ready.
 */
export function loadCalendly(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Calendly?.initPopupWidget) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${JS_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Calendly load failed')));
      return;
    }

    const script = document.createElement('script');
    script.src = JS_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly load failed'));
    document.body.appendChild(script);
  });

  return scriptLoading;
}

export async function openCalendlyPopup(url: string) {
  await loadCalendly();
  window.Calendly?.initPopupWidget({ url: buildCalendlyUrl(url) });
}
