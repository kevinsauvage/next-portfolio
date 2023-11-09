import Image from 'next/image';
import Link from 'next/link';

import Buttons from '@/components/_scopes/project/Buttons/Buttons';

import styles from './Project.module.scss';

const Project = ({ item, updateSelectedImages }) => {
  const handleClickImage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateSelectedImages(item.images.gallery);
  };

  return (
    <li>
      <Link href={item.websiteLink} target="_blank" rel="noopener noreferrer">
        <div className={styles.card}>
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
        </div>
      </Link>
    </li>
  );
};

export default Project;
