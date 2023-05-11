import Button from '../Button/Button';
import FadeIn from '../FadeIn/FadeIn';

import styles from './Banner.module.scss';

const Banner = () => (
  <section className={styles.Banner}>
    <div className={styles.main}>
      <FadeIn delay="0.2s">
        <small>Greetings, my name is</small>
      </FadeIn>
      <FadeIn delay="0.25s">
        <h1>Kévin Sauvage</h1>
      </FadeIn>
      <FadeIn delay="0.3s">
        <h2>Front end Developer.</h2>
      </FadeIn>
      <FadeIn delay="0.35s">
        <p className={styles.subtitle}>
          I am a highly skilled web developer with a proven track record of creating engaging and
          visually stunning web applications. I take pride in creating functional and user-friendly
          solutions that exceed expectations.
        </p>
      </FadeIn>
      <FadeIn delay="0.4s">
        <Button
          label="Contact me!"
          onClick={() => window.open('mailto:kevinsauvage@outlook.com')}
        />
      </FadeIn>
    </div>
  </section>
);

export default Banner;
