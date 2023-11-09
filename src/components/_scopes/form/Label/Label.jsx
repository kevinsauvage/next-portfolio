import styles from './Label.module.scss';

const Label = ({ children, missing, ...rest }) => (
  <label className={`${styles.label} ${missing && styles.missing}`} {...rest}>
    {children}
  </label>
);

export default Label;
