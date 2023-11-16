import { ChangeEvent } from 'react';

import { capitalize } from '@/utils/index';

import styles from './Input.module.scss';

type Properties = {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  [key: string]: unknown;
};

const Input = ({ type, value, onChange, placeholder, ...rest }: Properties) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event);

  return (
    <input
      type={type}
      className={styles.input}
      value={capitalize(value) || ''}
      onChange={handleInputChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
