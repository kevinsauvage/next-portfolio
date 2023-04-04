import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';

import styles from './Title.module.scss';

const Title = ({ children, className }) => (
  <SlideUpAndFadeIn>
    <h2 className={`${styles.Title} ${className || ''}`}>{children}</h2>
  </SlideUpAndFadeIn>
);

export default Title;
