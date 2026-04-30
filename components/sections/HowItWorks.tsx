'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HOW_IT_WORKS } from '@/lib/constants';

export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative border-t border-line/60 bg-mesh-soft py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="From discovery to live, in two weeks."
          description="No drawn-out implementation. No junior hand-off. A founder-led build with a clear, narrow path from first call to first booking."
          size="lg"
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/60 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <motion.li
              key={step.step}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-6 bg-ink p-8 sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-eyebrow uppercase text-pulse-bright">
                  Step {step.step}
                </span>
                <span className="font-mono text-xs text-silver/50">
                  {String(i + 1).padStart(2, '0')}/04
                </span>
              </div>
              <h3 className="text-xl font-medium tracking-tight text-bone sm:text-2xl">
                {step.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-silver text-pretty">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
