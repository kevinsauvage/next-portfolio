import InViewAnimation from '@/components/InViewAnimation/InViewAnimation';

import styles from './Label.module.scss';

const Label = ({ children, missing, ...rest }) => (
  <InViewAnimation
    hidden={{ opacity: 0, y: '100px' }}
    visible={{ opacity: 1, y: '0px' }}
    tag="label"
    className={`${styles.label} ${missing && styles.missing}`}
    {...rest}
  >
    {children}
  </InViewAnimation>
);

export default Label;
