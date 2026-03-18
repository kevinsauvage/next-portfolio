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
      'Integrated Jest-axe and Cypress-axe into the CI/CD pipeline, preventing accessibility regressions from reaching production.',
      'Enforced WCAG compliance at the source by configuring ESLint (jsx-a11y + custom rules) as a required gate on every pull request.',
      'Refactored core UI components to enforce semantic HTML, ARIA, keyboard navigation, and screen reader standards.',
      'Collaborated with product and design to make accessibility a first-class requirement from wireframe to release.',
    ],
    description:
      'At Keolis Group, I integrated Jest-axe and Cypress-axe into CI/CD, enforced WCAG via ESLint as a required gate, refactored core UI for semantic HTML and ARIA, and collaborated with product and design to make accessibility a first-class requirement.',
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
    period: 'Oct 2023 – Feb 2026',
    descriptionArray: [
      'Architected a Svelte component library now powering e-commerce storefronts across 15+ countries, standardising UI at scale.',
      'Drove A/B testing initiatives that produced measurable lifts in conversion and user adoption across international markets.',
      'Worked closely with designers in Figma and Storybook to ship pixel-perfect, accessible components with high test coverage.',
      'Owned the full test suite (Jest, Cypress), raising coverage and reducing the rate of production incidents significantly.',
    ],
    description:
      'At Decathlon Core, I architected a Svelte component library powering e-commerce storefronts in 15+ countries, drove A/B testing for conversion lifts, worked with designers in Figma and Storybook, and owned the full test suite (Jest, Cypress).',
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
      'Improved Core Web Vitals on the Decathlon Spain storefront, cutting average load time by 1.5s and lifting Lighthouse scores.',
      'Built a modular Svelte component system that cut duplication and accelerated delivery of new product features.',
      'Rolled out WCAG 2.1 accessibility standards across the platform, meaningfully improving the experience for all users.',
      'Established internal documentation standards for components and technical decisions, improving team knowledge sharing.',
    ],
    description:
      'At Decathlon Spain, I improved Core Web Vitals and Lighthouse scores, built a modular Svelte component system, rolled out WCAG 2.1, and established documentation standards for components and technical decisions.',
    skills: ['Svelte', 'JavaScript', 'Core Web Vitals', 'Tailwind', 'Performance', 'Accessibility'],
  },
  {
    id: 'subforce-2021',
    company: 'Subforce',
    position,
    period: 'Jun 2021 – May 2022',
    descriptionArray: [
      'Delivered full-stack features using React.js, Next.js, Node.js, and Express.js, including secure third-party API integrations.',
      'Designed scalable state management patterns with Redux and Context API, improving data flow across complex UIs.',
      'Modernised a legacy JavaScript codebase to ES6+ standards, cutting bug count and improving long-term maintainability.',
    ],
    description:
      'At Subforce, I delivered full-stack features with React.js, Next.js, Node.js, and Express.js, designed state management with Redux and Context API, and modernised a legacy JavaScript codebase to ES6+.',
    skills: ['React', 'Next.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Sass'],
  },
];
