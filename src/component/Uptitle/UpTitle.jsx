import styles from './UpTitle.module.scss';

const UpTitle = ({ text, icon }) => (
  <div className={styles.uptitle}>
    {icon}
    <p>{text}</p>
  </div>
);

export default UpTitle;
