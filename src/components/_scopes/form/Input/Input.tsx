import styles from './Input.module.scss';

type InputProperties = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProperties> = ({ name, type = 'text', className, ...rest }) => (
  <input className={`${styles.input} ${className}`} type={type} id={name} name={name} {...rest} />
);

export default Input;
