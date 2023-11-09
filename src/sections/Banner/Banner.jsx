import Animation from '@/components/Animation/Animation';

import styles from './Banner.module.scss';

const Banner = () => (
  <div className={styles.Banner}>
    <Animation initial={{ opacity: 0, y: '100px' }} animate={{ opacity: 1, y: '0px' }} tag="div">
      <h1>
        Building the Future,
        <br /> One Line of Code at a Time
      </h1>
    </Animation>
    <Animation
      initial={{ opacity: 0, y: '100px' }}
      animate={{ opacity: 1, y: '0px' }}
      tag="p"
      className={styles.subtitle}
    >
      I thrive on the thrill of solving complex challenges through the power of code. As a dedicated
      developer, I take pride in transforming visionary concepts into tangible digital solutions.
      Every problem is an opportunity, and I&apos;m here to craft innovative, code-driven answers
      that make a difference
    </Animation>
  </div>
);

export default Banner;
