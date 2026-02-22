import Link from 'next/link';
import { FadeInSection } from '@/components/FadeInSection';
import { Header } from '@/components/Header';
import { SectionHeading } from '@/components/SectionHeading';
import { industries } from '@/data/site';

const workflowSteps = [
  ['Capture', 'Enquiries from website, WhatsApp, SMS, email.'],
  ['Respond', 'AI responds instantly using structured workflow logic.'],
  ['Qualify', 'Smart questions determine urgency and intent.'],
  ['Escalate & Confirm', 'Staff notified only when necessary. Bookings confirmed automatically.'],
];

export default function Home() {
  return (
    <main className="bg-radialCore">
      <Header />

      <section className="pulse-wave border-b border-borderSubtle/60 bg-grid bg-[length:52px_52px]">
        <div className="section-shell space-y-10 pt-24">
          <p className="text-sm uppercase tracking-[0.2em] text-textSecondary">AI Operational Systems for Real-Time Enquiry & Booking Workflows</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-textPrimary md:text-6xl">AI Operational Systems That Never Miss a Booking</h1>
          <p className="max-w-3xl text-lg text-textSecondary md:text-xl">
            Pulse builds 24/7 AI enquiry and booking workflows for high-value service businesses where speed determines revenue.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://calendly.com/pulse-strategy" target="_blank" rel="noreferrer" className="cta-glow rounded-xl bg-accentBlue px-6 py-3 font-medium text-textPrimary">Book a Strategy Call</a>
            <a href="#how-it-works" className="rounded-xl border border-borderSubtle px-6 py-3 font-medium text-textPrimary transition hover:border-electric">View How It Works</a>
          </div>
          <div className="h-20 w-full overflow-hidden rounded-2xl border border-electric/40 bg-panel">
            <div className="h-full w-[200%] animate-[pulse_6s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(77,163,255,0.6),transparent)]" />
          </div>
        </div>
      </section>

      <FadeInSection className="section-shell py-10">
        <div className="glass-card flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm uppercase tracking-[0.15em] text-textSecondary">Built for Modern Service Operators</p>
          <div className="flex flex-wrap gap-3 text-sm text-textSecondary">
            {['Aesthetics Clinics', 'Dental Groups', 'Veterinary Practices', 'Private Healthcare'].map((item) => (
              <span key={item} className="rounded-xl border border-borderSubtle px-4 py-2">
                {item}
              </span>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="section-shell" id="problem">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <SectionHeading title="Revenue Is Lost in the Gaps" />
            <p className="muted">Most high-value service businesses lose bookings because:</p>
            <ul className="space-y-2 muted">
              {['Enquiries arrive after hours', 'Staff are busy', 'Response times lag', 'Leads go cold within minutes', 'No structured follow-up exists'].map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <p className="text-textPrimary">One missed consultation can mean thousands in lost revenue. Pulse eliminates that leakage.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass-card">
              <p className="text-sm text-textSecondary">Before</p>
              <h3 className="mb-3 mt-2 font-semibold">Fragmented Inbox</h3>
              <p className="text-sm text-textSecondary">Unsorted enquiries, delayed responses, no routing, no accountability.</p>
            </div>
            <div className="glass-card border-electric/40">
              <p className="text-sm text-electric">After</p>
              <h3 className="mb-3 mt-2 font-semibold">Structured AI Workflow</h3>
              <p className="text-sm text-textSecondary">Immediate response, qualification logic, escalation controls, logged outcomes.</p>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="section-shell" id="solution">
        <SectionHeading
          title="AI That Operates Like Your Best Staff Member"
          description="Pulse builds operational AI systems that respond instantly (under 2 minutes), qualify enquiries intelligently, escalate urgent cases to humans, capture booking intent, send confirmations and reminders, and log every interaction. This is not a chatbot. This is infrastructure."
        />
      </FadeInSection>

      <FadeInSection className="section-shell" id="how-it-works">
        <SectionHeading title="How It Works" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {workflowSteps.map(([title, copy], index) => (
            <article key={title} className="glass-card">
              <p className="text-sm text-electric">Step {index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-textSecondary">{copy}</p>
            </article>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="section-shell" id="industries">
        <SectionHeading title="Designed for High-Value Service Workflows" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {industries.map((industry) => (
            <article key={industry.slug} className="glass-card space-y-4">
              <h3 className="text-xl font-semibold">{industry.title}</h3>
              <p className="text-textSecondary">{industry.description}</p>
              <Link href={`/industries/${industry.slug}`} className="text-sm font-medium text-electric">
                See How It Works for This Industry
              </Link>
            </article>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="section-shell" id="safety">
        <SectionHeading title="Built With Operational Boundaries" />
        <div className="mt-8 glass-card">
          <ul className="grid gap-3 text-textSecondary md:grid-cols-2">
            {[
              'Never provide clinical advice',
              'Never diagnose',
              'Never quote final treatment pricing',
              'Always defer medical decisions to licensed professionals',
              'Log all conversations',
              'Operate within GDPR guidelines',
            ].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="mt-6 text-textPrimary">We build automation. You retain control.</p>
        </div>
      </FadeInSection>

      <FadeInSection className="section-shell">
        <SectionHeading title="Proof of Performance" />
        <article className="glass-card mt-8 space-y-6 border-electric/30 shadow-glowSoft">
          <p className="text-lg text-textPrimary">“Clinic reduced response time from 2 hours to under 2 minutes and recovered 3 additional bookings in first month.”</p>
          <div className="grid gap-4 md:grid-cols-4">
            <div><p className="text-3xl font-semibold">94%</p><p className="text-sm text-textSecondary">Enquiry response rate</p></div>
            <div><p className="text-3xl font-semibold">2 min</p><p className="text-sm text-textSecondary">Average response time</p></div>
            <div><p className="text-3xl font-semibold">18%</p><p className="text-sm text-textSecondary">Increase in booked consultations</p></div>
            <div><p className="text-3xl font-semibold">3</p><p className="text-sm text-textSecondary">Recovered high-value bookings (month one)</p></div>
          </div>
        </article>
      </FadeInSection>

      <FadeInSection className="section-shell">
        <SectionHeading title="Enterprise-Grade AI Infrastructure" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            'OpenAI / Claude LLM integration',
            'Make.com workflow automation',
            'Secure API integrations',
            'CRM compatibility',
            'WhatsApp / SMS via Twilio',
            'Encrypted logging',
          ].map((item) => (
            <div key={item} className="glass-card text-textSecondary">{item}</div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:items-center">
          <div className="flex h-44 w-44 items-center justify-center rounded-2xl border border-borderSubtle bg-backgroundSecondary text-sm text-textSecondary">Founder Portrait</div>
          <div className="space-y-4">
            <SectionHeading title="Built by Operators, Not Marketers" />
            <p className="text-textSecondary">
              Pulse was founded by Jamal Ibrahim, a data and automation specialist working within enterprise analytics environments.
              Pulse applies operational discipline to AI implementation, prioritizing structure, safety, and measurable ROI.
            </p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="section-shell" id="faq">
        <SectionHeading title="FAQ" />
        <div className="mt-8 space-y-4">
          {[
            ['Is this a chatbot?', 'No. Pulse builds operational AI workflows, not simple scripted bots.'],
            ['Does it replace staff?', 'No. It reduces repetitive workload and escalates intelligently.'],
            ['How long does implementation take?', '1–2 weeks depending on system complexity.'],
            ['How is pricing structured?', 'Fixed implementation fee + monthly operational support.'],
          ].map(([question, answer]) => (
            <article key={question} className="glass-card">
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-2 text-textSecondary">{answer}</p>
            </article>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection id="book" className="border-t border-borderSubtle bg-backgroundSecondary/30">
        <div className="section-shell text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">If Speed Determines Revenue, Pulse Is Essential</h2>
          <p className="mx-auto mt-4 max-w-2xl text-textSecondary">
            Book a strategy call and see how much revenue your enquiry process may be leaking.
          </p>
          <a
            href="https://calendly.com/pulse-strategy"
            target="_blank"
            rel="noreferrer"
            className="cta-glow mt-8 inline-flex rounded-xl bg-accentBlue px-8 py-3 font-medium text-textPrimary"
          >
            Book Strategy Call
          </a>
        </div>
      </FadeInSection>
    </main>
  );
}
