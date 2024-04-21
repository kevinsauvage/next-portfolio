import styles from './TextArea.module.scss';

type Properties = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ className, ...rest }: Properties) => (
  <textarea className={`${styles.TextArea} ${className}`} {...rest} />
);

export default TextArea;
