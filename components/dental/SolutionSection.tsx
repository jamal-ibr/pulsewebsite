const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '24/7 Call Coverage',
    description:
      'Pulse AI answers every inbound call — even at 2am on a bank holiday. No voicemail, no missed opportunities.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Smart Lead Triage',
    description:
      'Automatically classifies each call: dental emergency, high-value cosmetic enquiry, or routine appointment. Routes each appropriately.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    title: 'Captures Full Lead Data',
    description:
      'Collects name, treatment interest, budget range, preferred timing, and contact details in a natural conversation — no forms needed.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: 'Instant Team Handoff',
    description:
      'Your team receives an SMS and email with full structured lead data the moment a call ends. High-value leads flagged immediately.',
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="d-section bg-white">
      <div className="d-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="d-badge">The Solution</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-textDark sm:text-4xl">
            Pulse AI: Your After-Hours Receptionist
          </h2>
          <p className="mt-4 text-lg text-textMuted">
            An AI voice agent built specifically for cosmetic dental practices. It speaks naturally,
            qualifies intelligently, and never lets a high-value lead slip through.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="d-card group hover:shadow-cardHover transition-shadow duration-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primaryLight text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-textDark">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-textMuted">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Differentiator strip */}
        <div className="mt-10 rounded-2xl bg-textDark px-8 py-7 text-center">
          <p className="text-lg font-semibold text-white">
            Not a chatbot. Not a basic call answering service.
          </p>
          <p className="mt-2 text-textLight">
            Pulse AI uses conversational AI trained on dental practice workflows to qualify leads
            with the precision of your best receptionist — available every hour, every day.
          </p>
        </div>
      </div>
    </section>
  );
}
