import Image from 'next/image';
import { useRouter } from 'next/router';

import ProjectBtns from '../ProjectBtns/ProjectBtns';
import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';

import styles from './ProjectCard.module.scss';

const ProjectCard = ({ item }) => {
  const router = useRouter();
  return (
    <SlideUpAndFadeIn>
      <div
        role="button"
        tabIndex={0}
        className={styles.card}
        onClick={() => router.push(`/project/${item.title}`)}
        onKeyDown={(event) => event.key === 'Enter' && router.push(`/project/${item.title}`)}
      >
        <div>
          <Image
            src={item.img.laptop}
            alt={item.title}
            width="800"
            height="344"
            layout="responsive"
          />
        </div>
        <div>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.description}>{item.description}</p>
          <p className={styles.languages}>{item.languages}</p>
        </div>
        <ProjectBtns item={item} />
      </div>
    </SlideUpAndFadeIn>
  );
};

export default ProjectCard;
