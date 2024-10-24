import ProjectList from '@/components/_scopes/project/ProjectList';
import Section from '@/components/_scopes/section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle';
import sections, { Sections } from '@/config/sections';

const label = 'My Projects';
const section = sections.find((data) => data.label === label) as Sections[0];
const { title, position } = section || {};

const Projects = () => (
  <Section id={section.id}>
    <SectionTitle title={title} position={position} />
    <ProjectList />
  </Section>
);

export default Projects;
