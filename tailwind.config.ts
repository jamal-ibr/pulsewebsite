import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dental/Medical design system
        primary: '#0D9488',
        primaryDark: '#0F766E',
        primaryLight: '#CCFBF1',
        accent: '#2563EB',
        accentLight: '#EFF6FF',
        surface: '#FFFFFF',
        surfaceAlt: '#F8FAFC',
        border: '#E2E8F0',
        borderStrong: '#CBD5E1',
        textDark: '#0F172A',
        textBody: '#334155',
        textMuted: '#64748B',
        textLight: '#94A3B8',
        // Legacy
        background: '#0B1220',
        backgroundSecondary: '#111A2E',
        panel: 'rgba(255,255,255,0.04)',
        borderSubtle: 'rgba(255,255,255,0.12)',
        accentBlue: '#2F6BFF',
        electric: '#4DA3FF',
        textPrimary: '#F5F7FA',
        textSecondary: '#AAB4C6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        cardHover: '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
        cta: '0 4px 14px rgba(13,148,136,0.35)',
        ctaHover: '0 6px 20px rgba(13,148,136,0.45)',
        glowSoft: '0 0 24px rgba(77,163,255,0.25)',
        glowCTA: '0 0 30px rgba(77,163,255,0.35)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(77,163,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(77,163,255,0.08) 1px, transparent 1px)',
        radialCore: 'radial-gradient(circle at 20% -10%, rgba(77,163,255,0.28), transparent 40%), radial-gradient(circle at 80% 0%, rgba(47,107,255,0.22), transparent 40%)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
