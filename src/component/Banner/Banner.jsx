/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';

import portrait from '../../images/banner.svg';

import styles from './Banner.module.scss';

const Banner = () => (
  <section className={styles.Banner}>
    <main className={styles.main}>
      <small>Hello, I'm</small>
      <h1>Kévin Sauvage.</h1>
      <h2> I'm a developer</h2>
      <p className={styles.subtitle}>
        Crafting unique visual experiences
        <br /> that inspire, communicate,
        <br /> and delight.
      </p>
    </main>
    <aside className={styles.aside}>
      <Image
        width="851"
        height="741"
        layout="responsive"
        src={portrait.src}
        alt="illustration"
        priority
      />
    </aside>
  </section>
);

export default Banner;
