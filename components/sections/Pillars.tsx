import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PillarCard } from '@/components/ui/PillarCard';
import { PILLARS } from '@/lib/constants';

export function Pillars() {
  return (
    <section className="relative py-24 sm:py-32" id="solution">
      <Container>
        <SectionHeading
          eyebrow="Three Capabilities · One System"
          title={
            <>
              A complete revenue
              <br />
              system. Not a chatbot.
            </>
          }
          description="Pulse runs end-to-end: capturing what would have been missed, re-engaging what's gone cold, and generating new pipeline on top. Built as one integrated system, not three disconnected tools."
          size="lg"
        />
        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <PillarCard
              key={p.id}
              pillar={p}
              index={i}
              href={`/services#${p.id}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
