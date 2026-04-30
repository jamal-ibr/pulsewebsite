import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export function Eyebrow({
  className,
  children,
  withDot = true,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { withDot?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-eyebrow uppercase text-pulse-bright/90',
        className,
      )}
      {...props}
    >
      {withDot && (
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-pulse-bright" />
          <span className="absolute inset-0 animate-ping rounded-full bg-pulse-bright/60" />
        </span>
      )}
      {children}
    </span>
  );
}
