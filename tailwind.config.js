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
        'regal-blue': '#243c5a',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-base)'],
      },
    },
  },
};
