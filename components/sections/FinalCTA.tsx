import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PulseLine } from '@/components/ui/PulseLine';
import { Reveal } from '@/components/ui/Reveal';

type Props = {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export function FinalCTA({
  eyebrow = 'Ready When You Are',
  title = (
    <>
      Stop losing revenue to{' '}
      <span className="accent-gradient italic">silence.</span>
    </>
  ),
  description = 'A 30-minute discovery call. We assess fit, answer your questions, and tell you straight whether Pulse is the right move for your practice.',
}: Props) {
  return (
    <section className="relative overflow-hidden border-t border-line/60 bg-mesh-soft py-24 sm:py-32">
      <div className="absolute inset-0 grid-faint opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[400px] w-[640px] -translate-x-1/2 rounded-full bg-pulse/15 blur-[120px]"
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="heading-gradient text-display font-medium tracking-tight text-balance">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed text-silver text-pretty">
              {description}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
              <Button as="link" href="/contact" size="lg" withArrow>
                Book a discovery call
              </Button>
              <Button
                as="link"
                href="mailto:hello@workwithpulse.ai"
                size="lg"
                variant="secondary"
                external
              >
                Email the founder
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
      <div className="mt-20 opacity-50">
        <PulseLine variant="bright" />
      </div>
    </section>
  );
}
