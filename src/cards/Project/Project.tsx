import Image from 'next/image';
import Link from 'next/link';

import Buttons from '@/components/_scopes/project/Buttons/Buttons';

import { ProjectType } from './types';

import styles from './Project.module.scss';

type Properties = {
  item: ProjectType;
};

const Project = ({ item }: Properties) => {
  const { title, description, technologies, images, websiteLink } = item || {};

  return (
    <li>
      <Link href={websiteLink} target="_blank" rel="noopener noreferrer" title={`Go to ${title}`}>
        <div className={styles.card}>
          <div className={styles.image}>
            <Image
              src={images.thumbnail}
              alt={title}
              width={1600}
              height={900}
              title="Click to see more images"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <p className={styles.title}>{title}</p>
              <Buttons item={item} />
            </div>

            <p className={styles.description}>{description}</p>
            <div className={styles.languages}>
              {technologies.map(({ name }, index) => (
                <div key={name} className={styles.language}>
                  <p>{name}</p>
                  {index < technologies.length - 1 && <span className={styles.dot} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Project;
