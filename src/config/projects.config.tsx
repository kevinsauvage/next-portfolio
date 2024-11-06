const SpotifyProfile = {
  description:
    'Showcase of Spotify API integration: User data, library, and music charts for a personalized experience.',
  githubLink: ['https://github.com/kevinsauvage/spotify-typescript'],
  images: {
    thumbnail: {
      alt: 'Spotify Profile home page',
      src: 'https://res.cloudinary.com/kevincloudname/image/upload/w_800/v1730836067/dark_iuvcup.webp',
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
      src: 'https://res.cloudinary.com/kevincloudname/image/upload/w_800/v1730836575/dark_copy_3_exhfpt.webp',
    },
  },
  technologies: [
    { name: 'ReactJs' },
    { name: 'SASS' },
    { name: 'ExpressJs' },
    { name: 'MongoDB' },
    { name: 'Vercel' },
    { name: 'TMDb API' },
  ],
  title: 'Streamy',
  websiteLink: 'https://streamy-v2-client-kevinsauvages-projects.vercel.app/',
};

const Portfolio = {
  description:
    'Explore my portfolio website—a creative showcase of my best work, reflecting artistry and innovation across diverse projects.',
  githubLink: ['https://github.com/kevinsauvage/next-portfolio'],
  images: {
    thumbnail: {
      alt: 'Portfolio home page',
      src: 'https://res.cloudinary.com/kevincloudname/image/upload/w_800/v1730837350/dark_rjdhce.webp',
    },
  },
  technologies: [{ name: 'NextJs' }, { name: 'Typescript' }, { name: 'SASS' }, { name: 'Vercel' }],
  title: 'My Portfolio',
  websiteLink: 'https://www.kevin-sauvage.com/',
};

const projects = [SpotifyProfile, Streamy, Portfolio];

export default projects;
