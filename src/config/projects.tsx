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
      'https://res.cloudinary.com/kevincloudname/image/upload/w_500,ar_16:9/v1696360147/Spotify-profile_2_h8jape.png',
  },
  languages: [
    {
      icon: <NextjsLine size={14} />,
      name: 'NextJs',
    },
    {
      icon: <TypescriptPlain size={14} />,
      name: 'Typescript',
    },
    {
      icon: <SassOriginal size={14} />,
      name: 'SASS',
    },
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
      'https://res.cloudinary.com/kevincloudname/image/upload/w_500/v1691688139/portfolio/Streamy_pj4sqb.png',
  },
  languages: [
    {
      icon: <ReactOriginal size={14} />,
      name: 'ReactJs',
    },
    {
      icon: <SassOriginal size={14} />,
      name: 'SASS',
    },
    {
      icon: <ExpressOriginal size={14} />,
      name: 'ExpressJs',
    },
    {
      icon: <MongodbOriginal size={14} />,
      name: 'Mongoose',
    },
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
      'https://res.cloudinary.com/kevincloudname/image/upload/w_500/v1699902817/portfolio/Ke%CC%81vin-Sauvage-developer-portfolio-website_1_t9fh6w.png',
  },
  languages: [
    {
      icon: <NextjsLine size={14} />,
      name: 'NextJs',
    },
    {
      icon: <TypescriptPlain size={14} />,
      name: 'Typescript',
    },
    {
      icon: <SassOriginal size={14} />,
      name: 'SASS',
    },
  ],
  title: 'My Portfolio',
  websiteLink: 'https://www.kevin-sauvage.com/',
};

const Calculator = {
  description:
    'A simple calculator app built with Next.js. It allows users to perform basic arithmetic operations and provides a clean and intuitive user interface.',
  githubLink: ['https://github.com/kevinsauvage/calculator'],
  images: {
    thumbnail:
      'https://res.cloudinary.com/kevincloudname/image/upload/w_500,h_300/v1703344125/portfolio/Create-Next-App_oetdtn.webp',
  },
  languages: [
    {
      icon: <NextjsLine size={14} />,
      name: 'NextJs',
    },
    {
      icon: <TypescriptPlain size={14} />,
      name: 'Typescript',
    },
    {
      icon: <TailwindcssPlain size={14} />,
      name: 'TailwindCSS',
    },
  ],
  title: 'Calculator',
  websiteLink: 'https://calculator-inky-mu.vercel.app',
};

const projects = [SpotifyProfile, Streamy, Portfolio, Calculator];

export default projects;
