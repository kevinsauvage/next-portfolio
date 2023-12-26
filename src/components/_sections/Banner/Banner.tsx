import Link from 'next/link';

import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';

import styles from './Banner.module.scss';

const Banner = () => (
  <SectionPresenter>
    <div className={styles.Banner}>
      <h1>
        Building the Future
        <br /> One Line of Code at a Time
      </h1>
      <p className={styles.subtitle}>
        I&apos;m a Software Engineer passionate about crafting exceptional websites. Currently,
        I&apos;m immersed in the exciting world of crafting accessible, human-centered products at{' '}
        <Link href="https://www.decathlon.fr/" rel="noopener noreferrer" target="_blank">
          Decathlon
        </Link>{' '}
        ✨
      </p>
      <div className={styles.buttons}>
        <Link href="mailto:kevinsauvage@outlook.com" className={styles.button} target="_blank">
          Get in Touch
        </Link>
        <Link
          href="/kevin-sauvage-cv.pdf"
          className={styles.button}
          aria-label="Download cv"
          target="_blank"
          prefetch={false}
          rel="noopener noreferrer"
          title=" Download cv"
          download
        >
          Download cv
        </Link>
      </div>
    </div>
  </SectionPresenter>
);

export default Banner;
