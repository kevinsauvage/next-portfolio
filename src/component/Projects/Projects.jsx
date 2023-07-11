import projects from '../../data/projects';
import { projectsIcon } from '../../data/svg';
import Carousel from '../Carousel/Carousel';
import Section from '../Section/Section';

import ProjectCard from './ProjectCard/ProjectCard';

const Projects = () => (
  <Section
    id="projects"
    icon={projectsIcon}
    title="Things I’ve Built"
    subtitle="Take a tour of my development projects, featuring a diverse range of creations that showcase my skills and creativity."
  >
    <Carousel itemToShow={1} showIndicators>
      {projects.map((item) => (
        <ProjectCard key={item.title} item={item} />
      ))}
    </Carousel>
  </Section>
);

export default Projects;
