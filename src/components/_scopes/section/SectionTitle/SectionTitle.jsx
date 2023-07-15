import Animation from '@/components/Animation/Animation';

import styles from './SectionTitle.module.scss';

const SectionTitle = ({ title, className }) => (
  <Animation
    duration={400}
    delay={0}
    iterationCount="1"
    timingFunction="ease-in-out"
    fillMode="forwards"
    animationKeyframes={['slide', 'fadeIn']}
    initialStyle={{ opacity: 0, transform: 'translate(300px, -100px)' }}
  >
    <h2
      className={`${styles.Title} ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  </Animation>
);

export default SectionTitle;
