import projects from '@/config/projects';

import ProjectCard from './Project/Project';

import styles from './Projects.module.scss';

const Projects = () => (
  <div className={styles.Projects}>
    {projects.map((item) => (
      <ProjectCard key={item.title} item={item} />
    ))}
  </div>
);

export default Projects;
