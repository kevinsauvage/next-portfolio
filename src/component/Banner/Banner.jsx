import Button from '../Button/Button';

import styles from './Banner.module.scss';

const Banner = () => (
  <section className={styles.Banner}>
    <div className={styles.main}>
      <small>Greetings, my name is</small>
      <h1>Kévin Sauvage</h1>
      <h2>Front end Developer.</h2>
      <p className={styles.subtitle}>
        I create visually stunning and user-friendly web applications that are both functional and
        engaging. My expertise in web development allows me to deliver top-notch solutions that
        exceed expectations.
      </p>
      <Button
        className={styles.button}
        label="Contact me!"
        variant="outlined"
        onClick={() => window.open('mailto:kevinsauvage@outlook.com')}
      />
    </div>
  </section>
);

export default Banner;
