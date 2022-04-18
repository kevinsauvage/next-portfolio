import React from "react";
import styles from "./GradientBorder.module.scss";

const GradientBorder = ({ children, radius, width, height }) => {
  return (
    <div
      style={{ borderRadius: radius, width: width, height: height }}
      className={styles["GradientBorder"]}>
      {children}
    </div>
  );
};

export default GradientBorder;
