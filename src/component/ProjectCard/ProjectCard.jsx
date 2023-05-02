import Image from 'next/image';

import ProjectBtns from '../ProjectBtns/ProjectBtns';

import styles from './ProjectCard.module.scss';

const ProjectCard = ({ item }) => (
  <div className={styles.card}>
    <div className={styles.image}>
      <Image
        src={item.img.laptop}
        alt={item.title}
        layout="responsive"
        width={2050}
        height={1200}
      />
    </div>
    <div>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.languages}>{item.languages}</p>
      <p className={styles.description}>{item.description}</p>
    </div>
    <ProjectBtns item={item} />
  </div>
);

export default ProjectCard;
