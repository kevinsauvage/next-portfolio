import Animation from '@/components/Animation/Animation';

import styles from './Banner.module.scss';

const Banner = () => (
  <div className={styles.Banner}>
    <Animation
      initial={{ opacity: 0, y: '100px' }}
      animate={{ opacity: 1, transition: { delay: 0.5 }, y: '0px' }}
      tag="h1"
    >
      Fueled by <strong>curiosity</strong>,
      <br />
      inspired by endless
      <strong> possibilities</strong>.
    </Animation>
    <Animation
      initial={{ opacity: 0, y: '100px' }}
      animate={{ opacity: 1, transition: { delay: 0.5 }, y: '0px' }}
      tag="p"
      className={styles.subtitle}
    >
      For every problem, there&apos;s a code-driven solution waiting to be discovered. As a
      problem-solving enthusiast, I enjoy the challenge of coding, transforming ideas into reality.
    </Animation>
  </div>
);

export default Banner;
