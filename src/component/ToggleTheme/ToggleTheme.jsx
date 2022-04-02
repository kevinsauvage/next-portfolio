import React, { useState, useEffect } from "react";
import styles from "./ToggleTheme.module.scss";

const ToggleTheme = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const html = document.querySelector("[data-theme]");
    if (checked) html.setAttribute("data-theme", "light");
    else html.setAttribute("data-theme", "dark");
  }, [checked]);

  return (
    <div className={styles["ToggleTheme"]} onClick={() => setChecked(!checked)}>
      <div
        htmlFor="toggle"
        className={`${styles["ToggleTheme__switch"]} ${
          checked ? styles["ToggleTheme__switch--checked"] : ""
        }`}></div>
    </div>
  );
};

export default ToggleTheme;
