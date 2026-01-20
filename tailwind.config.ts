import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

/**
 * Jay Life Warm Sunrise Config
 * 
 * CORE PRINCIPLES:
 * 1. Warm, tactile base (Off-white/Charcoal)
 * 2. High energy accents (Lime/Orange)
 * 3. Neo-Brutalist depth (Hard shadows, thick borders)
 * 4. Mobile-first Thumb Zone optimization
 */

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════════
        // WARM SUNRISE BRAND PALETTE (Primary)
        // ═══════════════════════════════════════════════════════════════════

        // The new standard
        'warm-sunrise': {
          lime: '#BFFF00',     // Primary Action / High Energy
          charcoal: '#2D2926', // Primary Text / UI Borders
          orange: '#FF6B35',   // Secondary Accent / Hover
          blush: '#FFD1BA',    // Soft Backgrounds
          offwhite: '#F8F8F5', // Main Background
        },

        // Legacy/Semantic Mapping (Aliased to new palette where possible)
        brand: {
          cream: '#F8F8F5',
          sage: '#BFFF00',
          navy: '#2D2926',
        },

        // Direct semantic overrides
        primary: '#BFFF00',
        secondary: '#2D2926',
        background: '#F8F8F5',
        surface: '#FFFFFF',
        text: '#2D2926',

        // Keep existing functional colors
        success: '#BFFF00',
        error: '#FF6F61',
        warning: '#FFD1BA',
        info: '#E6E6FA',
      },

      fontFamily: {
        // New Font Stack
        display: ['Outfit', 'sans-serif'], // Headings
        body: ['Inter', 'sans-serif'],     // Copy

        // Legacy support
        sans: ['Inter', 'sans-serif'],
        serif: ['Outfit', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        // JayLife Warm Sunrise Scale
        'hero': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '900' }],      // Mobile Hero
        'hero-lg': ['6rem', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '900' }],   // Desktop Hero
        'display': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],       // Section Headers
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'title': ['1.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
      },

      spacing: {
        // Brutalist Spacing (4px grid)
        'container': '24px', // Mobile padding
        'container-lg': '64px', // Desktop padding
        'section': '80px',
        'section-lg': '120px',
      },

      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'pill': '9999px',
        // Neo-brutalist buttons often have smaller radius + hard border
        'neo': '0px',
      },

      boxShadow: {
        // NEO-BRUTALIST SHADOWS
        'neo': '4px 4px 0px 0px #2D2926',
        'neo-lg': '8px 8px 0px 0px #2D2926',
        'neo-sm': '2px 2px 0px 0px #2D2926',
        'neo-lime': '4px 4px 0px 0px #BFFF00',
        'none': 'none',
        // Legacy
        'sm': '2px 2px 0px 0px rgba(0,0,0,0.05)',
      },

      backgroundImage: {
        'pattern-grid-lg': 'radial-gradient(#2D2926 1px, transparent 1px)',
      },

      backgroundSize: {
        'grid-lg': '24px 24px',
      },

      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [forms],
} satisfies Config;
