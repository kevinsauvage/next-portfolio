import styles from "./Title.module.scss";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";

const Title = ({ children, className }) => {
  return (
    <SlideUpAndFadeIn>
      <h2 className={`${styles["Title"]} ${className ? className : ""}`}>{children}</h2>
    </SlideUpAndFadeIn>
  );
};

export default Title;
