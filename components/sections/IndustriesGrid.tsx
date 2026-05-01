import { Container } from '@/components/ui/Container';
import { IndustryCard } from '@/components/ui/IndustryCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { INDUSTRIES } from '@/lib/constants';

export function IndustriesGrid() {
  return (
    <section className="relative py-24 sm:py-32" id="industries">
      <Container>
        <SectionHeading
          eyebrow="Who We Build For"
          title="High-volume, high-intent practices."
          description="Pulse is built for businesses where every inbound call carries real revenue. We have gone deep on three verticals. The system carries cleanly into adjacent service work."
          size="lg"
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard
              key={industry.slug}
              industry={industry}
              index={i}
              href={`/industries#${industry.slug}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
