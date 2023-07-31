import Animation from '@/components/Animation/Animation';

import styles from './Banner.module.scss';

const Banner = () => (
  <div className={styles.Banner}>
    <Animation
      duration={800}
      delay={50}
      animationKeyframes={['slide', 'fade-in']}
      initialStyle={{ opacity: 0, transform: 'translate(0px, 100px)' }}
    >
      <h1>
        Fueled by <strong>curiosity</strong>
        <br /> and inspired by endless
        <strong> possibilities</strong>.
      </h1>
    </Animation>
    <Animation
      duration={800}
      delay={150}
      animationKeyframes={['slide', 'fade-in']}
      initialStyle={{ opacity: 0, transform: 'translate(0px, 200px)' }}
    >
      <p className={styles.subtitle}>
        For every problem, there&apos;s a code-driven solution waiting to be discovered. As a
        problem-solving enthusiast, I enjoy the challenge of coding, transforming ideas into
        reality.
      </p>
    </Animation>
  </div>
);

export default Banner;
