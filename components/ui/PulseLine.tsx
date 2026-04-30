'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  variant?: 'soft' | 'bright';
};

/**
 * Stylised single-lead ECG/heartbeat trace. The signature visual motif
 * for the brand. Sweeps a glowing pulse across the line on a slow loop.
 */
export function PulseLine({ className, variant = 'soft' }: Props) {
  const reduced = useReducedMotion();

  const stroke = variant === 'bright' ? '#22D3EE' : 'rgba(148, 163, 184, 0.35)';
  const sweepStroke = variant === 'bright' ? '#22D3EE' : '#06B6D4';

  return (
    <div className={cn('relative h-24 w-full overflow-hidden', className)}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="pulse-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={stroke} stopOpacity="0" />
            <stop offset="20%" stopColor={stroke} stopOpacity="0.6" />
            <stop offset="80%" stopColor={stroke} stopOpacity="0.6" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pulse-sweep" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={sweepStroke} stopOpacity="0" />
            <stop offset="50%" stopColor={sweepStroke} stopOpacity="1" />
            <stop offset="100%" stopColor={sweepStroke} stopOpacity="0" />
          </linearGradient>
          <filter id="pulse-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* base line */}
        <path
          d="M0 60 H420 L450 60 L460 30 L475 90 L490 20 L505 100 L520 60 H780 L795 60 L805 35 L820 85 L835 60 H1200"
          fill="none"
          stroke="url(#pulse-fade)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* glowing sweep */}
        <motion.path
          d="M0 60 H420 L450 60 L460 30 L475 90 L490 20 L505 100 L520 60 H780 L795 60 L805 35 L820 85 L835 60 H1200"
          fill="none"
          stroke="url(#pulse-sweep)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#pulse-glow)"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={
            reduced
              ? { pathLength: 1, pathOffset: 0 }
              : { pathLength: [0.05, 0.18, 0.05], pathOffset: [0, 0.95, 1] }
          }
          transition={{
            duration: 4.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      </svg>
    </div>
  );
}
