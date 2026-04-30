'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Stethoscope, PawPrint, Sparkles, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Industry } from '@/lib/constants';

const ICONS = {
  'dental-practices': Stethoscope,
  'veterinary-clinics': PawPrint,
  'aesthetics-clinics': Sparkles,
  'service-practices': Building2,
} as const;

type Props = { industry: Industry; index: number; href?: string; compact?: boolean };

export function IndustryCard({ industry, index, href, compact = false }: Props) {
  const reduced = useReducedMotion();
  const Icon = ICONS[industry.slug as keyof typeof ICONS] ?? Building2;

  const card = (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'glass glass-hover group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl p-6 sm:p-7',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-11 place-items-center rounded-xl bg-pulse/10 text-pulse-bright ring-1 ring-pulse/25">
          <Icon className="size-5" strokeWidth={1.6} aria-hidden />
        </div>
        {href && (
          <ArrowUpRight
            className="size-5 text-silver transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pulse-bright"
            aria-hidden
          />
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-medium tracking-tight text-bone sm:text-2xl">
          {industry.name}
        </h3>
        {!compact && (
          <p className="text-[0.95rem] leading-relaxed text-silver text-pretty">
            {industry.blurb}
          </p>
        )}
      </div>
    </motion.article>
  );

  if (!href) return card;
  return (
    <Link href={href} className="block h-full" aria-label={`${industry.name} — read more`}>
      {card}
    </Link>
  );
}
