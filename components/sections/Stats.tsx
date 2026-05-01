import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatCard } from '@/components/ui/StatCard';
import { STATS } from '@/lib/constants';

export function Stats() {
  return (
    <section className="relative border-y border-line/60 py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="The Cost of Silence"
          title={
            <>
              Every missed enquiry is{' '}
              <span className="accent-gradient italic">lost revenue.</span>
            </>
          }
          description="Most practices leak money through the same three holes. Not because their team is not capable, but because the volume and timing do not match human capacity."
          size="lg"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
