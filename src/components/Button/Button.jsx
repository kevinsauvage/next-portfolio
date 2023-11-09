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
  <button
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
  </button>
);

export default Button;
