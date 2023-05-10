import projects from '../../data/projects';
import { projectsIcon } from '../../data/svg';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import ProjectCard from './ProjectCard/ProjectCard';

import styles from './Projects.module.scss';

const Projects = () => (
  <Section id="projects">
    <UpTitle text="Projects" icon={projectsIcon} />
    <Title subtitle="Take a tour of my development projects, featuring a diverse range of creations that showcase my skills and creativity.">
      Things I’ve Built
    </Title>
    <div className={styles.cards}>
      {projects.map((item) => (
        <ProjectCard key={item.title} item={item} />
      ))}
    </div>
  </Section>
);

export default Projects;
