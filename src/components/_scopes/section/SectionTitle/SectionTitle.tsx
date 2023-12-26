import styles from './SectionTitle.module.scss';

type Properties = {
  title: string;
  className?: string;
  position: string;
};

const SectionTitle = ({ title, className, position }: Properties) => (
  <h2 className={`${styles.Title} ${className ?? ''}`}>
    <span className={styles.position}>{position}.</span>
    <span dangerouslySetInnerHTML={{ __html: title }} />
  </h2>
);

export default SectionTitle;
