type Project = {
  slug: string;
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
  slug: 'modern-ecommerce-platform',
  description:
    "A modern e-commerce demo built with Next.js 15 and TypeScript. Features product filtering, cart management, and checkout powered by Shopify's Storefront API. Achieves high Lighthouse scores for performance, accessibility, and SEO.",
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
  title: 'Modern E-Commerce Platform',
  websiteLink:
    'https://nextjs-strapi-ecommerce-kevinsauvages-projects.vercel.app/?authorization=true',
};

const projects = [myEcommerceProject];

export default projects;
