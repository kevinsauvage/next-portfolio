import InViewAnimation from '@/components/InViewAnimation/InViewAnimation';

import styles from './SectionUpTitle.module.scss';

const SectionUpTitle = ({ text, icon }) => (
  <InViewAnimation
    hidden={{ opacity: 0, y: '100px' }}
    visible={{ opacity: 1, y: '0px' }}
    tag="div"
    className={styles.uptitle}
  >
    {icon}
    <p>{text}</p>
  </InViewAnimation>
);

export default SectionUpTitle;
