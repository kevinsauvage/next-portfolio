import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import projects from '@/config/content/projects';
import { stackSpacing } from '@/design-system/tokens';

import ProjectCard from './ProjectCard';

const PortfolioSection: React.FC = () => {
  return (
    <Section id='portfolio'>
      <div className={stackSpacing['2xl']}>
        <div className='animate-fade-in-up opacity-0' style={{ animationFillMode: 'both' }}>
          <SectionHeader
            overline={sections.portfolio.overline}
            title={sections.portfolio.title}
            description={sections.portfolio.description}
          />
        </div>

        <div className={stackSpacing.lg}>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PortfolioSection;
