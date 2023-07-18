import Section from '@/components/_scopes/section/Section/Section';
import Animation from '@/components/Animation/Animation';

import styles from './Banner.module.scss';

const Banner = ({ ...rest }) => (
  <Section {...rest}>
    <div className={styles.Banner}>
      <Animation
        duration={400}
        delay={0}
        iterationCount="1"
        timingFunction="ease-in-out"
        fillMode="forwards"
        animationKeyframes={['slide', 'fade-in']}
        initialStyle={{ opacity: 0, transform: 'translate(0px, 400px)' }}
      >
        <h1>
          Showcasing the Artistry of a Front End <strong>Developer</strong>
        </h1>
      </Animation>
      <Animation
        duration={400}
        delay={100}
        iterationCount="1"
        timingFunction="ease-in-out"
        fillMode="forwards"
        animationKeyframes={['slide', 'fade-in']}
        initialStyle={{ opacity: 0, transform: 'translate(0px, 400px)' }}
      >
        <p className={styles.subtitle}>
          Are you in need of a web developer who can bring your ideas to life? Look no further! I
          have a track record of delivering captivating and functional web applications. I am
          committed to exceeding your expectations and creating visually stunning websites that
          engage your audience.
        </p>
      </Animation>
    </div>
  </Section>
);

export default Banner;
