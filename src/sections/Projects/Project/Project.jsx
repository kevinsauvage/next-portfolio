import Image from 'next/image';

import Animation from '@/components/Animation/Animation';
import IconBxLinkExternal from '@/svg/IconBxLinkExternal';
import IconGithub from '@/svg/IconGithub';

import styles from './Project.module.scss';

const Project = ({ item }) => {
  const handleClickSourceCode = (event) => {
    event.stopPropagation();
    item.githubLink.forEach((element) => window.open(element));
  };

  const handleClickVisit = (event) => {
    event.stopPropagation();
    window.open(item.websiteLink);
  };

  return (
    <Animation
      duration={400}
      delay={0}
      iterationCount="1"
      timingFunction="ease-in-out"
      fillMode="forwards"
      animationKeyframes={['slide', 'fade-in']}
      initialStyle={{ opacity: 0, transform: 'translate(0px, 500px)' }}
    >
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
        <div className={styles.content}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.languages}>{item.languages}</p>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.buttons}>
            {item.githubLink?.length > 0 && (
              <button type="button" aria-label="Open Github" onClick={handleClickSourceCode}>
                <IconGithub />
              </button>
            )}
            <button type="button" aria-label="Open Linkedin" onClick={handleClickVisit}>
              <IconBxLinkExternal />
            </button>
          </div>
        </div>
      </div>
    </Animation>
  );
};

export default Project;
