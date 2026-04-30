import { cn } from '@/lib/utils';

export function PulseDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative inline-flex size-2.5', className)} aria-hidden>
      <span className="absolute inset-0 rounded-full bg-pulse-bright" />
      <span className="absolute inset-0 animate-ping rounded-full bg-pulse-bright/70" />
    </span>
  );
}
