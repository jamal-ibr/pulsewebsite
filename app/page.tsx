import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Pillars } from '@/components/sections/Pillars';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { IndustriesGrid } from '@/components/sections/IndustriesGrid';
import { FoundersNote } from '@/components/sections/FoundersNote';
import { Trust } from '@/components/sections/Trust';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Pillars />
      <HowItWorks />
      <IndustriesGrid />
      <FoundersNote />
      <Trust />
      <FAQ />
      <FinalCTA />
    </>
  );
}
