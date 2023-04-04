import styles from './GradientBorder.module.scss';

const GradientBorder = ({ children, radius, width, height }) => (
  <div style={{ borderRadius: radius, height, width }} className={styles.GradientBorder}>
    {children}
  </div>
);

export default GradientBorder;
