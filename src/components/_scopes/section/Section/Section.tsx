import styles from './Section.module.scss';

type Properties = {
  children: React.ReactNode;
  format?: 'xlarge' | 'large' | 'medium' | 'small';
  id?: string;
};

const Section = ({ children, id, format = 'large' }: Properties) => {
  const formatClass = {
    large: styles.large,
    medium: styles.medium,
    small: styles.small,
    xlarge: styles.xlarge,
  }[format];

  return (
    <section id={id} className={`${styles.Section} ${formatClass}`}>
      {children}
    </section>
  );
};

export default Section;
