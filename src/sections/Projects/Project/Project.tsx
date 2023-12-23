import Image from 'next/image';
import Link from 'next/link';

import Buttons from '@/components/_scopes/project/Buttons/Buttons';

import styles from './Project.module.scss';

type Properties = {
  item: {
    title: string;
    description: string;
    languages: Array<{ icon: JSX.Element; name: string }>;
    images: { thumbnail: string };
    websiteLink: string;
    githubLink: Array<string>;
  };
};

const Project = ({ item }: Properties) => {
  const { title, description, languages, images, websiteLink } = item || {};

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
              {languages.map(({ icon, name }) => (
                <div key={name} className={styles.language}>
                  {icon}
                  <p>{name}</p>
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
