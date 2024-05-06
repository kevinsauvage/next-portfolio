import Project from '@/components/_scopes/project/Project';
import AnimatedContainer from '@/components/AnimatedContainer';
import projects from '@/config/projects.config';

const ProjectList: React.FC = () => {
  return (
    <AnimatedContainer
      className="flex flex-col gap-4"
      from={{ opacity: 0, x: 500 }}
      to={{ duration: 1, opacity: 1, stagger: { amount: 0.5, each: 0.5 }, x: 0 }}
      timelineOptions={{ scrollTrigger: { start: 'top bottom' } }}
      triggerClassName=".project"
    >
      {projects.map((item) => (
        <Project key={item.title} item={item} className="project" />
      ))}
    </AnimatedContainer>
  );
};

export default ProjectList;
