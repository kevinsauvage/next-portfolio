import React from 'react';
import Image from 'next/image';

import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';

import styles from './ProjectSection.module.scss';

const ProjectSection = ({ image, title, description, direction }) => (
  <SlideUpAndFadeIn>
    <section className={`${styles.section} ${direction === 'row-reverse' ? styles.reverse : ''}`}>
      <div className={styles.image}>
        <Image
          src={image}
          layout="responsive"
          width={1482}
          height={867}
          alt={title}
          objectPosition={direction === 'row' ? 'right' : 'left'}
        />
      </div>
      <div className={`${styles.detail} ${direction === 'row-reverse' ? styles.reverse : ''}`}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  </SlideUpAndFadeIn>
);
export default ProjectSection;
