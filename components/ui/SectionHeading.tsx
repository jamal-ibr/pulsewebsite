import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { type ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  size?: 'md' | 'lg';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  size = 'md',
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center max-w-3xl',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            'heading-gradient font-sans tracking-tight text-balance',
            size === 'md'
              ? 'text-3xl sm:text-4xl md:text-5xl font-medium'
              : 'text-display font-medium',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'max-w-2xl text-base sm:text-lg leading-relaxed text-silver text-pretty',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
