'use client';

import { useState } from 'react';
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
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => setIsClicked(true);

  const handleRelease = () => setIsClicked(false);

  return (
    <button
      {...rest}
      onMouseUp={handleRelease}
      onClick={(event) => {
        onClick?.(event);
        handleClick();
      }}
      className={`${styles.button} ${className} ${isClicked ? styles.clicked : ''}`}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {loading ? (
        <ClipLoader color="var(--primary-100)" />
      ) : (
        <span>
          {svg}
          {label}
        </span>
      )}
    </button>
  );
};

export default Button;
