import Section from '@/components/_scopes/section/Section/Section';
import projects from '@/config/projects';

import ProjectCard from './Project/Project';

import styles from './Projects.module.scss';

const Projects = ({ ...rest }) => (
  <Section {...rest}>
    <div className={styles.Projects}>
      {projects.map((item) => (
        <ProjectCard key={item.title} item={item} />
      ))}
    </div>
  </Section>
);

export default Projects;
