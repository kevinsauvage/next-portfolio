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
    "A modern, performant ecommerce platform built with Next.js, Tailwind CSS, and Shopify's Storefront API. It features product listings, filtering, a shopping cart, and a secure checkout flow — all styled with a clean, minimal design and smooth UX.",
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
