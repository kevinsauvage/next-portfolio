import styles from './Input.module.scss';

type Properties = {
  type: string;
  placeholder: string;
  [key: string]: unknown;
};

const Input = ({ type, placeholder, ...rest }: Properties) => (
  <input type={type} className={styles.input} placeholder={placeholder} {...rest} />
);

export default Input;
