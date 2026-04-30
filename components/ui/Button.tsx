import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-pulse text-ink hover:bg-pulse-bright shadow-glow-sm hover:shadow-glow font-medium',
  secondary:
    'bg-white/5 text-bone border border-line hover:border-pulse/50 hover:bg-white/[0.07] font-medium backdrop-blur-md',
  ghost:
    'text-bone/80 hover:text-bone hover:bg-white/[0.04] font-medium',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm rounded-lg gap-1.5',
  md: 'h-11 px-5 text-[0.95rem] rounded-xl gap-2',
  lg: 'h-14 px-7 text-base rounded-xl gap-2.5',
};

const base =
  'inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-out focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98] tracking-tight';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps & {
  as?: 'button';
  href?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

type ButtonAsLink = CommonProps & {
  as: 'link';
  href: string;
  external?: boolean;
};

type Props = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLElement, Props>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    withArrow = false,
    className,
    children,
  } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </>
  );

  if (props.as === 'link') {
    const isExternal = props.external || /^https?:/.test(props.href);
    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(cls, 'group')}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        className={cn(cls, 'group')}
      >
        {inner}
      </Link>
    );
  }

  const { as: _as, ...rest } = props as ButtonAsButton;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={cn(cls, 'group')} {...rest}>
      {inner}
    </button>
  );
});
