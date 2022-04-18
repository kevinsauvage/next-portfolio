import Image from "next/image";
import ProjectBtns from "../../component/ProjectBtns/ProjectBtns";
import styles from "./ProjectBanner.module.scss";

export default function ProjectBanner({ project }) {
  return (
    <div className={styles.banner}>
      <div className={styles.imageContainer}>
        <Image
          src={project.page.banner.image}
          layout="responsive"
          width={1482}
          height={867}
          alt="project home"
        />
      </div>
      <div className={styles.detail}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.languages}>{project.languages}</p>
        <p className={styles.description}>{project.description}</p>
        <ProjectBtns item={project} />
      </div>
    </div>
  );
}
