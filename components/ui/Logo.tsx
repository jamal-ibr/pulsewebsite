import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Pulse — home"
      className={cn(
        'inline-flex items-center gap-2.5 text-bone transition-opacity hover:opacity-90',
        className,
      )}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
        className="text-pulse-bright"
      >
        <path
          d="M1 11h5l1.5-4 2 8 2-6 1.5 2H21"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[1.05rem] font-medium tracking-[-0.01em]">Pulse</span>
    </Link>
  );
}
