const steps = [
  {
    number: '01',
    title: 'Call Forwards to Pulse AI',
    description:
      'After hours (or always-on, your choice), inbound calls forward seamlessly to Pulse AI. No new number needed — patients call your existing number.',
    detail: 'Set up in under 30 minutes',
  },
  {
    number: '02',
    title: 'AI Qualifies the Lead',
    description:
      'Pulse AI conducts a natural conversation — identifying urgency, treatment interest, budget range, and preferred appointment timing.',
    detail: 'Sounds like a real receptionist',
  },
  {
    number: '03',
    title: 'Your Team Receives the Booking',
    description:
      'Immediately after the call, your team gets an SMS + email with all captured data: name, number, treatment, budget, and notes. High-value leads are flagged.',
    detail: 'Response in under 60 seconds',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="d-section bg-surfaceAlt">
      <div className="d-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="d-badge">Simple Setup</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-textDark sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-textMuted">
            Three steps from missed calls to booked consultations.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute left-full top-10 hidden h-0.5 w-6 bg-border lg:block" style={{ left: 'calc(100% + 0px)', width: '24px' }} />
              )}

              <div className="d-card h-full hover:shadow-cardHover transition-shadow duration-200">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {step.number}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <h3 className="font-bold text-textDark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-textMuted">{step.description}</p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primaryLight px-3 py-1 text-xs font-semibold text-primary">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flow summary */}
        <div className="mt-10">
          <div className="d-card border-primary/20 bg-white">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-textBody">
              {['Patient calls after hours', '→', 'Pulse AI answers', '→', 'Lead qualified', '→', 'SMS to your team', '→', 'Consultation booked'].map((item, i) => (
                <span
                  key={i}
                  className={item === '→' ? 'text-textLight' : 'rounded-lg bg-surfaceAlt px-3 py-1.5'}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-textMuted">
              Average time from call to structured lead in your inbox:{' '}
              <span className="font-semibold text-textDark">under 60 seconds</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
