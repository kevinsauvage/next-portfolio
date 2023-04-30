/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';

import Button from '../Button/Button';

import styles from './Banner.module.scss';

const Banner = () => {
  const { push } = useRouter();
  return (
    <section className={styles.Banner}>
      <div className={styles.main}>
        <small>Greetings, my name is</small>
        <h1>Kévin Sauvage</h1>
        <h2>Full stack Developer.</h2>
        <p className={styles.subtitle}>
          I create visually stunning and user-friendly web applications that are both functional and
          engaging. My expertise in web development allows me to deliver top-notch solutions that
          exceed expectations.
        </p>
        <div className={styles.button}>
          <Button label="Contact me!" variant="outlined" onClick={() => push('/#contact')} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
