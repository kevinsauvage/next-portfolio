import styles from './Banner.module.scss';

const Banner = () => (
  <div className={styles.Banner}>
    <div>
      <h1>
        Building the Future,
        <br /> One Line of Code at a Time
      </h1>
    </div>
    <p className={styles.subtitle}>
      I thrive on the thrill of solving complex challenges through the power of code. As a dedicated
      developer, I take pride in transforming visionary concepts into tangible digital solutions.
      Every problem is an opportunity, and I&apos;m here to craft innovative, code-driven answers
      that make a difference
    </p>
  </div>
);

export default Banner;
