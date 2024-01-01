const SpotifyProfile = {
  description:
    'Showcase of Spotify API integration: User data, library, and music charts for a personalized experience.',
  githubLink: ['https://github.com/kevinsauvage/spotify-typescript'],
  images: {
    thumbnail: {
      alt: 'Spotify Profile home page',
      src: 'https://res.cloudinary.com/kevincloudname/image/upload/w_800/v1704109547/portfolio/spotifyProfileMockup_ehxdxg.webp',
    },
  },
  technologies: [
    { name: 'NextJs' },
    { name: 'Typescript' },
    { name: 'SASS' },
    { name: 'Spotify API' },
    { name: 'Vercel' },
  ],
  title: 'Spotify Profile',
  websiteLink: 'https://spotify-typescript.vercel.app/',
};

const Streamy = {
  description:
    'Your personalized entertainment hub. Discover new titles, watch trailers, and engage in community conversations.',
  githubLink: [
    'https://github.com/kevinsauvage/streamyV2-client',
    'https://github.com/kevinsauvage/streamyV2-server',
  ],
  images: {
    thumbnail: {
      alt: 'Streamy home page',
      src: 'https://res.cloudinary.com/kevincloudname/image/upload/w_800/v1704109547/portfolio/streamyMockup_mpznlb.webp',
    },
  },
  technologies: [
    { name: 'ReactJs' },
    { name: 'SASS' },
    { name: 'ExpressJs' },
    { name: 'MongoDB' },
    { name: 'Vercel' },
  ],
  title: 'Streamy',
  websiteLink: 'https://streamy.fun/',
};

const Portfolio = {
  description:
    'Explore my portfolio website—a creative showcase of my best work, reflecting artistry and innovation across diverse projects.',
  githubLink: ['https://github.com/kevinsauvage/next-portfolio'],
  images: {
    thumbnail: {
      alt: 'Portfolio home page',
      src: 'https://res.cloudinary.com/kevincloudname/image/upload/w_800/v1704109547/portfolio/portfolioMockup_jh0mpw.webp',
    },
  },
  technologies: [{ name: 'NextJs' }, { name: 'Typescript' }, { name: 'SASS' }, { name: 'Vercel' }],
  title: 'My Portfolio',
  websiteLink: 'https://www.kevin-sauvage.com/',
};

const Calculator = {
  description:
    'A simple calculator app built with Next.js. It allows users to perform basic arithmetic operations and provides a clean and intuitive user interface.',
  githubLink: ['https://github.com/kevinsauvage/calculator'],
  images: {
    thumbnail: {
      alt: 'Calculator home page',
      src: 'https://res.cloudinary.com/kevincloudname/image/upload/w_800/v1704109546/portfolio/CalculatorMockup_oh09z5.webp',
    },
  },
  technologies: [
    { name: 'NextJs' },
    { name: 'Typescript' },
    { name: 'TailwindCSS' },
    { name: 'Vercel' },
  ],
  title: 'Calculator',
  websiteLink: 'https://calculator-inky-mu.vercel.app',
};

const projects = [SpotifyProfile, Streamy, Portfolio, Calculator];

export default projects;
