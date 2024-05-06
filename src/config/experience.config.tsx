const location = 'Barcelona - Spain';

const experiences = [
  {
    company: {
      link: 'https://www.decathlon.fr',
      name: 'Decathlon',
      small: '(International)',
    },
    description:
      'Promoted to develop a new checkout system serving 15 countries, conducting successful AB tests and achieving significant positive impacts on conversion rates and shipping page access rates.',
    listItem: [
      'Led the development of a new checkout system serving 15 countries.',
      'Conducted successful AB tests with significant positive impacts on conversion rates',
      'Achieved significant positive impact on shipping page access rates',
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
    description:
      'Contributed to improving the performance and accessibility of the Spanish e-commerce website within a team of 25 developers at Decathlon Spain.',
    listItem: [
      'Joined a team of 25 developers at Decathlon Spain, specializing in improving the performance and accessibility of the Spanish e-commerce website',
      'Implemented performance optimization strategies and enhanced accessibility features to improve the overall user experience',
      'Contributed to the development of new features and improvements to the website, resulting in increased user satisfaction and retention rates',
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
    description:
      'Led the development of dynamic projects from inception to execution using React, Next.js, Express.js, and MongoDB within a compact team structure. Spearheaded internationalisation efforts to ensure seamless user experiences across three languages.',
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
