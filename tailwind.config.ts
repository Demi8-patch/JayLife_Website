import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

/**
 * Jay Life Tailwind Config - Version 3.0 (Sajid Design Integration)
 *
 * CORE PRINCIPLES (from @whosajid):
 * 1. Don't make users think - instant understanding
 * 2. Function over beauty - design solves problems
 * 3. Good design is minimal - less colors, less words, less clutter
 * 4. Inner spacing < Outer spacing - ALWAYS
 * 5. Group gap < Section gap - ALWAYS
 * 6. Elevation = Importance - lighter/higher = more important
 */

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════════
        // COLORS - Elevated Wellness Theme
        // ═══════════════════════════════════════════════════════════════════

        // Primary Brand
        brand: {
          cream: '#F8F5F0',        // Warm background
          sage: '#8B9B7A',         // Natural accent
          navy: '#1A2E3B',         // Trust/authority text
        },

        // Secondary / Accents
        accent: {
          gold: '#C9A962',        // Premium highlights
          terracotta: '#C97D60',  // Warmth, energy
        },

        // Neutrals
        neutral: {
          100: '#FFFFFF',
          200: '#F2EDE6',
          300: '#E0D8CC',
          400: '#BDB3A6',
          500: '#9C9288',
          600: '#7A6B5A',
          700: '#5A6B7A',       // text-secondary
          800: '#3D4A56',
          900: '#1A2E3B',       // text-primary
        },

        // Semantic Colors
        success: '#5B8B5A',
        error: '#C75A5A',
        warning: '#E8B66B',
        info: '#5A6B7A',

        // Contextual Aliases (Mapping to new system)
        surface: {
          DEFAULT: '#F8F5F0',
          paper: '#FFFFFF',
          highlight: '#F2EDE6',
        },
        text: {
          primary: '#1A2E3B',
          secondary: '#5A6B7A',
          muted: '#9C9288',
          invert: '#FFFFFF',
        },
        action: {
          DEFAULT: '#1A2E3B', // Primary buttons
          hover: '#2C4050',
          text: '#FFFFFF',
        },
        
        // Legacy support (mapping old tokens to new ones where possible or keeping distinct)
        acid: {
             DEFAULT: '#8B9B7A', // Mapping acid to sage for immediate tone shift
             glow: 'rgba(139, 155, 122, 0.2)',
             subtle: 'rgba(139, 155, 122, 0.1)',
        },
        cream: { 
            DEFAULT: '#F8F5F0',
            surface: '#FFFFFF',
            hover: '#F2EDE6',
        },
        charcoal: {
            DEFAULT: '#1A2E3B',
            surface: '#0F1C24',
            elevated: '#253846',
        },
        muted: '#5A6B7A',
      },

      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        // ═══════════════════════════════════════════════════════════════════
        // TYPOGRAPHY - Sajid's rem-based scale
        // RULE: Hierarchy = Size > Weight > Color, Max 3 sizes per component
        // ═══════════════════════════════════════════════════════════════════

        // Sajid scale
        'xs': ['0.75rem', { lineHeight: '1.4' }],        // 12px
        'sm': ['0.875rem', { lineHeight: '1.4' }],       // 14px
        'base': ['1rem', { lineHeight: '1.5' }],         // 16px
        'lg': ['1.125rem', { lineHeight: '1.5' }],       // 18px
        'xl': ['1.25rem', { lineHeight: '1.375' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '1.25' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '1.25' }],     // 30px
        '4xl': ['2.25rem', { lineHeight: '1.15' }],      // 36px
        '5xl': ['3rem', { lineHeight: '1.1' }],          // 48px
        '6xl': ['3.5rem', { lineHeight: '1.05' }],       // 56px

        // JayLife semantic sizes (mapped to Sajid scale)
        'hero': ['var(--text-6xl)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline': ['var(--text-2xl)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg': ['var(--text-4xl)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subhead': ['var(--text-lg)', { lineHeight: '1.375', fontWeight: '500' }],
        'subhead-lg': ['var(--text-xl)', { lineHeight: '1.375', fontWeight: '500' }],
        'body': ['var(--text-base)', { lineHeight: '1.5' }],
        'specs': ['var(--text-sm)', { lineHeight: '1.4' }],
        'caption': ['var(--text-xs)', { lineHeight: '1.4', fontWeight: '500' }],
      },

      spacing: {
        // ═══════════════════════════════════════════════════════════════════
        // SPACING - Sajid's rem-based scale (4px increments)
        // RULE: Inner < Outer, Group gap < Section gap, Start with 1rem
        // ═══════════════════════════════════════════════════════════════════

        // Sajid granular scale
        '1': '0.25rem',   // 4px  - Icon padding
        '2': '0.5rem',    // 8px  - Button icon-text gap
        '3': '0.75rem',   // 12px - List item gaps
        '4': '1rem',      // 16px - DEFAULT gap
        '5': '1.25rem',   // 20px - Card internal
        '6': '1.5rem',    // 24px - Card padding
        '8': '2rem',      // 32px - Section spacing
        '10': '2.5rem',   // 40px - Large gaps
        '12': '3rem',     // 48px - Section dividers
        '16': '4rem',     // 64px - Hero spacing
        '20': '5rem',     // 80px - Desktop sections
        '24': '6rem',     // 96px - Large sections

        // Additional
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        'safe-bottom': '34px',
      },

      minHeight: {
        'touch': '48px',
        'touch-lg': '56px',
      },

      minWidth: {
        'touch': '48px',
        'touch-lg': '56px',
      },

      borderRadius: {
        // ═══════════════════════════════════════════════════════════════════
        // RADII - Sajid + dyou.co combined
        // ═══════════════════════════════════════════════════════════════════
        'sm': '0.375rem',   // 6px
        'md': '0.5rem',     // 8px
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem',    // 24px
        'card': '1rem',     // 16px
        'button': '0.75rem', // 12px
        'badge': '9999px',
        'pill': '9999px',
        'soft': '1.5rem',   // 24px
      },

      boxShadow: {
        // ═══════════════════════════════════════════════════════════════════
        // SHADOWS - Sajid's Dual Shadow Technique
        // Light inset TOP + Dark shadow BOTTOM = realistic depth
        // ═══════════════════════════════════════════════════════════════════

        // Sajid dual shadow scale
        'sm': 'inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.05)',
        'md': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 8px rgba(0,0,0,0.06)',
        'lg': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 16px rgba(0,0,0,0.1)',
        'xl': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 16px 32px rgba(0,0,0,0.12)',

        // Legacy aliases
        'card': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 8px rgba(0,0,0,0.06)',
        'card-hover': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 16px rgba(0,0,0,0.1)',

        // Brand glow
        'aura': '0 0 40px hsla(75, 100%, 50%, 0.3)',
        'aura-sm': '0 0 20px hsla(75, 100%, 50%, 0.2)',

        // None
        'none': 'none',
      },

      transitionDuration: {
        // ═══════════════════════════════════════════════════════════════════
        // DURATIONS - Sajid's scale
        // ═══════════════════════════════════════════════════════════════════
        'micro': '100ms',    // Hovers, toggles
        'fast': '150ms',     // Small transitions
        'base': '200ms',     // Default
        'slow': '300ms',     // Dropdowns
        'slower': '400ms',   // Modals
        'slowest': '500ms',  // Complex sequences
        'smooth': '400ms',   // dyou.co premium
      },

      transitionTimingFunction: {
        // ═══════════════════════════════════════════════════════════════════
        // TIMING - Sajid's Purpose-Driven Animation
        // ease-out = ENTER, ease-in = EXIT, ease-in-out = CONTINUOUS
        // ═══════════════════════════════════════════════════════════════════
        'out': 'cubic-bezier(0.25, 0.1, 0.25, 1)',       // ENTER elements
        'in': 'cubic-bezier(0.42, 0, 1, 1)',             // EXIT elements
        'in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',      // CONTINUOUS
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',   // Snappy
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',        // General
      },

      animation: {
        // Existing
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',

        // dyou.co-inspired
        'crossfade-in': 'crossfadeIn 0.4s ease forwards',
        'crossfade-out': 'crossfadeOut 0.4s ease forwards',
        'float': 'floatUp 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',

        // Sajid enter/exit
        'enter': 'fadeIn 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'exit': 'fadeOut 0.2s cubic-bezier(0.42, 0, 1, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'scale-out': 'scaleOut 0.2s cubic-bezier(0.42, 0, 1, 1) forwards',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        crossfadeIn: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        crossfadeOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-24px)' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [forms],
} satisfies Config;
