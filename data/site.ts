export type Industry = {
  slug: string;
  title: string;
  description: string;
  value: string;
};

export const navLinks = [
  { href: '#solution', label: 'Solution' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#industries', label: 'Industries' },
  { href: '#safety', label: 'Safety' },
  { href: '#faq', label: 'FAQ' },
];

export const industries: Industry[] = [
  {
    slug: 'aesthetics-clinics',
    title: 'Aesthetics Clinics',
    description: 'Never miss Botox or filler consultations again.',
    value: 'Capture intent-rich cosmetic treatment enquiries any time of day.',
  },
  {
    slug: 'dental-practices',
    title: 'Dental Practices',
    description: 'Capture Invisalign and cosmetic enquiries instantly.',
    value: 'Respond in minutes to high-value dentistry leads before they cool off.',
  },
  {
    slug: 'veterinary-clinics',
    title: 'Veterinary Clinics',
    description: 'Handle emergency enquiries even after hours.',
    value: 'Triage urgency safely and route critical cases to your on-call workflow.',
  },
];
