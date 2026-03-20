import { Nav } from '@/components/dental/Nav';
import { Hero } from '@/components/dental/Hero';
import { ProblemSection } from '@/components/dental/ProblemSection';
import { SolutionSection } from '@/components/dental/SolutionSection';
import { HowItWorks } from '@/components/dental/HowItWorks';
import { DemoVideo } from '@/components/dental/DemoVideo';
import { Pricing } from '@/components/dental/Pricing';
import { SocialProof } from '@/components/dental/SocialProof';
import { FinalCTA } from '@/components/dental/FinalCTA';
import { Footer } from '@/components/dental/Footer';

export default function Home() {
  return (
    <div className="bg-surface text-textBody">
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <DemoVideo />
        <Pricing />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
