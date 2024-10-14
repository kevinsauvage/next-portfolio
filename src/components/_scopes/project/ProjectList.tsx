import Project from '@/components/_scopes/project/Project';
import projects from '@/config/projects.config';

const ProjectList: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((item) => (
        <Project key={item.title} item={item} className="project" />
      ))}
    </div>
  );
};

export default ProjectList;
