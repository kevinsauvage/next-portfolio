type Project = {
  description: string;
  githubLink: string[];
  images: {
    thumbnail: {
      alt: string;
      src: string;
    };
  };
  technologies: { name: string }[];
  title: string;
  websiteLink: string;
};

const myEcommerceProject: Project = {
  description:
    "A cutting-edge ecommerce platform featuring advanced product filtering, real-time inventory management, and seamless checkout experience. Built with Next.js 15, TypeScript, and Shopify's GraphQL API, achieving 95+ Lighthouse scores.",
  githubLink: ['https://github.com/kevinsauvage/nextjs-strapi-ecommerce'],
  images: {
    thumbnail: {
      alt: 'My Ecommerce Homepage Screenshot',
      src: 'https://res.cloudinary.com/kevincloudname/image/upload/w_800/v1746818453/portfolio/ecommerce-shadcn-tailwind/nextjs-shadcn-ecommerce.png',
    },
  },
  technologies: [
    { name: 'Next.js' },
    { name: 'React' },
    { name: 'TypeScript' },
    { name: 'ShadCn' },
    { name: 'Tailwind CSS' },
    { name: 'GraphQL' },
    { name: 'Shopify Storefront API' },
    { name: 'Zod' },
  ],
  title: 'My Ecommerce',
  websiteLink:
    'https://nextjs-strapi-ecommerce-kevinsauvages-projects.vercel.app/?authorization=true',
};

const Streamy: Project = {
  description:
    'An interactive entertainment platform with personalized recommendations, social features, and real-time updates. Features include movie discovery, user reviews, and community engagement with 99.9% uptime and advanced recommendation algorithms.',
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
    { name: 'React' },
    { name: 'SASS' },
    { name: 'Express' },
    { name: 'MongoDB' },
    { name: 'TMDb API' },
  ],
  title: 'Streamy',
  websiteLink: 'https://streamy-v2-client-kevinsauvages-projects.vercel.app/',
};

const projects = [myEcommerceProject, Streamy];

export default projects;
