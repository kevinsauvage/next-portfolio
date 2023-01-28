import styles from "./Container.module.scss";

export default function Container({ children, classname }) {
  return <div className={styles.Container + " " + classname}>{children}</div>;
}
