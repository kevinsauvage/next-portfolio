import styles from './Section.module.scss';

const Section = ({ children, className, id }) => (
  <>
    <div className={styles.anchor} id={id} />
    <section className={`${styles.Section} ${className || ''}`}>{children}</section>
  </>
);

export default Section;
