import styles from './Description.module.scss';

const Description = ({ children }) => <p className={styles.description}>{children}</p>;

export default Description;
