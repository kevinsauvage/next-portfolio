const location = 'Barcelona - Spain';

const experiences = [
  {
    company: {
      link: 'https://www.decathlon.fr',
      name: 'Decathlon',
      small: '(International)',
    },
    description:
      "Promoted to an international role at Decathlon, working on the development of a global checkout system for customers in multiple countries. Focused on transforming Decathlon's e-commerce checkout process through cross-functional collaboration to meet international customer demands.",
    listItem: [
      'Promoted to an international role within Decathlon, focusing on developing a new global checkout system to serve customers across 15 countries',
      'Collaborate with designers, project managers, and other engineers to transform creative concepts into production realities for clients and stakeholders',
      'Conducted comprehensive code reviews and provided constructive feedback, leading to higher code quality and adherence to best practices',
      'Collaborated with product owners to prioritize and manage the product backlog, ensuring that development efforts aligned with business goals and objectives',
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
      "Contributed to a high-traffic e-commerce website with 18+ million monthly visitors. Improved performance and scalability, ensuring the website's success. Also, enhanced accessibility in line with WCAG guidelines.",
    listItem: [
      'Contributor to an e-commerce website with a staggering monthly traffic of over 18 million visitors',
      'Collaborating with cross-functional teams to ensure continuous improvements that meet the evolving demands of an international customer base',
      "Implemented performance optimization strategies, enhancing the platform's scalability and contributing to its success",
      'Worked on enhancing website accessibility, making it more user-friendly for people with disabilities by aligning with WCAG guidelines, ensuring an inclusive online experience for all users',
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
      'Creating websites for a startup. Managed the software development process, added new features and optimizations that improved website performance, leading to more conversions and higher user retention.',
    listItem: [
      'Creation of a dynamic website for a startup, taking charge of all technical aspects from front-end to back-end functionality',
      'Managed the entire software development process, including gathering requirements, coding, testing, and deploying',
      "Implemented new features and optimizations that improved the website's performance and made users happier, resulting in more conversions and increased user retention",
    ],
    location,
    period: 'June 2021 - May 2022',
    tab: 'Subforce',
    title: 'Software developer',
  },
];

export default experiences;
