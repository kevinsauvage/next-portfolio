import Animation from '@/components/Animation/Animation';

import styles from './SectionUpTitle.module.scss';

const SectionUpTitle = ({ text, icon }) => (
  <Animation
    duration={800}
    delay={100}
    animationKeyframes={['slide', 'fade-in']}
    initialStyle={{ opacity: 0, transform: 'translate(0px, 100px)' }}
  >
    <div className={styles.uptitle}>
      {icon}
      <p>{text}</p>
    </div>
  </Animation>
);

export default SectionUpTitle;
