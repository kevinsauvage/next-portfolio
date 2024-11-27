import { getDictionary } from '@/dictionaries/dictionaries';
import projects from '@/config/projects.config';

import ProjectCard from '../../ProjectCard';

import Section from './_components/Section';
import SectionDescription from './_components/SectionDescription';
import SectionHeader from './_components/SectionHeader';
import SectionTitle from './_components/SectionTitle';

const PortfolioSection: React.FC<{
  lang: string;
}> = async ({ lang }) => {
  const t = await getDictionary(lang);

  const projectsTranslated = projects.map((item, index) => ({
    ...item,
    cta: t.home.portfolio.projects[index].cta,
    description: t.home.portfolio.projects[index].description,
  }));

  return (
    <Section id={t.shared.header.nav.portfolio.toLowerCase()}>
      <SectionHeader>
        <SectionTitle>{t.home.portfolio.title}</SectionTitle>
        <SectionDescription>{t.home.portfolio.description}</SectionDescription>
      </SectionHeader>
      <div className="flex flex-col gap-5">
        {projectsTranslated.map((item) => (
          <ProjectCard key={item.title} item={item} />
        ))}
      </div>
    </Section>
  );
};

export default PortfolioSection;
