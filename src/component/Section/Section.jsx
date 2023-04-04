import styles from './Section.module.scss';

const Section = ({ children, className, id }) => (
  <section id={id} className={`${styles.Section} ${className || ''}`}>
    {children}
  </section>
);

export default Section;
