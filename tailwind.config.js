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
        // Primary: Used for main CTAs and important actions
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Secondary: Used for highlights and secondary actions
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Accent: Warm accent color for special highlights
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient':
          'radial-gradient(at 27% 37%, hsla(199, 89%, 48%, 1) 0px, transparent 0%), radial-gradient(at 97% 21%, hsla(262, 83%, 58%, 1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(43, 96%, 56%, 1) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(217, 91%, 60%, 1) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(27, 87%, 67%, 1) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(199, 89%, 48%, 1) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(262, 83%, 58%, 1) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(14, 165, 233, 0.5)', // primary-500
        'glow-md': '0 0 20px rgba(14, 165, 233, 0.5)', // primary-500
        'glow-lg': '0 0 30px rgba(14, 165, 233, 0.5)', // primary-500
        'glow-secondary': '0 0 30px rgba(168, 85, 247, 0.5)', // secondary-500
        'glow-accent': '0 0 30px rgba(245, 158, 11, 0.5)', // accent-500
        'inner-glow': 'inset 0 0 20px rgba(14, 165, 233, 0.2)', // primary-500
      },
    },
  },
};
