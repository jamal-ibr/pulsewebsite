import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatCard } from '@/components/ui/StatCard';
import { STATS } from '@/lib/constants';

export function Stats() {
  return (
    <section className="relative border-y border-line/60 py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading
          eyebrow="The Cost of Silence"
          title={
            <>
              Every missed enquiry is{' '}
              <span className="accent-gradient italic">lost revenue.</span>
            </>
          }
          description="Most practices are leaking money through the same three holes — and not because their team isn't capable. Because the volume and timing don't match human capacity."
          size="lg"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
          {STATS.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
