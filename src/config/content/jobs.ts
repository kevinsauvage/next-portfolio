type Job = {
  id: string;
  company: string;
  position: string;
  period: string;
  highlights: string[];
  skills: string[];
};

const position = 'Frontend Software Engineer';

export const jobs: Job[] = [
  {
    id: 'keolis-2026',
    company: 'Keolis Group',
    position,
    period: 'Feb 2026 – Present',
    highlights: [
      'Took RGAA compliance on ilévia, a French public transit platform, from 30% to 84%. Audited the UI and reworked core components: semantic HTML, ARIA, keyboard navigation and screen reader support.',
      'Added Jest-axe and Cypress-axe to the CI/CD pipeline so accessibility regressions get caught before production.',
      'Set up ESLint (jsx-a11y plus custom rules) as a required check on every pull request.',
      'Worked with product and design so accessibility is part of the job from wireframe to release.',
    ],
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Jest-axe',
      'Cypress-axe',
      'ESLint',
      'jsx-a11y',
      'ARIA',
      'Semantic HTML',
      'Accessibility',
    ],
  },
  {
    id: 'decathlon-international-2023',
    company: 'Decathlon Core',
    position,
    period: 'Oct 2023 – Dec 2025',
    highlights: [
      'Built a Svelte component library that now runs e-commerce storefronts in 15+ countries.',
      'Moved the checkout out of a monorepo into a versioned npm package (Lerna), with Strapi feature flags and per-country configuration.',
      'Ran A/B tests on conversion and adoption across international markets.',
      'Worked with designers in Figma and Storybook to ship accessible, well-tested components.',
      'Owned the test suite (Jest, Cypress): more coverage, fewer production incidents.',
    ],
    skills: [
      'Svelte',
      'JavaScript',
      'Storybook',
      'Jest',
      'Cypress',
      'Figma',
      'Tailwind',
      'Accessibility',
    ],
  },
  {
    id: 'decathlon-spain-2022',
    company: 'Decathlon Spain',
    position,
    period: 'May 2022 – Oct 2023',
    highlights: [
      'Improved Core Web Vitals on the Spanish storefront: average load time down 1.5s, higher Lighthouse scores.',
      'Built a modular Svelte component system that cut duplication and sped up new product features.',
      'Rolled out WCAG 2.1 across the storefront.',
      "Wrote the team's documentation standards for components and technical decisions.",
    ],
    skills: ['Svelte', 'JavaScript', 'Core Web Vitals', 'Tailwind', 'Performance', 'Accessibility'],
  },
  {
    id: 'subforce-2021',
    company: 'Subforce',
    position,
    period: 'Jun 2021 – May 2022',
    highlights: [
      'Built full-stack features in React, Next.js, Node.js and Express.js, including third-party API integrations.',
      'Designed state management with Redux and Context API for complex UIs.',
      'Moved a legacy JavaScript codebase to ES6+, which cut bugs and made it easier to maintain.',
    ],
    skills: ['React', 'Next.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Sass'],
  },
];
