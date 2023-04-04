import Image from 'next/image';

import ProjectBtns from '../ProjectBtns/ProjectBtns';

import styles from './ProjectBanner.module.scss';

const ProjectBanner = ({ project }) => (
  <div className={styles.banner}>
    <div className={styles.imageContainer}>
      <Image
        src={project.page.banner.image}
        layout="responsive"
        width={1482}
        height={867}
        alt="project home"
        priority
      />
    </div>
    <div className={styles.detail}>
      <h1 className={styles.title}>{project.title}</h1>
      <p className={styles.languages}>{project.languages}</p>
      <p className={styles.description}>{project.largeDescription}</p>
      <div className={styles.buttons}>
        <ProjectBtns item={project} />
      </div>
    </div>
  </div>
);

export default ProjectBanner;
