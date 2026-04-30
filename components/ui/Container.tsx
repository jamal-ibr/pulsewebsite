import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export function Container({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('container-page', className)} {...props}>
      {children}
    </div>
  );
}
