'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { NAV } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-ink/70 backdrop-blur-xl shadow-[0_1px_0_0_rgba(148,163,184,0.08)]'
          : 'bg-transparent',
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-md px-4 py-2 text-sm transition-colors duration-200',
                    active
                      ? 'text-bone'
                      : 'text-silver hover:text-bone',
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-px h-px bg-pulse-bright/80" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button as="link" href="/contact" size="sm" className="hidden sm:inline-flex">
              Book a call
            </Button>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-lg text-silver hover:bg-white/5 hover:text-bone lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden"
          >
            <motion.div
              initial={reduced ? false : { y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-line/60 bg-ink/95 backdrop-blur-xl"
            >
              <Container className="py-8">
                <ul className="flex flex-col gap-1">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'block rounded-lg px-4 py-3.5 text-lg transition-colors',
                          pathname === item.href
                            ? 'bg-white/5 text-bone'
                            : 'text-silver hover:bg-white/[0.03] hover:text-bone',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-line/60 pt-6">
                  <Button as="link" href="/contact" size="lg" className="w-full">
                    Book a call
                  </Button>
                </div>
              </Container>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
