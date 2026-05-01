import type { Metadata } from 'next';
import { Phone, Database, TrendingUp, Check, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { PILLARS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'A complete revenue infrastructure: lead capture, lead reactivation, lead generation. Plus bespoke AI consulting for businesses outside our core verticals.',
  alternates: { canonical: '/services' },
};

const ICONS = { phone: Phone, database: Database, trending: TrendingUp } as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Complete revenue infrastructure for{' '}
            <span className="accent-gradient italic">service practices.</span>
          </>
        }
        description="One integrated system that captures every enquiry, reactivates dormant leads, and generates predictable new business. Built and run as a single engine, not a stitched-together stack."
      >
        <Button as="link" href="/contact" size="lg" withArrow>
          Book a discovery call
        </Button>
      </PageHero>

      <section className="relative py-20 sm:py-28">
        <Container className="flex flex-col gap-28 sm:gap-36">
          {PILLARS.map((p, idx) => {
            const Icon = ICONS[p.icon];
            const reverse = idx % 2 === 1;
            return (
              <div
                key={p.id}
                id={p.id}
                className="grid scroll-mt-32 items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20"
              >
                <Reveal>
                  <div className="flex flex-col gap-7">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-eyebrow uppercase text-silver/60">
                        {p.number}
                      </span>
                      <span className="h-px flex-1 bg-line/60" />
                    </div>
                    <Eyebrow>{p.eyebrow}</Eyebrow>
                    <h2 className="heading-gradient text-3xl font-medium tracking-tight text-balance sm:text-4xl md:text-5xl">
                      {p.title}
                    </h2>
                    <p className="max-w-xl text-[1.05rem] leading-relaxed text-silver text-pretty">
                      {p.description}
                    </p>
                    <div className="mt-4 flex flex-col gap-3 border-t border-line/60 pt-6">
                      <span className="font-mono text-eyebrow uppercase text-silver/60">
                        Best for
                      </span>
                      <p className="text-base leading-relaxed text-bone/85">
                        {p.bestFor}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div
                    className={`gradient-border relative overflow-hidden rounded-2xl p-8 sm:p-10 ${
                      reverse ? 'lg:order-first' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid size-12 place-items-center rounded-xl bg-pulse/10 text-pulse-bright ring-1 ring-pulse/25">
                        <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                      </div>
                      <span className="font-mono text-eyebrow uppercase text-pulse-bright/80">
                        What you get
                      </span>
                    </div>

                    <ul className="mt-8 flex flex-col gap-4">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-pulse/10 text-pulse-bright ring-1 ring-pulse/25">
                            <Check className="size-3" strokeWidth={2} aria-hidden />
                          </span>
                          <span className="text-[0.97rem] leading-relaxed text-bone/90">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="pointer-events-none absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-pulse/10 blur-3xl" />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </Container>
      </section>

      <section
        id="ai-consulting"
        className="relative scroll-mt-32 border-y border-line/60 bg-mesh-soft py-24 sm:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <Reveal>
              <div className="flex flex-col gap-5">
                <Eyebrow>Secondary Service</Eyebrow>
                <h2 className="heading-gradient text-3xl font-medium tracking-tight text-balance sm:text-4xl md:text-5xl">
                  AI implementation consulting.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6">
                <p className="text-[1.05rem] leading-relaxed text-silver text-pretty">
                  For businesses outside our core verticals (agencies, SMBs, and
                  organisations with bespoke AI needs), we run scoped consulting
                  engagements. Custom integration, internal automation, and
                  founder-led delivery.
                </p>
                <p className="text-[1.05rem] leading-relaxed text-silver text-pretty">
                  Get in touch with the specifics of your problem. If it's a fit, we
                  scope a proposal. If it's not, we'll point you to someone who can
                  help.
                </p>
                <div className="mt-2">
                  <Button as="link" href="/contact" size="md" variant="secondary" withArrow>
                    Discuss a project
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative py-24 sm:py-28">
        <Container>
          <div className="gradient-border relative overflow-hidden rounded-2xl p-10 sm:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-5">
                <Eyebrow>Pricing Approach</Eyebrow>
                <h3 className="heading-gradient text-2xl font-medium tracking-tight sm:text-3xl">
                  Tailored to practice size. Transparent. Results-focused.
                </h3>
                <ul className="mt-2 flex flex-col gap-3 text-silver">
                  {[
                    'No per-conversation or per-lead fees',
                    'Implementation fee + flat monthly retainer',
                    'Most clients see ROI within 30 days',
                    'No long-term lock-ins',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-pulse/10 text-pulse-bright ring-1 ring-pulse/25">
                        <Check className="size-3" strokeWidth={2} aria-hidden />
                      </span>
                      <span className="text-[0.97rem] leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end lg:text-right">
                <p className="text-base leading-relaxed text-silver">
                  We'll quote on the discovery call once we understand your scope.
                </p>
                <Button as="link" href="/contact" size="lg" withArrow>
                  Get a custom quote
                </Button>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-1.5 font-mono text-eyebrow uppercase text-pulse-bright transition-opacity hover:opacity-80"
                >
                  How we work
                  <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-pulse/15 blur-3xl" />
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
