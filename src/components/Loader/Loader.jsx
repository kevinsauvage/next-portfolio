import styles from './Loader.module.scss';

const Loader = ({ ...rest }) => (
  <div {...rest}>
    <div className={styles.loader}>
      <div className={`${styles.dot}`}>L</div>
      <div className={`${styles.dot} ${styles.dot2}`}>o</div>
      <div className={`${styles.dot} ${styles.dot3}`}>a</div>
      <div className={`${styles.dot} ${styles.dot4}`}>d</div>
      <div className={`${styles.dot} ${styles.dot5}`}>i</div>
      <div className={`${styles.dot} ${styles.dot6}`}>n</div>
      <div className={`${styles.dot} ${styles.dot7}`}>g</div>
    </div>
  </div>
);

export default Loader;
