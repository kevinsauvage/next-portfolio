type Job = {
  id: string;
  company: string;
  position: string;
  period: string;
  descriptionArray: string[];
  description: string;
  skills: string[];
};

const position = 'Frontend Software Engineer';

export const jobs: Job[] = [
  {
    id: 'keolis-2026',
    company: 'Keolis Group',
    position,
    period: 'Feb 2026 – Present',
    descriptionArray: [
      'Integrated automated accessibility testing into CI/CD using Jest-axe and Cypress-axe, preventing regressions before production.',
      'Configured ESLint (jsx-a11y + custom rules) as a hard gate in the dev workflow, shifting compliance checks left.',
      'Refactored components to enforce semantic HTML, ARIA usage, keyboard navigation, and screen reader compatibility.',
      'Partnered with product and design to embed inclusive UX principles into the feature lifecycle from discovery through delivery.',
    ],
    description:
      'At Keolis Group, I integrate automated accessibility testing into CI/CD, configure ESLint as a compliance gate, and refactor components for semantic HTML, ARIA, keyboard navigation, and screen reader compatibility. I partner with product and design to embed inclusive UX principles throughout the feature lifecycle.',
    skills: [
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
    period: 'Oct 2023 – Feb 2026',
    descriptionArray: [
      'Designed a scalable Svelte component library adopted across e-commerce platforms in 15+ countries, reducing delivery time.',
      'Drove A/B testing for key features, producing measurable lifts in user adoption and conversion across international markets.',
      'Collaborated with designers in Figma and Storybook to ship pixel-perfect, accessible, production-ready components.',
      'Owned the end-to-end test suite (Jest, Cypress), increasing code confidence and significantly reducing production incidents.',
      'Coordinated with engineering leads across markets to align feature configurations and manage international release requirements.',
    ],
    description:
      'At Decathlon Core, I designed a scalable Svelte component library adopted across e-commerce platforms in 15+ countries. I drove A/B testing for key features, collaborated with designers in Figma and Storybook, owned the end-to-end test suite, and coordinated with engineering leads across markets.',
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
    descriptionArray: [
      'Improved Core Web Vitals on the Decathlon Spain storefront, cutting average load time by 1.5s and boosting Lighthouse scores.',
      'Built a modular Svelte component system that reduced code duplication and accelerated new feature delivery.',
      'Implemented unit and integration testing frameworks that increased platform reliability and deployment confidence.',
      'Rolled out WCAG 2.1 accessibility standards, making the platform more inclusive for all users.',
    ],
    description:
      'At Decathlon Spain, I improved Core Web Vitals on the storefront, cutting load time by 1.5s. I built a modular Svelte component system, implemented testing frameworks, and rolled out WCAG 2.1 accessibility standards.',
    skills: [
      'Svelte',
      'JavaScript',
      'Jest',
      'Core Web Vitals',
      'Tailwind',
      'Performance',
      'Accessibility',
    ],
  },
  {
    id: 'subforce-2021',
    company: 'Subforce',
    position,
    period: 'Jun 2021 – May 2022',
    descriptionArray: [
      'Built full-stack web applications with React.js, Next.js, Node.js, and Express.js, including secure third-party API integrations.',
      'Architected scalable state management using Redux and Context API for data-heavy UIs.',
      'Refactored legacy JavaScript codebases to ES6+ standards, improving maintainability and reducing bug count.',
    ],
    description:
      'At Subforce, I built full-stack web applications with React.js, Next.js, Node.js, and Express.js. I architected state management with Redux and Context API, and refactored legacy codebases to ES6+ standards.',
    skills: ['React', 'Next.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Sass'],
  },
];
