import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { PulseLine } from '@/components/ui/PulseLine';
import { SITE } from '@/lib/constants';

const COLS = [
  {
    label: 'Services',
    links: [
      { href: '/services#never-miss-a-lead', label: 'Lead capture' },
      { href: '/services#reactivate-your-database', label: 'Lead reactivation' },
      { href: '/services#generate-new-leads', label: 'Lead generation' },
      { href: '/services#ai-consulting', label: 'AI consulting' },
    ],
  },
  {
    label: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/industries', label: 'Industries' },
      { href: '/contact', label: 'Contact' },
      { href: '/contact', label: 'Book a call' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of service' },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/60 bg-ink-deep">
      <div className="opacity-30">
        <PulseLine />
      </div>
      <Container className="relative pb-12 pt-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-[0.95rem] leading-relaxed text-silver">
              {SITE.tagline}. AI-powered systems built for service practices that take
              revenue seriously.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-silver transition-colors hover:text-pulse-bright"
            >
              {SITE.email}
            </a>
          </div>

          {COLS.map((col) => (
            <div key={col.label} className="flex flex-col gap-5">
              <h3 className="font-mono text-eyebrow uppercase text-silver/60">
                {col.label}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-bone/85 transition-colors hover:text-pulse-bright"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line/60 pt-8 text-xs text-silver/70 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono uppercase tracking-wider">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-wider">
            Registered in England & Wales · United Kingdom
          </p>
        </div>
      </Container>
    </footer>
  );
}
