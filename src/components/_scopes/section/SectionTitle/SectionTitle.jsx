import styles from './SectionTitle.module.scss';

const SectionTitle = ({ title, className }) => (
  <h2
    className={`${styles.Title} ${className || ''}`}
    dangerouslySetInnerHTML={{ __html: title }}
  />
);

export default SectionTitle;
