import styles from './Container.module.scss';

type Properties = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Container = ({ children, className }: Properties) => (
  <div className={`${styles.Container} ${className}`}>{children}</div>
);

export default Container;
