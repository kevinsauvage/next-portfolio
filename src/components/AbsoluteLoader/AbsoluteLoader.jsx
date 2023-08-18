import Loader from '../Loader/Loader';

import styles from './AbsoluteLoader.module.scss';

const AbsoluteLoader = () => (
  <div className={styles.loader}>
    <Loader />
  </div>
);

export default AbsoluteLoader;
