import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pulse AI — Never Miss Another £5,000 Invisalign Lead',
  description:
    'AI receptionist for cosmetic dental practices. Answers calls 24/7, qualifies Invisalign and veneer leads, and books consultations while you sleep. Stop losing £40k/year to voicemail.',
  keywords: [
    'AI receptionist dental',
    'Invisalign lead capture',
    'cosmetic dentistry AI',
    'dental practice automation',
    'after hours dental calls',
    'Pulse AI',
  ],
  openGraph: {
    title: 'Pulse AI — Never Miss Another £5,000 Invisalign Lead',
    description:
      'AI voice automation for cosmetic dental practices. 24/7 call answering, lead qualification, and consultation booking.',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulse AI — Never Miss Another £5,000 Invisalign Lead',
    description: 'AI receptionist for cosmetic dental practices. Answers calls 24/7, qualifies leads, books consultations.',
  },
  metadataBase: new URL('https://pulseai.co.uk'),
  alternates: {
    canonical: 'https://pulseai.co.uk',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics placeholder */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
