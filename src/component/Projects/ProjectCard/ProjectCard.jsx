import Image from 'next/image';

import useOnScreen from '../../../hooks/useOnScreen';
import IconBxLinkExternal from '../../../svg/IconBxLinkExternal';
import IconGithub from '../../../svg/IconGithub';

import styles from './ProjectCard.module.scss';

const ProjectCard = ({ item }) => {
  const imgReference = useOnScreen('fade-in', 'fade-in--active');
  const reference = useOnScreen('fade-in', 'fade-in--active');

  const handleClickSourceCode = (event) => {
    event.stopPropagation();
    item.githubLink.forEach((element) => window.open(element));
  };

  const handleClickVisit = (event) => {
    event.stopPropagation();
    window.open(item.websiteLink);
  };

  return (
    <div className={styles.card}>
      <div className={styles.image} ref={imgReference}>
        <Image
          src={item.img.laptop}
          alt={item.title}
          layout="responsive"
          width={2050}
          height={1200}
        />
      </div>
      <div className={styles.content}>
        <div ref={reference}>
          <div>
            <h6 className={styles.title}>{item.title}</h6>
            <p className={styles.languages}>{item.languages}</p>
            <p className={styles.description}>{item.description}</p>
          </div>
          <div className={styles.buttons}>
            <button type="button" onClick={handleClickSourceCode}>
              <IconGithub />
            </button>
            <button type="button" onClick={handleClickVisit}>
              <IconBxLinkExternal />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
