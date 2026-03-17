/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // LUXURY COLOR SYSTEM FOR BONJOOJOO
      colors: {
        // Primary Palette: "Cultivated Elegance"
        'diamond-white': '#FAFAFA',
        'platinum': {
          50: '#F8F8F8',
          100: '#F1F1F1', 
          200: '#E5E4E2',
          300: '#D8D7D5',
          400: '#BCBAB8',
          500: '#A09E9B',
          600: '#848281',
          700: '#686767',
          800: '#4C4C4D',
          900: '#303033'
        },
        'champagne': {
          50: '#FDFBF7',
          100: '#FBF6EE', 
          200: '#F7E7CE',
          300: '#F3D8AE',
          400: '#EFCA8E',
          500: '#EBBB6E',
          600: '#E7AC4E',
          700: '#D4941A',
          800: '#A47315',
          900: '#745210'
        },
        'charcoal': {
          50: '#F6F7F8',
          100: '#EDEEF0',
          200: '#D3D6DA',
          300: '#B8BDC4',
          400: '#7E8590',
          500: '#5A6371',
          600: '#495058',
          700: '#36454F',
          800: '#293139',
          900: '#1C1D23'
        },
        
        // Secondary Palette: "Emotional Resonance"  
        'blush-rose': {
          50: '#FDFCFC',
          100: '#FBF8F9',
          200: '#F5E6E8',
          300: '#EFD4D7',
          400: '#E3B0B6',
          500: '#D78C95',
          600: '#CB6874',
          700: '#B8455D',
          800: '#8E3346',
          900: '#642130'
        },
        'sage-green': {
          50: '#F8F9F9',
          100: '#F1F3F3',
          200: '#B2BEB5',
          300: '#9CAA9F',
          400: '#869689',
          500: '#708273',
          600: '#5A6E5D',
          700: '#485547',
          800: '#364131',
          900: '#242D1B'
        },
        'warm-taupe': {
          50: '#F9F8F7',
          100: '#F3F1EF',
          200: '#8B8680',
          300: '#7B7570',
          400: '#6B6460',
          500: '#5B5350',
          600: '#4B4240',
          700: '#3B3130',
          800: '#2B2020',
          900: '#1B1010'
        },
        'ivory': {
          50: '#FFFFF0',
          100: '#FFFEE0',
          200: '#FFFDC1',
          300: '#FFFCA2',
          400: '#FFFB83',
          500: '#FFFA64',
          600: '#CCB851',
          700: '#99873E',
          800: '#66582A',
          900: '#332C15'
        }
      },

      // LUXURY TYPOGRAPHY SYSTEM
      fontFamily: {
        'luxury-serif': ['Optima', 'Avenir', 'Helvetica Neue', 'sans-serif'],
        'luxury-sans': ['Avenir Next', 'Proxima Nova', 'system-ui', 'sans-serif'],
        'luxury-accent': ['Didot', 'Bodoni MT', 'Times New Roman', 'serif'],
        'brand': ['Optima', 'Avenir', 'Helvetica Neue', 'sans-serif']
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px  
        'base': ['1rem', { lineHeight: '1.75rem' }],    // 16px - luxury line height
        'lg': ['1.25rem', { lineHeight: '2rem' }],      // 20px
        'xl': ['1.5rem', { lineHeight: '2.25rem' }],    // 24px
        '2xl': ['2rem', { lineHeight: '2.5rem' }],      // 32px
        '3xl': ['3rem', { lineHeight: '3.5rem' }],      // 48px
        '4xl': ['4rem', { lineHeight: '4.5rem' }],      // 64px
        '5xl': ['6rem', { lineHeight: '6.5rem' }],      // 96px
        '6xl': ['8rem', { lineHeight: '8.5rem' }],      // 128px
      },

      letterSpacing: {
        'luxury': '0.02em',
        'wide': '0.1em',
        'wider': '0.15em',
        'widest': '0.2em'
      },

      // LUXURY SPACING SYSTEM
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px  
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
      },

      // LUXURY LAYOUT SYSTEM
      maxWidth: {
        '8xl': '88rem',   // 1408px - luxury content width
        '9xl': '96rem',   // 1536px - ultra-wide luxury
      },

      // LUXURY SHADOWS & EFFECTS
      boxShadow: {
        'luxury': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'luxury-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'luxury-xl': '0 35px 60px -12px rgba(0, 0, 0, 0.35)',
        'inner-luxury': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'diamond': '0 0 30px rgba(247, 231, 206, 0.5), 0 0 60px rgba(247, 231, 206, 0.3)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.8)'
      },

      // LUXURY ANIMATIONS
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out'
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(247, 231, 206, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(247, 231, 206, 0.8)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },

      // LUXURY GRADIENTS
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #FAFAFA 0%, #F7E7CE 100%)',
        'diamond-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #E5E4E2 50%, #F7E7CE 100%)',
        'charcoal-gradient': 'linear-gradient(135deg, #36454F 0%, #1C1D23 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #F7E7CE 0%, #EFCA8E 100%)',
        'radial-luxury': 'radial-gradient(circle at center, #FAFAFA 0%, #E5E4E2 100%)'
      },

      // LUXURY BORDERS
      borderRadius: {
        'luxury': '8px',
        'luxury-lg': '12px',
        'luxury-xl': '16px'
      },

      // LUXURY TRANSITIONS
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms'
      },

      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'luxury-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'luxury-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'luxury-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },

      // RESPONSIVE BREAKPOINTS (Luxury)
      screens: {
        'xs': '475px',
        'sm': '640px', 
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1728px',  // Ultra-wide luxury displays
      },

      // LUXURY Z-INDEX SYSTEM
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    },
  },
  plugins: [
    // Add custom luxury plugins
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Luxury text utilities
        '.text-luxury': {
          fontFamily: theme('fontFamily.luxury-sans'),
          letterSpacing: theme('letterSpacing.luxury'),
          lineHeight: theme('lineHeight.loose')
        },
        
        // Luxury button styles
        '.btn-luxury': {
          padding: '1rem 2rem',
          fontWeight: '500',
          letterSpacing: theme('letterSpacing.wide'),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(0)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.luxury-lg')
          }
        },

        // Luxury card styles
        '.card-luxury': {
          backgroundColor: theme('colors.diamond-white'),
          borderRadius: theme('borderRadius.luxury-lg'),
          boxShadow: theme('boxShadow.luxury'),
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.luxury-xl')
          }
        },

        // Luxury container
        '.container-luxury': {
          maxWidth: theme('maxWidth.8xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.8'),
          paddingRight: theme('spacing.8')
        }
      }
      
      addUtilities(newUtilities)
    }
  ],
}