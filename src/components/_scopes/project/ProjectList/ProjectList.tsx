'use client';

import Project from '@/components/_cards/Project/Project';
import projects from '@/components/_sections/Projects/projects.config';
import AnimatedContainer from '@/components/AnimatedContainer/AnimatedContainer';
import useMousePosition from '@/hooks/useMousePosition';

import styles from './ProjectList.module.scss';

const ProjectList: React.FC = () => {
  const { position } = useMousePosition();

  return (
    <AnimatedContainer
      className={styles.ProjectList}
      from={{ opacity: 0, x: 500 }}
      to={{
        duration: 1,
        opacity: 1,
        stagger: {
          amount: 0.5,
          each: 0.5,
        },
        x: 0,
      }}
      timelineOptions={{
        scrollTrigger: {
          start: 'top bottom',
        },
      }}
      triggerClassName=".project"
    >
      {projects.map((item) => (
        <Project key={item.title} item={item} mousePosition={position} className="project" />
      ))}
    </AnimatedContainer>
  );
};

export default ProjectList;
