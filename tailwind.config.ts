import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B1220',
        backgroundSecondary: '#111A2E',
        panel: 'rgba(255,255,255,0.04)',
        borderSubtle: 'rgba(255,255,255,0.12)',
        accentBlue: '#2F6BFF',
        electric: '#4DA3FF',
        textPrimary: '#F5F7FA',
        textSecondary: '#AAB4C6',
      },
      boxShadow: {
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
    },
  },
  plugins: [],
} satisfies Config;
