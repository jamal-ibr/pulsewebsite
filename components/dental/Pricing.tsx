'use client';

import { siteConfig } from '@/data/config';

const plans = [
  {
    name: 'Setup',
    price: '£4,000',
    period: 'one-time',
    description: 'Custom configuration for your practice',
    features: [
      'AI voice agent built for your practice',
      'Custom call scripts & triage logic',
      'CRM / calendar integration',
      'Staff notification workflows',
      'Test calls & QA before go-live',
      'Dedicated onboarding session',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Monthly',
    price: '£600',
    period: '/month',
    description: 'Unlimited calls, 24/7 coverage, full support',
    features: [
      'Unlimited inbound calls covered',
      '24/7 / 365 operation',
      'Monthly call quality reviews',
      'Lead data dashboard',
      'Priority support (same-day response)',
      'Continuous AI improvement',
    ],
    cta: 'Book Demo Call',
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="d-section bg-surfaceAlt">
      <div className="d-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="d-badge">Pricing</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-textDark sm:text-4xl">
            Simple Pricing, Massive ROI
          </h2>
          <p className="mt-4 text-lg text-textMuted">
            One prevented Invisalign lead pays for your setup. Two per month generates
            £96k/year in captured revenue.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`d-card flex flex-col ${plan.featured ? 'ring-2 ring-primary shadow-cta' : ''}`}
            >
              {plan.featured && (
                <div className="mb-4 inline-flex">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-textMuted">{plan.name}</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-textDark">{plan.price}</span>
                  <span className="text-textMuted">{plan.period}</span>
                </div>
                <p className="mt-1 text-sm text-textMuted">{plan.description}</p>
              </div>

              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-textBody">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className={plan.featured ? 'd-btn-primary text-center' : 'd-btn-secondary text-center'}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="d-card border-primary/20 bg-primaryLight/20">
            <h3 className="font-bold text-textDark flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              ROI Calculator
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
              <div className="rounded-xl border border-border bg-white p-4 text-center">
                <p className="text-2xl font-extrabold text-textDark">1 lead</p>
                <p className="mt-1 text-textMuted">= £4,000 Invisalign case</p>
                <p className="mt-1 text-xs font-semibold text-primary">Setup cost recovered</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-4 text-center">
                <p className="text-2xl font-extrabold text-textDark">2 leads/mo</p>
                <p className="mt-1 text-textMuted">= £8,000/month captured</p>
                <p className="mt-1 text-xs font-semibold text-primary">£96,000/year in revenue</p>
              </div>
              <div className="rounded-xl border border-primary/30 bg-primaryLight p-4 text-center">
                <p className="text-2xl font-extrabold text-primary">12× ROI</p>
                <p className="mt-1 text-textMuted">vs. monthly retainer</p>
                <p className="mt-1 text-xs font-semibold text-primary">Conservative estimate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
