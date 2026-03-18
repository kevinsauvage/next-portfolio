type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  logo?: string;
};

export const certifications: Certification[] = [
  {
    id: 'le-wagon-full-stack-web-developer-2020',
    title: 'Full-Stack Web Developer Bootcamp',
    issuer: 'Le Wagon',
    date: '2020',
    description:
      '9-week intensive bootcamp covering full-stack development with Ruby on Rails, JavaScript, and modern web technologies. Built and deployed two production applications including an Airbnb clone.',
    credentialUrl: '/fullstack-certificate-Kevin-sauvage.pdf',
    skills: [
      'Ruby on Rails',
      'JavaScript ES6',
      'HTML',
      'CSS',
      'Bootstrap',
      'SQL',
      'Git',
      'GitHub',
      'Heroku',
      'Full-Stack Development',
    ],
  },
  {
    id: 'udemy-advanced-javascript-2021',
    title: 'JavaScript — The Advanced Concepts',
    issuer: 'Udemy',
    date: '2021',
    description:
      'Advanced JavaScript course covering closures, prototypes, async programming, and modern ES6+ features for complex applications.',
    credentialId: 'UC-833af855-7179-4c4e-903a-98172c7e4964',
    credentialUrl: 'https://www.udemy.com/certificate/UC-833af855-7179-4c4e-903a-98172c7e4964/',
    skills: ['JavaScript', 'Programming', 'Web Development', 'Frontend Development'],
  },
  {
    id: 'ef-set-c1-english-certificate-2024',
    title: 'C1 English Certificate',
    issuer: 'EF SET',
    date: 'March 2024',
    description:
      'Official C1 Advanced English certification for professional communication in international environments.',
    credentialUrl: 'https://cert.efset.org/W8vpXL',
    skills: ['English', 'Communication', 'International Collaboration'],
  },
];

export default certifications;
