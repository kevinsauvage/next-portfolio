import styles from "./SlideUpAndFadeIn.module.scss";
import { useEffect, useRef, useState } from "react";
import useOnScreen from "../../hooks/useOnScreen";

const SlideUpAndFadeIn = ({ children, className }) => {
  const container = useRef(null);
  const isOnScreen = useOnScreen(container);
  const [executed, setExecuted] = useState(false);

  useEffect(() => isOnScreen && setExecuted(true), [isOnScreen]);

  return (
    <div
      ref={container}
      className={`${styles["SlideUpAndFadeIn"]} ${
        executed ? styles["SlideUpAndFadeIn--onScreen"] : ""
      } ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default SlideUpAndFadeIn;
