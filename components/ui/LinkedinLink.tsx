import Link from 'next/link';
import { cn } from '@/lib/utils';

const LINKEDIN_URL =
  'https://www.linkedin.com/in/jamal-ibrahim-b6765524a';

type Props = {
  className?: string;
  label?: string;
};

export function LinkedinLink({ className, label = 'LinkedIn' }: Props) {
  return (
    <Link
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className={cn(
        'group inline-flex items-center gap-2 text-pulse-bright transition-opacity hover:opacity-80',
        className,
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.01-4.13 2.06 2.06 0 01-.01 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
      <span className="font-mono text-eyebrow uppercase">{label}</span>
    </Link>
  );
}
