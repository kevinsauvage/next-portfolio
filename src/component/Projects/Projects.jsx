import projects from '../../data/projects';
import { projectsIcon } from '../../data/svg';
import ProjectCard from '../ProjectCard/ProjectCard';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import styles from './Projects.module.scss';

const Projects = () => (
  <Section id="projects">
    <UpTitle text="Work" icon={projectsIcon} />
    <Title>Featured Projects</Title>
    <div className={styles.cards}>
      {projects.map((item) => (
        <ProjectCard key={item?.title} item={item} />
      ))}
    </div>
  </Section>
);

export default Projects;
