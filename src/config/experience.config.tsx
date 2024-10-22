const location = 'Barcelona - Spain';

const experiences = [
  {
    company: {
      link: 'https://www.decathlon.fr',
      name: 'Decathlon',
      small: '(International)',
    },
    listItem: [
      'Implemented user interfaces using JavaScript and Svelte to create a consistent and personalized customer experience across Decathlon’s global platform, improving scalability and user satisfaction.',
      'Collaborated with teams from 15 countries during the development process, ensuring the platform met diverse regional needs while maintaining a unified global experience.',
      'Worked closely with design and development teams, using tools like Figma, Storybook, and Jira to streamline workflows and optimize application performance.',
      'Implemented and maintained testing with Jest to ensure code quality and minimize bugs, contributing to a smoother deployment process.',
    ],
    location,
    period: 'October 2023 - present',
    tab: 'Decathlon (International)',
    title: 'Software Developer',
  },
  {
    company: {
      link: 'https://www.decathlon.es/es/',
      name: 'Decathlon',
      small: '(Spain)',
    },
    listItem: [
      'Focused on improving the performance and accessibility of Decathlon Spain’s e-commerce website using Svelte, JavaScript, and Tailwind, resulting in a faster and more user-friendly online shopping experience.',
      'Collaborated with cross-functional teams, utilizing Figma and Jira to ensure efficient design and development processes, while adhering to best practices in front-end development.',
      'Enhanced website accessibility to meet industry standards, making the platform more inclusive and easier to navigate for all users.',
      'Implemented and maintained testing with Jest to ensure code quality and minimize bugs, contributing to a smoother deployment process.',
    ],
    location,
    period: 'May 2022 - October 2023',
    tab: 'Decathlon (Spain)',
    title: 'Software Developer',
  },
  {
    company: {
      link: 'https://subforce.io/',
      name: 'Subforce',
    },
    listItem: [
      'Spearheaded the development of dynamic projects using React, Next.js, Express.js, and MongoDB',
      'Orchestrated project lifecycle within a compact team of developers and a project manager',
      'Pioneered internationalization strategies, enabling multilingual user experiences across three languages',
    ],
    location,
    period: 'June 2021 - May 2022',
    tab: 'Subforce',
    title: 'Software developer',
  },
];

export default experiences;
