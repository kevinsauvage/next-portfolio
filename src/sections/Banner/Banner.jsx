import Animation from '@/components/Animation/Animation';

import styles from './Banner.module.scss';

const Banner = () => (
  <div className={styles.Banner}>
    <Animation initial={{ opacity: 0, y: '100px' }} animate={{ opacity: 1, y: '0px' }} tag="div">
      <h1>Building the Future, One Line of Code at a Time</h1>
    </Animation>
    <Animation
      initial={{ opacity: 0, y: '100px' }}
      animate={{ opacity: 1, y: '0px' }}
      tag="p"
      className={styles.subtitle}
    >
      For every problem, there&apos;s a code-driven solution waiting to be discovered. As a
      problem-solving enthusiast, I enjoy the challenge of coding, transforming ideas into reality.
    </Animation>
  </div>
);

export default Banner;
