import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Jay Life Brand Colors
        acid: '#BFFF00',
        cream: '#FAF9F5',
        charcoal: '#1A1A1A',
        muted: '#68809A',
        coral: '#FF6F61',
        lavender: '#E6E6FA',
        // Semantic aliases
        surface: 'var(--color-cream)',
        'text-primary': 'var(--color-charcoal)',
        'action-primary': 'var(--color-acid)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Mobile-first typography
        'hero': ['28px', { lineHeight: '1.1', letterSpacing: '-0.5px' }],
        'hero-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.5px' }],
        'subhead': ['20px', { lineHeight: '1.3' }],
        'body': ['16px', { lineHeight: '1.5' }],
        'specs': ['14px', { lineHeight: '1.4' }],
        'caption': ['12px', { lineHeight: '1.4' }],
      },
      spacing: {
        // 8px base unit
        'safe-bottom': '34px', // iOS safe area
        '18': '72px',
        '22': '88px',
      },
      minHeight: {
        'touch': '48px', // Minimum touch target
      },
      minWidth: {
        'touch': '48px',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'aura': '0 0 40px rgba(191, 255, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [forms],
} satisfies Config;
