import React from "react";
import styles from "./GradientBorder.module.scss";

const GradientBorder = ({ children, radius }) => {
  return (
    <div style={{ borderRadius: radius }} className={styles["GradientBorder"]}>
      {children}
    </div>
  );
};

export default GradientBorder;
