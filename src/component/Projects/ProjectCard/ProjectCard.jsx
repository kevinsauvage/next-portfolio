import Image from 'next/image';

import { externalLink, github } from '../../../data/svg';
import FadeIn from '../../FadeIn/FadeIn';

import styles from './ProjectCard.module.scss';

const ProjectCard = ({ item }) => {
  const handleClickSourceCode = (event) => {
    event.stopPropagation();
    item.githubLink.forEach((element) => window.open(element));
  };

  const handleClickVisit = (event) => {
    event.stopPropagation();
    window.open(item.websiteLink);
  };

  return (
    <FadeIn className={styles.card}>
      <div className={styles.image}>
        <Image
          src={item.img.laptop}
          alt={item.title}
          layout="responsive"
          width={2050}
          height={1200}
        />
      </div>
      <div className={styles.content}>
        <div>
          <h6 className={styles.title}>{item.title}</h6>
          <p className={styles.languages}>{item.languages}</p>
          <p className={styles.description}>{item.description}</p>
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={handleClickSourceCode}>
            {github}
          </button>
          <button type="button" onClick={handleClickVisit}>
            {externalLink}
          </button>
        </div>
      </div>
    </FadeIn>
  );
};

export default ProjectCard;
