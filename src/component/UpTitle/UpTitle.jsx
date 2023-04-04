import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';

import styles from './UpTitle.module.scss';

const UpTitle = ({ text }) => (
  <SlideUpAndFadeIn>
    <p className={styles.UpTitle}>{text}</p>
  </SlideUpAndFadeIn>
);

export default UpTitle;
