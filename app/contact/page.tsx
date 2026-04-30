import type { Metadata } from 'next';
import { Mail, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/sections/ContactForm';
import { CalendlyEmbed } from '@/components/sections/CalendlyEmbed';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a 30-minute discovery call. We assess fit, answer your questions, and tell you straight whether Pulse is the right move for your practice.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's talk about{' '}
            <span className="accent-gradient italic">your practice.</span>
          </>
        }
        description="A 30-minute call to assess fit and answer your questions. If we're the right move, we scope a proposal. If we're not, we'll point you somewhere better."
      />

      <section className="relative py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Reveal>
              <div className="flex flex-col gap-5">
                <Eyebrow>Discovery Call</Eyebrow>
                <h2 className="heading-gradient text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                  Book a 30-minute call.
                </h2>
                <p className="text-[1.02rem] leading-relaxed text-silver text-pretty">
                  Pick a slot below. We'll spend the call understanding your
                  practice, identifying where revenue is leaking, and answering any
                  questions about how Pulse works. No pitch deck.
                </p>

                <CalendlyEmbed
                  url={SITE.calendlyUrl}
                  className="mt-4 gradient-border overflow-hidden rounded-2xl"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-5">
                <Eyebrow>Or Send a Message</Eyebrow>
                <h2 className="heading-gradient text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                  Tell us about your practice.
                </h2>
                <p className="text-[1.02rem] leading-relaxed text-silver text-pretty">
                  Prefer email? Drop the details and we'll come back within 4
                  working hours.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-line/60 bg-mesh-soft py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pulse/10 text-pulse-bright ring-1 ring-pulse/25">
                <Mail className="size-5" strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <p className="font-mono text-eyebrow uppercase text-silver/60">
                  Email
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 block text-base text-bone transition-colors hover:text-pulse-bright"
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pulse/10 text-pulse-bright ring-1 ring-pulse/25">
                <Clock className="size-5" strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <p className="font-mono text-eyebrow uppercase text-silver/60">
                  Response Time
                </p>
                <p className="mt-2 text-base text-bone">
                  Within 4 working hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pulse/10 text-pulse-bright ring-1 ring-pulse/25">
                <MapPin className="size-5" strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <p className="font-mono text-eyebrow uppercase text-silver/60">
                  Location
                </p>
                <p className="mt-2 text-base text-bone">United Kingdom</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
