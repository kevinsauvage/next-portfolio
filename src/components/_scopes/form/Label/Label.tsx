import styles from './Label.module.scss';

type Properties = {
  children: React.ReactNode;
  missing?: boolean;
};

const Label = ({ children, missing, ...rest }: Properties) => (
  <label className={`${styles.label} ${missing && styles.missing}`} {...rest}>
    {children}
  </label>
);

export default Label;
