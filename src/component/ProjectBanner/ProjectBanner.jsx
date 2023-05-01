import Image from 'next/image';

import FadeIn from '../FadeIn/FadeIn';
import ProjectBtns from '../ProjectBtns/ProjectBtns';

import styles from './ProjectBanner.module.scss';

const ProjectBanner = ({ project }) => (
  <div className={styles.banner}>
    <FadeIn>
      <div className={styles.image}>
        <Image
          src={project.page.banner.image}
          layout="responsive"
          width={750}
          height={470}
          alt="project home"
          objectFit="cover"
          priority
        />
      </div>
    </FadeIn>
    <div className={styles.detail}>
      <FadeIn>
        <h1 className={styles.title}>{project.title}</h1>
      </FadeIn>
      <FadeIn>
        <p className={styles.languages}>{project.languages}</p>
      </FadeIn>
      <FadeIn>
        <p className={styles.description}>{project.largeDescription}</p>
      </FadeIn>
      <div className={styles.buttons}>
        <FadeIn>
          <ProjectBtns item={project} />
        </FadeIn>
      </div>
    </div>
  </div>
);

export default ProjectBanner;
