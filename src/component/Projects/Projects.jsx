import projects from '../../data/projects';
import ProjectCard from '../ProjectCard/ProjectCard';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../UpTitle/UpTitle';

import styles from './Projects.module.scss';

const Projects = () => (
  <Section id="projects">
    <UpTitle text="REALIZATIONS" />
    <Title>My Projects</Title>
    <div className={styles.cards}>
      {projects.map((item) => (
        <ProjectCard key={item?.title} item={item} />
      ))}
    </div>
  </Section>
);

export default Projects;
