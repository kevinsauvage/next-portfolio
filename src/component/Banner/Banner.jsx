import Button from '../Button/Button';
import FadeIn from '../FadeIn/FadeIn';

import styles from './Banner.module.scss';

const Banner = () => (
  <section className={styles.Banner}>
    <div className={styles.main}>
      <FadeIn>
        <small>Greetings, my name is</small>
      </FadeIn>
      <FadeIn>
        <h1>Kévin Sauvage</h1>
      </FadeIn>
      <FadeIn>
        <h2>Front end Developer.</h2>
      </FadeIn>
      <FadeIn>
        <p className={styles.subtitle}>
          I create visually stunning and user-friendly web applications that are both functional and
          engaging. My expertise in web development allows me to deliver top-notch solutions that
          exceed expectations.
        </p>
      </FadeIn>
      <FadeIn>
        <Button
          className={styles.button}
          label="Contact me!"
          variant="outlined"
          onClick={() => window.open('mailto:kevinsauvage@outlook.com')}
        />
      </FadeIn>
    </div>
  </section>
);

export default Banner;
