import { siteConfig } from '@/data/config';

export function Footer() {
  return (
    <footer className="border-t border-border bg-surfaceAlt py-10">
      <div className="d-container">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </span>
            <span className="text-sm font-bold text-textDark">{siteConfig.name}</span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm text-textMuted">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
              {siteConfig.email}
            </a>
            <a href={siteConfig.privacyUrl} className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href={siteConfig.termsUrl} className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-textLight">
            © {siteConfig.year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-textLight max-w-2xl mx-auto">
          Pulse AI is an AI voice automation service. The AI does not provide clinical advice, diagnose conditions,
          or quote final treatment pricing. All clinical decisions remain with licensed dental professionals.
          Pulse AI operates within GDPR guidelines.
        </p>
      </div>
    </footer>
  );
}
