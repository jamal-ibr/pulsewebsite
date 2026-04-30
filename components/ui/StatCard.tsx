'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  value: string;
  label: string;
  className?: string;
  index?: number;
};

export function StatCard({ value, label, className, index = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.65, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'gradient-border glass-hover relative overflow-hidden rounded-2xl px-7 py-8 sm:px-8 sm:py-9',
        className,
      )}
    >
      <div className="relative z-10">
        <p className="font-mono text-eyebrow uppercase text-silver/60">
          {String(index + 1).padStart(2, '0')}
        </p>
        <p className="mt-5 text-4xl font-medium tracking-tight text-bone sm:text-5xl">
          {value}
        </p>
        <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-silver">
          {label}
        </p>
      </div>
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-pulse/10 blur-3xl" />
    </motion.div>
  );
}
