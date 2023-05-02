import { ClipLoader } from 'react-spinners';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './Button.module.scss';

const Button = ({ onClick, label, className = '', type = 'button', svg, loading = false }) => (
  <button
    onClick={(event) => onClick?.(event)}
    className={`${styles.button} ${className}`}
    // eslint-disable-next-line react/button-has-type
    type={type}
  >
    {loading ? (
      <ClipLoader color="var(--primary)" />
    ) : (
      <>
        {svg}
        <span>{label}</span>
      </>
    )}
  </button>
);

export default Button;
