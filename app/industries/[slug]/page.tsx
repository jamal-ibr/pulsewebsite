import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { industries } from '@/data/site';

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industries.find((item) => item.slug === params.slug);

  if (!industry) notFound();

  return (
    <main className="min-h-screen bg-radialCore">
      <Header />
      <section className="section-shell">
        <p className="text-sm uppercase tracking-[0.18em] text-electric">Industry Workflow</p>
        <h1 className="mt-4 text-4xl font-semibold text-textPrimary">{industry.title}</h1>
        <p className="mt-6 max-w-3xl text-lg text-textSecondary">{industry.value}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {['Capture instantly', 'Qualify safely', 'Escalate with context'].map((step) => (
            <div key={step} className="glass-card text-textSecondary">{step}</div>
          ))}
        </div>
        <Link
          href="https://calendly.com/pulse-strategy"
          target="_blank"
          rel="noreferrer"
          className="cta-glow mt-10 inline-flex rounded-xl bg-accentBlue px-6 py-3 font-medium text-textPrimary"
        >
          Book Strategy Call
        </Link>
      </section>
    </main>
  );
}
