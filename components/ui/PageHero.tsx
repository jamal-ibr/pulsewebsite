import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { PulseLine } from './PulseLine';
import { type ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line/60 bg-mesh-soft pt-36 pb-20 sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 grid-faint opacity-60" aria-hidden />
      <Container className="relative">
        <div className="flex max-w-4xl flex-col gap-7">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="heading-gradient text-display font-medium tracking-tight text-balance">
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.12}>
              <p className="max-w-2xl text-lg leading-relaxed text-silver text-pretty sm:text-xl">
                {description}
              </p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.18}>
              <div className="mt-3 flex flex-wrap items-center gap-3">{children}</div>
            </Reveal>
          )}
        </div>
      </Container>
      <div className="mt-16 opacity-40 sm:mt-20">
        <PulseLine />
      </div>
    </section>
  );
}
