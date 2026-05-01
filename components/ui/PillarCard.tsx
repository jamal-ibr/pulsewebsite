'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Phone, Database, TrendingUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Pillar } from '@/lib/constants';

const ICONS = {
  phone: Phone,
  database: Database,
  trending: TrendingUp,
} as const;

type Props = {
  pillar: Pillar;
  index: number;
  href?: string;
};

export function PillarCard({ pillar, index, href }: Props) {
  const Icon = ICONS[pillar.icon];
  const reduced = useReducedMotion();

  const card = (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      className="gradient-border glass-hover group relative flex h-full flex-col gap-7 overflow-hidden rounded-2xl p-7 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid size-11 place-items-center rounded-xl bg-pulse/10 text-pulse-bright ring-1 ring-pulse/25">
            <Icon className="size-5" strokeWidth={1.6} aria-hidden />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-eyebrow uppercase text-pulse-bright/80">
              {pillar.eyebrow}
            </span>
            <span className="mt-1 font-mono text-xs text-silver/60">{pillar.number}</span>
          </div>
        </div>
        {href && (
          <ArrowUpRight
            className="size-5 text-silver transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pulse-bright"
            aria-hidden
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium tracking-tight text-bone sm:text-3xl">
          {pillar.title}
        </h3>
        <p className="text-[0.97rem] leading-relaxed text-silver text-pretty">
          {pillar.description}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-line/60 pt-6">
        <span className="font-mono text-eyebrow uppercase text-silver/60">Best for</span>
        <p className="text-sm leading-relaxed text-bone/80">{pillar.bestFor}</p>
      </div>

      <div className="pointer-events-none absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-pulse/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
    </motion.article>
  );

  if (!href) return card;

  return (
    <Link
      href={href}
      className={cn('block h-full focus-visible:rounded-2xl')}
      aria-label={`${pillar.title}: learn more`}
    >
      {card}
    </Link>
  );
}
