'use client';

import Script from 'next/script';

type Props = {
  url: string;
  className?: string;
};

const THEME = {
  background_color: '0A1628',
  text_color: 'FAFAFA',
  primary_color: '06B6D4',
};

const HIDE = {
  hide_event_type_details: '1',
  hide_gdpr_banner: '1',
};

function buildUrl(url: string) {
  const u = new URL(url);
  Object.entries({ ...THEME, ...HIDE }).forEach(([k, v]) => {
    u.searchParams.set(k, v);
  });
  return u.toString();
}

/**
 * Calendly inline widget. Loads Calendly's external script via
 * next/script (lazy, after page is interactive) and renders the
 * embed in the host div. Themed to match the site.
 */
export function CalendlyEmbed({ url, className }: Props) {
  const themedUrl = buildUrl(url);

  return (
    <div className={className}>
      <div
        className="calendly-inline-widget"
        data-url={themedUrl}
        style={{ minWidth: 320, height: 720 }}
        aria-label="Calendly booking widget"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
