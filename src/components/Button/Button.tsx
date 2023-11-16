type Properties = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  svg?: React.ReactNode;
  loading?: boolean;
};

import styles from './Button.module.scss';

const Button = ({
  onClick,
  label,
  className = '',
  type = 'button',
  svg,
  loading = false,
  ...rest
}: Properties) => (
  <button
    onClick={(event) => onClick?.(event)}
    className={`${styles.button} ${className}  ${loading ? styles.loading : ''}`}
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
