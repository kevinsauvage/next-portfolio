import projects from '../../data/projects';
import ProjectCard from '../ProjectCard/ProjectCard';
import Section from '../Section/Section';
import Title from '../Title/Title';

import styles from './Projects.module.scss';

const Projects = () => (
  <Section id="projects">
    <Title>Featured Projects</Title>
    <div className={styles.cards}>
      {projects.map((item) => (
        <ProjectCard key={item?.title} item={item} />
      ))}
    </div>
  </Section>
);

export default Projects;
