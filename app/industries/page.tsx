import type { Metadata } from 'next';
import { Check, AlertTriangle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { INDUSTRIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Pulse is built for high-volume, high-intent service practices: dental, veterinary, aesthetics, and adjacent service-based SMBs.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Built for the practices{' '}
            <span className="accent-gradient italic">we serve.</span>
          </>
        }
        description="Pulse goes deep on three verticals where missed enquiries map directly to lost revenue. The same system carries cleanly into adjacent service work."
      >
        <Button as="link" href="/contact" size="lg" withArrow>
          Book a discovery call
        </Button>
      </PageHero>

      <section className="relative py-20 sm:py-28">
        <Container className="flex flex-col gap-28 sm:gap-32">
          {INDUSTRIES.map((industry, idx) => (
            <div
              key={industry.slug}
              id={industry.slug}
              className="grid scroll-mt-32 items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20"
            >
              <Reveal>
                <div className="flex flex-col gap-7">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-eyebrow uppercase text-silver/60">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 bg-line/60" />
                    <span className="font-mono text-eyebrow uppercase text-pulse-bright/80">
                      {industry.shortLabel}
                    </span>
                  </div>
                  <h2 className="heading-gradient text-3xl font-medium tracking-tight text-balance sm:text-4xl md:text-5xl">
                    {industry.name}
                  </h2>
                  <p className="max-w-xl text-[1.05rem] leading-relaxed text-silver text-pretty">
                    {industry.blurb}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex flex-col gap-6">
                  <div className="glass rounded-2xl p-7">
                    <Eyebrow withDot={false}>
                      <AlertTriangle className="size-3.5" aria-hidden />
                      <span>Where revenue leaks</span>
                    </Eyebrow>
                    <ul className="mt-5 flex flex-col gap-3.5">
                      {industry.pains.map((pain) => (
                        <li
                          key={pain}
                          className="flex items-start gap-3 text-[0.97rem] leading-relaxed text-bone/85"
                        >
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-silver/60" />
                          <span>{pain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="gradient-border relative overflow-hidden rounded-2xl p-7">
                    <Eyebrow>How Pulse responds</Eyebrow>
                    <ul className="mt-5 flex flex-col gap-3.5">
                      {industry.wins.map((win) => (
                        <li key={win} className="flex items-start gap-3">
                          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-pulse/10 text-pulse-bright ring-1 ring-pulse/25">
                            <Check className="size-3" strokeWidth={2} aria-hidden />
                          </span>
                          <span className="text-[0.97rem] leading-relaxed text-bone/90">
                            {win}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-pulse/10 blur-3xl" />
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </Container>
      </section>

      <FinalCTA
        eyebrow="Adjacent Industries"
        title={
          <>
            Outside these verticals?{' '}
            <span className="accent-gradient italic">Get in touch.</span>
          </>
        }
        description="If your practice runs on inbound enquiries, the same economics apply. We've built Pulse-style systems for clinics, agencies, and service businesses that don't fit a neat category."
      />
    </>
  );
}
