import projects from '@/config/projects.config';

import ProjectCard from '../../ProjectCard';

import Section from './_components/Section';
import SectionDescription from './_components/SectionDescription';
import SectionHeader from './_components/SectionHeader';
import SectionTitle from './_components/SectionTitle';

const PortfolioSection: React.FC = () => {
  const projectsWithContent = [
    {
      ...projects[0],
      description: "A full-stack ecommerce solution featuring advanced product filtering, real-time inventory management, and seamless checkout experience. Built with Next.js 14, TypeScript, and Shopify's GraphQL API, achieving 95+ Lighthouse scores and supporting 10,000+ concurrent users.",
      cta: "View Live Demo"
    },
    {
      ...projects[1],
      description: "An interactive entertainment platform with personalized recommendations, social features, and real-time updates. Features include movie discovery, user reviews, and community engagement with 99.9% uptime and sub-2s load times.",
      cta: "Explore Platform"
    }
  ];

  return (
    <Section id="portfolio">
      <SectionHeader>
        <SectionTitle>Featured Projects</SectionTitle>
        <SectionDescription>Explore my latest work showcasing modern web development practices, performance optimization, and user-centered design.</SectionDescription>
      </SectionHeader>
      <div className='flex flex-col gap-5'>
        {projectsWithContent.map(item => (
          <ProjectCard key={item.title} item={item} />
        ))}
      </div>
    </Section>
  );
};

export default PortfolioSection;
