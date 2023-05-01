import styles from './UpTitle.module.scss';

const UpTitle = ({ text, icon }) => (
  <span className={styles.uptitle}>
    {icon}
    <p>{text}</p>
  </span>
);

export default UpTitle;
