import styles from './Section.module.scss';

type Properties = {
  children: React.ReactNode;
};

const Section = ({ children }: Properties) => (
  <section className={styles.Section}>{children}</section>
);

export default Section;
