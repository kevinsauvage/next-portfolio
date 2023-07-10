import SectionHeader from '../SectionHeader/SectionHeader';

import styles from './Section.module.scss';

const Section = ({ children, className, id, icon, subtitle, title }) => (
  <>
    <div className={styles.anchor} id={id} />
    <section className={`${styles.Section} ${className || ''}`}>
      <SectionHeader icon={icon} subtitle={subtitle} title={title} />
      {children}
    </section>
  </>
);

export default Section;
