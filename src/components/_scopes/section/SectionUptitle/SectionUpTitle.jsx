import styles from './SectionUpTitle.module.scss';

const SectionUpTitle = ({ text, icon }) => (
  <div className={styles.uptitle}>
    {icon}
    <p>{text}</p>
  </div>
);

export default SectionUpTitle;
