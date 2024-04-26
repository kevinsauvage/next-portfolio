import Image from 'next/image';
import Link from 'next/link';

import { ProjectType } from './types';

import styles from './Project.module.scss';

import { MoveUpRight } from 'lucide-react';

type Properties = {
  item: ProjectType;
} & React.HTMLAttributes<HTMLAnchorElement>;

const Project = ({ item, className }: Properties) => {
  const { title, technologies, images, websiteLink } = item || {};

  return (
    <article>
      <Link
        className={`${styles.card} ${className}`}
        href={websiteLink}
        target="_blank"
        rel="noopener noreferrer"
        title={`Go to ${title}`}
        aria-label={`Open ${title} website in a new tab`}
      >
        <Image
          className={`${styles.image}`}
          src={images.thumbnail.src}
          alt={images.thumbnail.alt}
          width={1600}
          height={900}
        />
        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className={styles.title}>{title}</h3>

            <div className={styles.languages}>
              {technologies.map(({ name }) => (
                <div key={name} className={styles.language}>
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.linkPlaceHolder}>
            View project <MoveUpRight size={20} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Project;
