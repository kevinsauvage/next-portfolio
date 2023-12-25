import styles from './Label.module.scss';

type Properties = {
  children: React.ReactNode;
  missing?: boolean;
};

const Label = ({ children, ...rest }: Properties) => (
  <label className={`${styles.label}`} {...rest}>
    {children}
  </label>
);

export default Label;
