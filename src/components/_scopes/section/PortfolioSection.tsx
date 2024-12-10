import { useTranslations } from 'next-intl';

import projects from '@/config/projects.config';

import ProjectCard from '../../ProjectCard';

import Section from './_components/Section';
import SectionDescription from './_components/SectionDescription';
import SectionHeader from './_components/SectionHeader';
import SectionTitle from './_components/SectionTitle';

const PortfolioSection: React.FC = () => {
  const t = useTranslations('home.portfolio');
  const id = useTranslations('shared.header.nav');

  const projectsKeys = ['first', 'second', 'third'];

  const projectsTranslated = projects.map((item, index) => ({
    ...item,
    cta: t(`projects.${projectsKeys.at(index)}.cta`),
    description: t(`projects.${projectsKeys.at(index)}.description`),
  }));

  return (
    <Section id={id('portfolio')?.toLowerCase()}>
      <SectionHeader>
        <SectionTitle>{t('title')}</SectionTitle>
        <SectionDescription>{t('description')}</SectionDescription>
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
