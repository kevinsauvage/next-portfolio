import InViewAnimation from '@/components/InViewAnimation/InViewAnimation';

import styles from './Label.module.scss';

const Label = ({ children, ...rest }) => (
  <InViewAnimation
    hidden={{ opacity: 0, y: '100px' }}
    visible={{ opacity: 1, y: '0px' }}
    tag="label"
    className={styles.label}
    {...rest}
  >
    {children}
  </InViewAnimation>
);

export default Label;
