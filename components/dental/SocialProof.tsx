const metrics = [
  { value: '94%', label: 'Enquiry capture rate', sub: 'Across all after-hours calls' },
  { value: '<60s', label: 'Lead handoff time', sub: 'From call end to your inbox' },
  { value: '£4,200', label: 'Average lead value', sub: 'Invisalign & cosmetic cases' },
  { value: '18%', label: 'Consultation uplift', sub: 'More bookings month-on-month' },
];

export function SocialProof() {
  return (
    <section className="d-section bg-white">
      <div className="d-container">
        {/* Performance metrics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-4xl font-extrabold text-primary">{m.value}</p>
              <p className="mt-1 font-semibold text-textDark text-sm">{m.label}</p>
              <p className="mt-0.5 text-xs text-textMuted">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Testimonial placeholder */}
        <div className="mx-auto max-w-2xl">
          <div className="d-card border-dashed border-borderStrong text-center">
            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-lg font-medium text-textDark italic">
              "Coming soon: Early access clients share results"
            </blockquote>
            <p className="mt-3 text-sm text-textMuted">
              We're currently onboarding our first cohort of cosmetic dental practices.
              Results and case studies will be published here.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surfaceAlt px-4 py-2 text-sm font-medium text-textBody">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              3 practices currently in early access
            </div>
          </div>
        </div>

        {/* Featured client placeholder */}
        <div className="mt-8 d-card bg-surfaceAlt flex flex-col sm:flex-row items-center gap-6">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-borderStrong bg-white text-xs text-textLight font-medium text-center leading-tight">
            Client Logo
          </div>
          <div className="text-center sm:text-left">
            <p className="font-semibold text-textDark">MiSmile Birmingham — Early Access Client</p>
            <p className="mt-1 text-sm text-textMuted">
              "Recovered 3 Invisalign consultations in our first month. The leads arrive while we're
              sleeping — we just confirm in the morning." — Practice Manager
            </p>
            <p className="mt-1 text-xs text-textLight italic">Simulated early access result — real testimonials coming Q2 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
