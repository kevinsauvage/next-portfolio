import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import projects from '@/config/projects';
import sections from '@/config/sections';

import ProjectCard from './Project/Project';

import styles from './Projects.module.scss';

const label = 'My Projects';
const section = sections.find((data) => data.label === label);
const { icon, title, tagLevel } = section || {};

const Projects = () => (
  <SectionPresenter>
    <Section>
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} tagLevel={tagLevel} />
      <ul className={styles.Projects}>
        {projects.map((item) => (
          <ProjectCard key={item.title} item={item} />
        ))}
      </ul>
    </Section>
  </SectionPresenter>
);

export default Projects;
