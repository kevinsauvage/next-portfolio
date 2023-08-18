import Loader from '../Loader/Loader';

import styles from './FixedLoader.module.scss';

const FixedLoader = () => (
  <div className={styles.loader}>
    <Loader />
  </div>
);

export default FixedLoader;
