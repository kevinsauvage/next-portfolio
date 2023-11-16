import { ChangeEvent } from 'react';

import { capitalize } from '@/utils/index';

import styles from './TextArea.module.scss';

type Properties = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  [key: string]: unknown;
};

const TextArea = ({ value, onChange, placeholder, ...rest }: Properties) => {
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event);
  };

  return (
    <textarea
      className={styles.textArea}
      value={capitalize(value) || ''}
      onChange={handleTextAreaChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default TextArea;
