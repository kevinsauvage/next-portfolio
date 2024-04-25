import Image from 'next/image';
import Link from 'next/link';

import testPng from '@/assets/images/bannerImage.svg';
import Title from '@/components/_scopes/hero/Title/Title';
import AnimatedContainer from '@/components/AnimatedContainer/AnimatedContainer';
import Container from '@/components/Container/Container';

import styles from './Hero.module.scss';

const elasticOut = 'elastic.out(1, 0.6)';
const willChange = 'transform, opacity';

const Subtitle = () => (
  <AnimatedContainer
    className={styles.subtitle}
    from={{ delay: 0.5, ease: elasticOut, opacity: 0, x: -100 }}
    to={{ delay: 0.5, duration: 1, ease: elasticOut, opacity: 1, x: 0 }}
    style={{
      opacity: 0,
      willChange,
    }}
  >
    I&apos;m a developer passionate about crafting exceptional websites.
    <br /> Currently, I&apos;m immersed in the exciting world of crafting accessible, human-centered
    products at{' '}
    <Link
      href="https://www.decathlon.fr/"
      rel="noopener noreferrer"
      target="_blank"
      aria-label="Open Decathlon website in a new tab"
    >
      Decathlon
    </Link>
  </AnimatedContainer>
);

const HeroActions = () => (
  <AnimatedContainer
    className={styles.buttons}
    from={{ delay: 0.6, ease: elasticOut, opacity: 0, x: -100 }}
    to={{ delay: 0.6, duration: 1, ease: elasticOut, opacity: 1, x: 0 }}
    style={{
      opacity: 0,
      willChange,
    }}
  >
    <Link
      href="/#contact"
      className={styles.button}
      aria-label="Get in Touch - Scroll to the contact section"
    >
      Contact me
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
  </AnimatedContainer>
);

const HeroImage = () => (
  <AnimatedContainer
    className={styles.imageContainer}
    from={{ delay: 0.2, ease: elasticOut, opacity: 0, scale: 0 }}
    to={{ delay: 0.6, duration: 1, ease: elasticOut, opacity: 1, scale: 1 }}
    style={{
      opacity: 0,
      willChange,
    }}
  >
    <div className={styles.blur2} />
    <Image className={styles.image} src={testPng} width={500} height={500} alt="test" priority />
  </AnimatedContainer>
);

const Banner = () => {
  return (
    <section className={styles.Hero}>
      <div className={styles.blur1} />
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <Title />
            <Subtitle />
            <HeroActions />
          </div>
          <HeroImage />
        </div>
      </Container>
    </section>
  );
};

export default Banner;
