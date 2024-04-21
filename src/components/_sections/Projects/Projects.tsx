import ProjectList from '@/components/_scopes/project/ProjectList/ProjectList';
import Section from '@/components/_scopes/section/Section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import sections, { Sections } from '@/config/sections';

const label = 'My Projects';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, position } = section || {};

const Projects = () => (
  <Section id={section.id}>
    <SectionUpTitle icon={icon} text={label} />
    <SectionTitle title={title} position={position} />
    <ProjectList />
  </Section>
);

export default Projects;
