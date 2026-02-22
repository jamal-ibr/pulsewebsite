'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navLinks } from '@/data/site';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-borderSubtle bg-background/95 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-[0.04em] text-textPrimary">
          Puls<span className="text-electric">e</span>
        </Link>
        <nav className="hidden gap-8 text-sm text-textSecondary md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-textPrimary">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="https://calendly.com/pulse-strategy"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-electric/60 bg-electric/10 px-4 py-2 text-sm font-medium text-textPrimary cta-glow"
        >
          Book Strategy Call
        </a>
      </div>
    </header>
  );
}
