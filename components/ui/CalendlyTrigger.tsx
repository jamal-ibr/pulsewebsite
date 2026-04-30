'use client';

import { useState, type ReactNode } from 'react';
import { Button } from './Button';
import { openCalendlyPopup } from '@/lib/calendly';
import { SITE } from '@/lib/constants';

type Props = {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  withArrow?: boolean;
  className?: string;
};

export function CalendlyTrigger({
  children,
  size = 'lg',
  variant = 'primary',
  withArrow = true,
  className,
}: Props) {
  const [pending, setPending] = useState(false);

  async function onClick() {
    if (pending) return;
    setPending(true);
    try {
      await openCalendlyPopup(SITE.calendlyUrl);
    } catch {
      // If Calendly fails to load, send the user to /contact as a fallback.
      window.location.href = SITE.bookingUrl;
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      as="button"
      type="button"
      size={size}
      variant={variant}
      withArrow={withArrow}
      className={className}
      onClick={onClick}
      aria-label="Book a discovery call"
    >
      {pending ? 'Opening…' : children}
    </Button>
  );
}
