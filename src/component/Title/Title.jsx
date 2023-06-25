import FadeIn from '../FadeIn/FadeIn';

import styles from './Title.module.scss';

const Title = ({ children, subtitle, className }) => (
  <FadeIn>
    <div className={`${styles.Title} ${className || ''}`}>
      <h2>{children}</h2>
      {subtitle && <p>{subtitle}</p>}
      <span className={styles.borderBottom} />
    </div>
  </FadeIn>
);

export default Title;
