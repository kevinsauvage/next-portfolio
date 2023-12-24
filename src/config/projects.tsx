import ExpressOriginal from 'devicons-react/lib/icons/ExpressOriginal';
import MongodbOriginal from 'devicons-react/lib/icons/MongodbOriginal';
import NextjsLine from 'devicons-react/lib/icons/NextjsLine';
import ReactOriginal from 'devicons-react/lib/icons/ReactOriginal';
import SassOriginal from 'devicons-react/lib/icons/SassOriginal';
import TailwindcssPlain from 'devicons-react/lib/icons/TailwindcssPlain';
import TypescriptPlain from 'devicons-react/lib/icons/TypescriptPlain';

const SpotifyProfile = {
  description:
    'Showcase of Spotify API integration: User data, library, and music charts for a personalized experience.',
  githubLink: ['https://github.com/kevinsauvage/spotify-typescript'],
  images: {
    thumbnail:
      'https://res.cloudinary.com/kevincloudname/image/upload/w_500,ar_16:9/v1696360147/Spotify-profile_2_h8jape.webp',
  },
  languages: [
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
    thumbnail:
      'https://res.cloudinary.com/kevincloudname/image/upload/w_500,ar_16:9/v1691688139/portfolio/Streamy_pj4sqb.webp',
  },
  languages: [
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
    thumbnail:
      'https://res.cloudinary.com/kevincloudname/image/upload/w_500,ar_16:9/v1699902817/portfolio/Ke%CC%81vin-Sauvage-developer-portfolio-website_1_t9fh6w.webp',
  },
  languages: [{ name: 'NextJs' }, { name: 'Typescript' }, { name: 'SASS' }, { name: 'Vercel' }],
  title: 'My Portfolio',
  websiteLink: 'https://www.kevin-sauvage.com/',
};

const Calculator = {
  description:
    'A simple calculator app built with Next.js. It allows users to perform basic arithmetic operations and provides a clean and intuitive user interface.',
  githubLink: ['https://github.com/kevinsauvage/calculator'],
  images: {
    thumbnail:
      'https://res.cloudinary.com/kevincloudname/image/upload/w_500,ar_16:9/v1703344125/portfolio/Create-Next-App_oetdtn.webp',
  },
  languages: [
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
