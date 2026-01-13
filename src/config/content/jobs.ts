type Job = {
  id: string;
  company: string;
  position: string;
  period: string;
  descriptionArray: string[];
  description: string;
  skills: string[];
};

const position = 'Frontend Developer';

export const jobs: Job[] = [
  {
    id: 'decathlon-international-2023',
    company: 'Decathlon International',
    position,
    period: 'October 2023 - Present',
    descriptionArray: [
      'Built a Svelte component library used across e-commerce platforms in 15+ countries, improving performance and design consistency.',
      'Led A/B testing for new features, resulting in measurable improvements in user adoption and conversion.',
      'Worked with product designers using Figma and Storybook to build production-ready components from design specifications.',
      'Implemented comprehensive testing with Jest and Cypress, improving code quality and reducing production bugs.',
      'Collaborated with international teams to develop features that meet diverse market needs.',
    ],
    description:
      'At Decathlon International, I build and maintain a Svelte component library used across e-commerce platforms in 15+ countries. I lead A/B testing for new features, implement comprehensive testing strategies, and work with international teams to deliver user-focused solutions.',
    skills: [
      'Svelte',
      'JavaScript',
      'Storybook',
      'Jest',
      'Cypress',
      'Less',
      'Tailwind',
      'Performance',
      'Accessibility',
    ],
  },
  {
    id: 'decathlon-spain-2022',
    company: 'Decathlon Spain',
    position,
    period: 'May 2022 - October 2023',
    descriptionArray: [
      'Improved page load times by 1.5 seconds through Core Web Vitals optimization.',
      'Built reusable Svelte components to speed up development and improve team efficiency.',
      'Set up automated testing (unit and integration) to improve platform stability and developer efficiency.',
      'Implemented WCAG 2.1 accessibility standards to make the platform usable for all users.',
      'Created technical documentation and established best practices for team knowledge sharing.',
    ],
    description:
      'At Decathlon Spain, I improved the e-commerce platform performance by reducing load times by 1.5 seconds. I built reusable Svelte components, implemented WCAG 2.1 accessibility standards, and set up automated testing and documentation practices.',
    skills: [
      'Svelte',
      'JavaScript',
      'Jest',
      'Express.js',
      'Less',
      'Tailwind',
      'Performance',
      'Accessibility',
    ],
  },
  {
    id: 'subforce-2021',
    company: 'Subforce',
    position,
    period: 'June 2021 - May 2022',
    descriptionArray: [
      'Built full-stack web applications with React.js and Next.js, including secure backend integrations.',
      'Implemented state management using Redux and Context API for complex application data.',
      'Built secure authentication systems and form validation for data integrity and better user experience.',
      'Modernized legacy JavaScript codebases to improve maintainability and reduce bugs.',
      'Built intuitive and accessible user components with focus on form usability.',
    ],
    description:
      'At Subforce, I built full-stack web applications with React.js and Next.js. I implemented state management solutions, built secure authentication systems, modernized legacy code, and created intuitive user interfaces.',
    skills: ['React', 'Next.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Sass'],
  },
];
