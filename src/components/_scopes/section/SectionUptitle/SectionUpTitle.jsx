import Animation from '@/components/Animation/Animation';

import styles from './SectionUpTitle.module.scss';

const SectionUpTitle = ({ text, icon }) => (
  <Animation
    duration={400}
    delay={0}
    iterationCount="1"
    timingFunction="ease-in-out"
    fillMode="forwards"
    animationKeyframes={['slide', 'fadeIn']}
    initialStyle={{ opacity: 0, transform: 'translate(0px, -100px)' }}
  >
    <div className={styles.uptitle}>
      {icon}
      <p>{text}</p>
    </div>
  </Animation>
);

export default SectionUpTitle;
