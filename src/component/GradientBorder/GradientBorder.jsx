import styles from './GradientBorder.module.scss';

const GradientBorder = ({ children, radius, width, height, styles: stylesProperties }) => (
  <div
    style={{ borderRadius: radius, height, width, ...stylesProperties }}
    className={styles.GradientBorder}
  >
    {children}
  </div>
);

export default GradientBorder;
