import Link from 'next/link';

import styles from './Banner.module.scss';

const Banner = () => (
  <div className={styles.Banner}>
    <p className={styles.upTitle}>
      Hello There!
      <span role="img" aria-label="wave">
        👋
      </span>
    </p>
    <h1>
      Building the Future
      <br /> One Line of Code at a Time
    </h1>
    <p className={styles.subtitle}>
      I&apos;m a Software Engineer passionate about crafting exceptional websites. Currently,
      I&apos;m immersed in the exciting world of crafting accessible, human-centered products at{' '}
      <Link
        href="https://www.decathlon.fr/"
        rel="noopener noreferrer"
        target="_blank"
        aria-label="Open Decathlon website in a new tab"
      >
        Decathlon
      </Link>
      <span role="img" aria-label="rocket">
        🚀
      </span>
    </p>
    <div className={styles.buttons}>
      <Link
        href="mailto:kevinsauvage@outlook.com"
        className={styles.button}
        target="_blank"
        aria-label="Open your mail provider in a new tab"
      >
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
);

export default Banner;
