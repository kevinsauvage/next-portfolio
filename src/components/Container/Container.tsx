type Properties = {
  children: React.ReactNode;
  classname?: string;
};
import styles from './Container.module.scss';

const Container = ({ children, classname }: Properties) => (
  <div className={`${styles.Container} ${classname}`}>{children}</div>
);

export default Container;
