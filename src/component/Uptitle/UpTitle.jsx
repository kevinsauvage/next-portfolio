import FadeIn from '../FadeIn/FadeIn';

import styles from './UpTitle.module.scss';

const UpTitle = ({ text, icon }) => (
  <FadeIn>
    <span className={styles.uptitle}>
      {icon}
      <p>{text}</p>
    </span>
  </FadeIn>
);

export default UpTitle;
