import { track } from '@vercel/analytics/react';
import Image from 'next/image';

import Buttons from '@/components/_scopes/project/Buttons/Buttons';
import InViewAnimation from '@/components/InViewAnimation/InViewAnimation';
import LinkClient from '@/components/LinkClient/LinkClient';

import styles from './Project.module.scss';

const Project = ({ item, updateSelectedImages }) => {
  const handleClickImage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateSelectedImages(item.images.gallery);
    track('Click image project', { item: item.title });
  };

  return (
    <li>
      <LinkClient
        href={item.websiteLink}
        target="_blank"
        trackInfo={{ label: item.title, title: 'Click project' }}
      >
        <InViewAnimation
          hidden={{ opacity: 0, y: '100px' }}
          visible={{ opacity: 1, y: '0px' }}
          tag="div"
          className={styles.card}
        >
          <div className={styles.image}>
            <Image
              src={item.images.thumbnail}
              alt={item.title}
              width={1600}
              height={900}
              onClick={handleClickImage}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <p className={styles.title}>{item.title}</p>
              <Buttons item={item} />
            </div>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.languages}>
              {item.languages.split(' ').map((lang) => (
                <p key={lang}>{lang}</p>
              ))}
            </div>
          </div>
        </InViewAnimation>
      </LinkClient>
    </li>
  );
};

export default Project;
