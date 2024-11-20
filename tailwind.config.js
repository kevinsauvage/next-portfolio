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
      gridTemplateColumns: {
        'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
        'auto-fit-130': 'repeat(auto-fit, minmax(130px, 1fr))',
        'auto-fit-150': 'repeat(auto-fit, minmax(150px, 1fr))',
        'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
      },
    },
  },
};
