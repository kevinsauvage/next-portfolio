import Animation from '@/components/Animation/Animation';

import styles from './SectionTitle.module.scss';

const SectionTitle = ({ title, className }) => (
  <Animation
    animationKeyframes={['slide', 'fade-in']}
    initialStyle={{ opacity: 0, transform: 'translate(200px, 0px)' }}
  >
    <h2
      className={`${styles.Title} ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  </Animation>
);

export default SectionTitle;
