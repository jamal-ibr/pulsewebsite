'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Item = { q: string; a: string };

export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <ul className={cn('divide-y divide-line/70 border-y border-line/70', className)}>
      {items.map((item, i) => {
        const open = i === openIndex;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              className="flex w-full items-start justify-between gap-6 py-7 text-left transition-colors duration-200 hover:text-pulse-bright"
            >
              <span className="text-lg font-medium tracking-tight text-bone sm:text-xl">
                {item.q}
              </span>
              <span
                className={cn(
                  'mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-line/60 transition-all duration-300',
                  open && 'rotate-45 border-pulse/60 bg-pulse/10 text-pulse-bright',
                )}
                aria-hidden
              >
                <Plus className="size-4" strokeWidth={1.6} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pr-12 text-[0.97rem] leading-relaxed text-silver text-pretty">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
