import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { FAQS } from '@/lib/constants';

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading
            eyebrow="Frequently Asked"
            title="Questions, answered."
            description="If something's missing, ask on the discovery call. We'll give you a direct, founder-level answer — no sales-script run-around."
            size="lg"
          />
          <Accordion items={[...FAQS]} />
        </div>
      </Container>
    </section>
  );
}
