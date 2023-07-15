import Section from '@/components/_scopes/section/Section/Section';
import Animation from '@/components/Animation/Animation';
import ScrollDownAnimation from '@/components/ScrollDownAnimation/ScrollDownAnimation';

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
        animationKeyframes={['slide', 'fadeIn']}
        initialStyle={{ opacity: 0, transform: 'translate(0px, 400px)' }}
      >
        <h1>Showcasing the Artistry of a Front End <strong>Developer</strong></h1>
      </Animation>
      <Animation
        duration={400}
        delay={100}
        iterationCount="1"
        timingFunction="ease-in-out"
        fillMode="forwards"
        animationKeyframes={['slide', 'fadeIn']}
        initialStyle={{ opacity: 0, transform: 'translate(0px, 400px)' }}
      >
        <p className={styles.subtitle}>
          Are you in need of a skilled web developer who can transform your ideas into captivating
          and functional web applications? Look no further! With a proven track record of delivering
          engaging and visually stunning websites, I am committed to exceeding your expectations and
          bringing your vision to life.
        </p>
      </Animation>
      <ScrollDownAnimation />
    </div>
  </Section>
);

export default Banner;
