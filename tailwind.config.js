/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bj: {
          white: '#FFFFFF',
          offwhite: '#FAF8F6',
          cream: '#F5F0EB',
          blush: '#FDF2F4',
          pink: '#D4145A',
          'pink-light': '#E8A0B5',
          'rose-gold': '#B76E79',
          black: '#1A1A1A',
          charcoal: '#2D2D2D',
        },
        gray: {
          50: '#F7F7F7',
          100: '#EBEBEB',
          200: '#D4D4D4',
          300: '#B5B5B5',
          400: '#8E8E8E',
          500: '#6B6B6B',
          600: '#4A4A4A',
          700: '#2D2D2D',
          800: '#1A1A1A',
          900: '#0D0D0D',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
        body: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(40px, 6vw, 72px)', { lineHeight: '1.05', fontWeight: '300' }],
        'display-lg': ['clamp(32px, 4vw, 52px)', { lineHeight: '1.1', fontWeight: '300' }],
        'display-md': ['clamp(24px, 3vw, 36px)', { lineHeight: '1.2', fontWeight: '400' }],
        'display-sm': ['clamp(20px, 2vw, 28px)', { lineHeight: '1.3', fontWeight: '400' }],
        'overline': ['11px', { lineHeight: '1.4', letterSpacing: '0.2em', fontWeight: '500' }],
      },
      maxWidth: {
        'bj': '1200px',
        'bj-wide': '1400px',
      },
      borderRadius: {
        'none': '0px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'elevated': '0 12px 32px rgba(0, 0, 0, 0.08)',
        'overlay': '0 20px 60px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
