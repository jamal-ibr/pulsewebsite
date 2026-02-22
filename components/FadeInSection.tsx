'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type FadeInSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function FadeInSection({ id, children, className }: FadeInSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
