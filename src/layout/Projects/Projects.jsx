import styles from "./Projects.module.scss";
import projects from "../../data/projects";
import ProjectCard from "../../component/ProjectCard/ProjectCard";
import Section from "../Section/Section";
import Title from "../../component/Title/Title";
import UpTitle from "../../component/UpTitle/UpTitle";

const Projects = () => {
  return (
    <Section id="projects" className={styles["Projects"]}>
      <UpTitle text="REALIZATIONS" />
      <Title>My Projects</Title>
      <div className={styles["Projects__cards"]}>
        {projects.map((item, i) => (
          <ProjectCard key={i} item={item} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
