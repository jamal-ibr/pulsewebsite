import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pulse | AI Operational Systems for Real-Time Enquiry & Booking Workflows',
  description:
    'Pulse builds operational AI infrastructure that responds instantly, qualifies enquiries, and prevents revenue leakage for high-value service businesses.',
  keywords: ['operational ai', 'booking automation', 'enquiry handling', 'Pulse'],
  openGraph: {
    title: 'Pulse | AI Operational Systems',
    description:
      '24/7 AI enquiry and booking workflows for service businesses where speed determines revenue.',
    type: 'website',
  },
  metadataBase: new URL('https://pulse-agent-foundations.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
