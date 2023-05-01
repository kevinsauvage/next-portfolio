import React from 'react';
import Image from 'next/image';

import FadeIn from '../FadeIn/FadeIn';

import styles from './ProjectSection.module.scss';

const ProjectSection = ({ image, title, description, direction }) => (
  <section className={`${styles.section} ${direction === 'row-reverse' ? styles.reverse : ''}`}>
    <div className={styles.image}>
      <FadeIn>
        <Image
          src={image}
          layout="responsive"
          width={1000}
          height={625}
          alt={title}
          objectFit="cover"
          objectPosition={direction === 'row' ? 'right' : 'left'}
        />
      </FadeIn>
    </div>
    <div className={`${styles.detail} ${direction === 'row-reverse' ? styles.reverse : ''}`}>
      <FadeIn>
        <h3 className={styles.title}>{title}</h3>
      </FadeIn>
      <FadeIn>
        <p className={styles.description}>{description}</p>
      </FadeIn>
    </div>
  </section>
);
export default ProjectSection;
