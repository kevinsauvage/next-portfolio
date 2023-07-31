import { ClipLoader } from 'react-spinners';

// eslint-disable-next-line css-modules/no-unused-class
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
    {...rest}
    onClick={(event) => {
      onClick?.(event);
    }}
    className={`${styles.button} ${className}  ${loading ? styles.loading : ''}`}
    // eslint-disable-next-line react/button-has-type
    type={type}
  >
    {loading && (
      <div className={styles.loader}>
        <ClipLoader color="var(--primary-100)" />
      </div>
    )}
    <span>
      {svg}
      {label}
    </span>
  </button>
);

export default Button;
