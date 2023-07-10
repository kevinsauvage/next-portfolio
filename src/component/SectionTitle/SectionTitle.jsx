import styles from './SectionTitle.module.scss';

const SectionTitle = ({ title, className }) => (
  <h2 className={`${styles.Title} ${className || ''}`}>{title}</h2>
);

export default SectionTitle;
