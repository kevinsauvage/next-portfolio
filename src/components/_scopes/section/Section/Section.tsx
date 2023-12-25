import styles from './Section.module.scss';

type Properties = {
  children: React.ReactNode;
  format?: 'xlarge' | 'large' | 'medium' | 'small';
};

const Section = ({ children, format = 'medium' }: Properties) => {
  const formatClass = {
    large: styles.large,
    medium: styles.medium,
    small: styles.small,
    xlarge: styles.xlarge,
  }[format];

  return <section className={`${styles.Section} ${formatClass}`}>{children}</section>;
};

export default Section;
