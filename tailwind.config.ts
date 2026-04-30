import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A1628',
          deep: '#070F1C',
          raised: '#0F1F36',
        },
        pulse: {
          DEFAULT: '#06B6D4',
          bright: '#22D3EE',
          dim: 'rgba(6, 182, 212, 0.2)',
        },
        bone: '#FAFAFA',
        silver: '#94A3B8',
        line: 'rgba(148, 163, 184, 0.14)',
        panel: 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 6vw + 1rem, 6.25rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        hero: ['clamp(3rem, 7vw + 1rem, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(6, 182, 212, 0.45)',
        'glow-sm': '0 0 22px -8px rgba(6, 182, 212, 0.4)',
        elevated: '0 30px 60px -30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(148,163,184,0.08)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
        'mesh-hero':
          'radial-gradient(ellipse 80% 50% at 20% -10%, rgba(6,182,212,0.18), transparent 50%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(ellipse 90% 60% at 50% 110%, rgba(6,182,212,0.08), transparent 60%)',
        'mesh-soft':
          'radial-gradient(ellipse 60% 40% at 70% 0%, rgba(6,182,212,0.08), transparent 50%), radial-gradient(ellipse 50% 40% at 10% 100%, rgba(34,211,238,0.06), transparent 60%)',
      },
      animation: {
        'pulse-line': 'pulseLine 4.2s cubic-bezier(0.65,0,0.35,1) infinite',
        'cursor-blink': 'cursorBlink 1.1s steps(2,end) infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'shine': 'shine 3.5s linear infinite',
      },
      keyframes: {
        pulseLine: {
          '0%': { strokeDashoffset: '1000', opacity: '0' },
          '12%': { opacity: '1' },
          '70%': { strokeDashoffset: '0', opacity: '1' },
          '100%': { strokeDashoffset: '0', opacity: '0' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
