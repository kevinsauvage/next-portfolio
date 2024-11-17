import projects from '@/config/projects.config';

import ProjectCard from '../../ProjectCard';

import Section from './Section';
import SectionDescription from './SectionDescription';
import SectionHeader from './SectionHeader';
import SectionTitle from './SectionTitle';

const ProjectSection: React.FC = () => {
  return (
    <Section id="work">
      <SectionHeader>
        <SectionTitle>My Selected Work</SectionTitle>
        <SectionDescription>
          Here are some of the projects I have worked on. Click on a project to learn more about it.
        </SectionDescription>
      </SectionHeader>
      <div className="flex flex-col gap-5">
        {projects.map((item) => (
          <ProjectCard key={item.title} item={item} className="project" />
        ))}
      </div>
    </Section>
  );
};

export default ProjectSection;
