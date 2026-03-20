'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/data/config';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${scrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.08)]' : ''}`}
    >
      <div className="d-container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </span>
          <span className="text-lg font-bold text-textDark">{siteConfig.name}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { href: '#problem', label: 'The Problem' },
            { href: '#solution', label: 'Solution' },
            { href: '#how-it-works', label: 'How It Works' },
            { href: '#pricing', label: 'Pricing' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-textMuted transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href={siteConfig.calendlyUrl} target="_blank" rel="noreferrer" className="d-btn-primary text-sm py-2.5 px-5">
            Book Demo Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-textBody transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-textBody transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-textBody transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {[
              { href: '#problem', label: 'The Problem' },
              { href: '#solution', label: 'Solution' },
              { href: '#how-it-works', label: 'How It Works' },
              { href: '#pricing', label: 'Pricing' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-textBody"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="d-btn-primary mt-2"
            >
              Book Demo Call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
