type Certification = {
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
    title: 'React: Using TypeScript',
    issuer: 'LinkedIn Learning',
    date: 'November 2023',
    description:
      'Comprehensive course covering advanced React patterns with TypeScript, including hooks, context, and performance optimization techniques for building scalable applications.',
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/40fd79658af09c1bdbf16e99974debccb5b541758ce2d58f71bdb0dfc323722e',
    skills: ['React Hooks', 'TypeScript', 'React.js', 'Web Development', 'Frontend Development'],
  },
  {
    title: 'JavaScript: The Advanced Concepts',
    issuer: 'Udemy',
    date: 'May 2021',
    description:
      'Deep dive into advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features for building complex applications.',
    credentialId: 'UC-833af855-7179-4c4e-903a-98172c7e4964',
    credentialUrl: 'https://www.udemy.com/certificate/UC-833af855-7179-4c4e-903a-98172c7e4964/',
    skills: ['JavaScript', 'Programming', 'Web Development', 'Frontend Development'],
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: 'April 2021',
    description:
      'Intensive program covering fundamental computer science concepts, data structures, algorithms, and problem-solving techniques essential for technical interviews.',
    credentialUrl:
      'https://freecodecamp.org/certification/kevin-sauvage/javascript-algorithms-and-data-structures',
    skills: ['JavaScript', 'Node.js', 'Programming', 'Web Development', 'Frontend Development'],
  },
  {
    title: 'EF SET English Certificate (C1 Advanced)',
    issuer: 'EF SET',
    date: 'March 2024',
    description:
      'Official certification demonstrating advanced English proficiency (C1 level) enabling effective communication in international professional environments.',
    credentialUrl: 'https://cert.efset.org/W8vpXL',
    skills: ['English', 'Communication', 'International Collaboration'],
  },
];

export default certifications;
