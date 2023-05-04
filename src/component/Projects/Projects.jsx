import projects from '../../data/projects';
import { projectsIcon } from '../../data/svg';
import FadeIn from '../FadeIn/FadeIn';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import ProjectCard from './ProjectCard/ProjectCard';

import styles from './Projects.module.scss';

const Projects = () => (
  <Section id="projects">
    <UpTitle text="Work" icon={projectsIcon} />
    <Title subtitle="Explore my portfolio of projects and creations, showcasing my design and development work, and the things I've built.">
      Things I’ve Built
    </Title>
    <div className={styles.cards}>
      {projects.map((item, index) => (
        <FadeIn key={item?.title} delay={`${0.3 * index}s`}>
          <ProjectCard item={item} />
        </FadeIn>
      ))}
    </div>
  </Section>
);

export default Projects;
