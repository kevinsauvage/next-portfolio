import Image from 'next/image';
import Link from 'next/link';

import testPng from '@/assets/images/bannerImage.svg';
import Container from '@/components/Container/Container';

import styles from './Hero.module.scss';

const Banner = () => (
  <section className={styles.Hero}>
    <div className={styles.blur1} />

    <Container>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.upTitle}>Hello There!</p>
          <h1>
            Building the Future,
            <br /> One Line of Code at a Time
          </h1>
          <p className={styles.subtitle}>
            I&apos;m a developer passionate about crafting exceptional websites. Currently, I&apos;m
            immersed in the exciting world of crafting accessible, human-centered products at{' '}
            <Link
              href="https://www.decathlon.fr/"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Open Decathlon website in a new tab"
            >
              Decathlon
            </Link>
          </p>
          <div className={styles.buttons}>
            <Link
              href="mailto:kevinsauvage@outlook.com"
              className={styles.button}
              target="_blank"
              aria-label="Get in Touch - Open your e-mail provider in a new tab"
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

        <div className={styles.imageContainer}>
          <div className={styles.blur2} />
          <Image
            className={styles.image}
            src={testPng}
            width={500}
            height={500}
            alt="test"
            priority
          />
        </div>
      </div>
    </Container>
  </section>
);

export default Banner;
