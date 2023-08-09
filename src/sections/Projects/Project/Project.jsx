import Image from 'next/image';
import Link from 'next/link';

import Animation from '@/components/Animation/Animation';
import IconBxLinkExternal from '@/svg/IconBxLinkExternal';
import IconGithub from '@/svg/IconGithub';

import styles from './Project.module.scss';

const Project = ({ item }) => {
  const handleClickSourceCode = (event) => {
    event.preventDefault();

    item.githubLink.forEach((element) => window.open(element));
  };

  const handleClickVisit = (event) => {
    event.preventDefault();

    window.open(item.websiteLink);
  };

  return (
    <Animation
      duration={1000}
      delay={100}
      animationKeyframes={['slide', 'fade-in']}
      initialStyle={{ opacity: 0, transform: 'translate(0px, 200px)' }}
    >
      <Link href={item.websiteLink} target="_blank">
        <div className={styles.card}>
          <div className={styles.image}>
            <Image src={item.img.laptop} alt={item.title} width={2050} height={1200} />
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <p className={styles.title}>{item.title}</p>
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
            <p>{item.description}</p>
            <div className={styles.languages}>
              {item.languages.split(' ').map((lang) => (
                <p key={lang}>{lang}</p>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </Animation>
  );
};

export default Project;
