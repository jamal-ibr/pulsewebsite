'use client';

import { motion, useReducedMotion, type Transition } from 'framer-motion';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: Props) {
  const reduced = useReducedMotion();
  const transition: Transition = {
    duration: reduced ? 0 : 0.7,
    delay: reduced ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
