import { capitalize } from '@/utils';

import styles from './TextArea.module.scss';

const TextArea = ({ value, onChange, placeholder, ...rest }) => {
  const handleTextAreaChange = (event) => onChange(event.target);

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
