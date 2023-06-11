import FadeIn from '../FadeIn/FadeIn';

import styles from './UpTitle.module.scss';

const UpTitle = ({ text, icon }) => (
  <FadeIn>
    <div className={styles.uptitle}>
      {icon}
      <p>{text}</p>
    </div>
  </FadeIn>
);

export default UpTitle;
