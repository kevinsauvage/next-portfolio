'use client';

import Project from '@/components/_cards/Project/Project';
import projects from '@/components/_sections/Projects/projects.config';
import useMousePosition from '@/hooks/useMousePosition';

import styles from './ProjectList.module.scss';

const ProjectList: React.FC = () => {
  const { position } = useMousePosition();

  return (
    <div className={styles.ProjectList}>
      {projects.map((item) => (
        <Project key={item.title} item={item} mousePosition={position} />
      ))}
    </div>
  );
};

export default ProjectList;
