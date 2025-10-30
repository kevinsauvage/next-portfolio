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
    title: 'Full-Stack Web Developer',
    issuer: 'Le Wagon',
    date: 'Aug 2020 - Oct 2020',
    description:
      '9-week intensive bootcamp covering full-stack development with Ruby on Rails, JavaScript, and modern web technologies. Built and deployed two production applications including an Airbnb clone.',
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
    // NOSONAR: S7637 - Safe: React automatically escapes text content, preventing XSS. This is a static string, not user input.
    title: 'JavaScript - The Advanced Concepts',
    issuer: 'Udemy',
    date: 'May 2021',
    description:
      'Advanced JavaScript course covering closures, prototypes, async programming, and modern ES6+ features for complex applications.',
    credentialId: 'UC-833af855-7179-4c4e-903a-98172c7e4964',
    credentialUrl: 'https://www.udemy.com/certificate/UC-833af855-7179-4c4e-903a-98172c7e4964/',
    skills: ['JavaScript', 'Programming', 'Web Development', 'Frontend Development'],
  },
  {
    id: 'linkedin-react-using-typescript-2023',
    title: 'React: Using TypeScript',
    issuer: 'LinkedIn Learning',
    date: 'November 2023',
    description:
      'Advanced React course covering TypeScript integration, hooks, context, and performance optimization for scalable applications.',
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/40fd79658af09c1bdbf16e99974debccb5b541758ce2d58f71bdb0dfc323722e',
    skills: ['React Hooks', 'TypeScript', 'React.js', 'Web Development', 'Frontend Development'],
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
