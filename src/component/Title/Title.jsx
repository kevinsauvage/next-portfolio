import FadeIn from '../FadeIn/FadeIn';

import styles from './Title.module.scss';

const Title = ({ children, className }) => (
  <FadeIn>
    <h2 className={`${styles.Title} ${className || ''}`}>{children}</h2>
  </FadeIn>
);

export default Title;
