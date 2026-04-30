'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent';

const fieldBase =
  'w-full rounded-xl border border-line/70 bg-white/[0.02] px-4 py-3 text-bone placeholder:text-silver/50 outline-none transition-colors duration-200 focus:border-pulse/60 focus:bg-white/[0.035]';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    // Placeholder — wire to real endpoint later.
    setTimeout(() => setStatus('sent'), 700);
  }

  if (status === 'sent') {
    return (
      <div className="gradient-border rounded-2xl p-8">
        <p className="font-mono text-eyebrow uppercase text-pulse-bright/80">
          Message received
        </p>
        <p className="mt-4 text-lg text-bone">Thanks. We'll be in touch within 4 working hours.</p>
        <p className="mt-2 text-sm text-silver">
          Check your inbox for a confirmation. If nothing arrives, email{' '}
          <a href="mailto:hello@workwithpulse.ai" className="text-pulse-bright">
            hello@workwithpulse.ai
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-eyebrow uppercase text-silver/60">Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldBase}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-eyebrow uppercase text-silver/60">Practice</span>
          <input
            name="practice"
            type="text"
            required
            autoComplete="organization"
            placeholder="Practice name"
            className={fieldBase}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-eyebrow uppercase text-silver/60">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@practice.co.uk"
            className={fieldBase}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-eyebrow uppercase text-silver/60">Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Optional"
            className={fieldBase}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-eyebrow uppercase text-silver/60">
          Tell us about your practice
        </span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="What's the situation? What are you trying to fix?"
          className={cn(fieldBase, 'resize-y min-h-[140px]')}
        />
      </label>

      <Button as="button" type="submit" size="lg" withArrow className="self-start mt-2">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>

      <p className="text-xs text-silver/60">
        We don't share your details. Used only to reply to your enquiry.
      </p>
    </form>
  );
}
