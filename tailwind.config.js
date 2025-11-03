/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
  theme: {
    extend: {
      backgroundSize: {
        auto: 'auto',
        contain: 'contain',
        cover: 'cover',
      },
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#9705e6', // purple primary
          600: '#8510ce',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#54007c',
        },

        secondary: {
          50: '#eef0ff',
          100: '#d9dcff',
          200: '#b4b7ff',
          300: '#8a92ff',
          400: '#646cf9',
          500: '#4e5cf5', // original blue
          600: '#6039e8',
          700: '#7523db',
          800: '#8510ce',
          900: '#9705e6', // original purple
          950: '#54007c',
        },

        accent: {
          50: '#fff4e7',
          100: '#ffe4c2',
          200: '#ffc892',
          300: '#ffab5f',
          400: '#f18e31',
          500: '#d6750d', // original
          600: '#b25e08',
          700: '#8d4906',
          800: '#693604',
          900: '#442303',
          950: '#221101',
        },

        // Neutral: Warm grays for backgrounds and text
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Legacy colors - keep for backward compatibility
        'regal-blue': '#243c5a',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-base)'],
      },
      gridTemplateColumns: {
        'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
        'auto-fit-130': 'repeat(auto-fit, minmax(130px, 1fr))',
        'auto-fit-150': 'repeat(auto-fit, minmax(150px, 1fr))',
        'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        gradient: 'gradient 4s ease infinite',
        'mesh-slow': 'meshGradient 14s ease-in-out infinite alternate',
        float: 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        meshGradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '50% 20%' },
          '50%': { backgroundPosition: '100% 70%' },
          '75%': { backgroundPosition: '30% 100%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

        'mesh-gradient': `
          radial-gradient(at 86.7% 17.7%, #9705E6 0px, transparent 50%), 
          radial-gradient(at 20.4% 32.5%, #4E5CF5 0px, transparent 50%), 
          radial-gradient(at 81.8% 74.7%, #00EBD7 0px, transparent 50%), 
          radial-gradient(at 30.8% 88.5%, #D6750D 0px, transparent 50%)
        `,
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(151, 5, 230, 0.45)', // primary-500 (purple)
        'glow-md': '0 0 20px rgba(151, 5, 230, 0.45)', // primary-500 (purple)
        'glow-lg': '0 0 35px rgba(151, 5, 230, 0.5)', // primary-500 (purple)

        'glow-secondary': '0 0 28px rgba(212, 73, 95, 0.45)', // secondary-500
        'glow-accent': '0 0 28px rgba(219, 117, 49, 0.45)', // accent-500

        'inner-glow': 'inset 0 0 20px rgba(151, 5, 230, 0.25)', // primary-500 (purple)
      },
    },
  },
};
