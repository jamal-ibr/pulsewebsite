'use client';

import { siteConfig } from '@/data/config';

export function DemoVideo() {
  return (
    <section id="demo" className="d-section bg-white">
      <div className="d-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="d-badge">See It In Action</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-textDark sm:text-4xl">
            Watch Pulse AI Handle a Real Invisalign Enquiry
          </h2>
          <p className="mt-4 text-lg text-textMuted">
            Two minutes. See exactly what your patients experience when they call after hours.
          </p>
        </div>

        {/* Video embed */}
        <div className="mt-10 mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            {/* Placeholder video — replace with actual Loom/YouTube embed */}
            <div className="aspect-video bg-gray-900 flex flex-col items-center justify-center gap-5">
              {/* Play button */}
              <button
                className="group flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-cta transition-all duration-200 hover:bg-primaryDark hover:shadow-ctaHover hover:scale-105"
                aria-label="Play demo video"
              >
                <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </button>

              <div className="text-center">
                <p className="text-white font-semibold">Pulse AI — Invisalign Enquiry Demo</p>
                <p className="mt-1 text-gray-400 text-sm">2 minutes · Real conversation · Actual lead captured</p>
              </div>

              {/* Decorative waveform */}
              <div className="flex items-center gap-0.5 opacity-40">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-primary"
                    style={{
                      height: `${8 + Math.sin(i * 0.7) * 12 + Math.random() * 8}px`,
                      animationDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-500 italic">
                Demo video coming soon — book a live demo to see it in action
              </p>
            </div>
          </div>
        </div>

        {/* CTA below video */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="d-btn-primary text-base py-4 px-8"
          >
            Ready to try this? Book your demo →
          </a>
        </div>

        {/* Social proof micro-copy */}
        <p className="mt-4 text-center text-sm text-textMuted">
          15-minute call. No obligation. See exactly what Pulse AI can do for your practice.
        </p>
      </div>
    </section>
  );
}
