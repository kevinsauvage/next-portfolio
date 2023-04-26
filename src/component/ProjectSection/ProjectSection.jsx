import React from 'react';
import Image from 'next/image';

import styles from './ProjectSection.module.scss';

const ProjectSection = ({ image, title, description, direction }) => (
  <section className={`${styles.section} ${direction === 'row-reverse' ? styles.reverse : ''}`}>
    <div className={styles.image}>
      <Image
        src={image}
        layout="responsive"
        width={1000}
        height={625}
        alt={title}
        objectFit="cover"
        objectPosition={direction === 'row' ? 'right' : 'left'}
      />
    </div>
    <div className={`${styles.detail} ${direction === 'row-reverse' ? styles.reverse : ''}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  </section>
);
export default ProjectSection;
