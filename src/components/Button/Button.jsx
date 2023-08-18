// eslint-disable-next-line css-modules/no-unused-class
import { motion } from 'framer-motion';

import styles from './Button.module.scss';

const Button = ({
  onClick,
  label,
  className = '',
  type = 'button',
  svg,
  loading = false,
  ...rest
}) => (
  <motion.button
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.85 }}
    onClick={(event) => {
      onClick?.(event);
    }}
    className={`${styles.button} ${className}  ${loading ? styles.loading : ''}`}
    // eslint-disable-next-line react/button-has-type
    type={type}
    {...rest}
  >
    {loading && <div className={styles.loader}>loading...</div>}
    <span>
      {svg}
      {label}
    </span>
  </motion.button>
);

export default Button;
