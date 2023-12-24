import styles from './TextArea.module.scss';

type Properties = {
  placeholder: string;
  [key: string]: unknown;
  name: string;
};

const TextArea = ({ placeholder, name, ...rest }: Properties) => (
  <textarea className={styles.textArea} name={name} placeholder={placeholder} {...rest} />
);

export default TextArea;
