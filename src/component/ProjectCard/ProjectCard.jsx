import Image from 'next/image';
import { useRouter } from 'next/router';

import ProjectBtns from '../ProjectBtns/ProjectBtns';

import styles from './ProjectCard.module.scss';

const ProjectCard = ({ item }) => {
  const router = useRouter();
  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.card}
      onClick={() => router.push(`/project/${item.title}`)}
      onKeyDown={(event) => event.key === 'Enter' && router.push(`/project/${item.title}`)}
    >
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
};

export default ProjectCard;
