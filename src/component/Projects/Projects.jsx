import projects from '../../data/projects';
import { projectsIcon } from '../../data/svg';
import Section from '../Section/Section';

import ProjectCard from './ProjectCard/ProjectCard';

import styles from './Projects.module.scss';

const Projects = () => (
  <Section
    id="projects"
    icon={projectsIcon}
    title="Things I’ve Built"
    subtitle="Take a tour of my development projects, featuring a diverse range of creations that showcase my skills and creativity."
  >
    <div className={styles.cards}>
      {projects.map((item) => (
        <ProjectCard key={item.title} item={item} />
      ))}
    </div>
  </Section>
);

export default Projects;
