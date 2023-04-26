import styles from './Title.module.scss';

const Title = ({ children, className }) => (
  <h2 className={`${styles.Title} ${className || ''}`}>{children}</h2>
);

export default Title;
