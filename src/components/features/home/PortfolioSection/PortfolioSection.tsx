import Link from 'next/link';

import Button from '@/components/ui/Button';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import projects from '@/config/content/projects';
import { stackSpacing } from '@/design-system/tokens';

import { ExternalLink, Github } from 'lucide-react';

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
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PortfolioSection;
