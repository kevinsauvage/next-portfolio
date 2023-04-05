/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';

import portrait from '../../images/banner_home.png';
import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';

import styles from './Banner.module.scss';

const Banner = () => (
  <section className={styles.Banner}>
    <main className={styles.main}>
      <SlideUpAndFadeIn>
        <p>Hi, my name is</p>
        <h1>Kévin Sauvage.</h1>
        <h2> I'm a developer.</h2>
        <p className={styles.subtitle}>
          Bridging technology and creativity to build remarkable digital experiences that inspire,
          engage, and transform.
        </p>
      </SlideUpAndFadeIn>
    </main>
    <aside className={styles.aside}>
      <SlideUpAndFadeIn>
        <Image
          width="851"
          height="741"
          layout="responsive"
          src={portrait.src}
          alt="illustration"
          priority
        />
      </SlideUpAndFadeIn>
    </aside>
  </section>
);

export default Banner;
