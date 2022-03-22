import styles from "./UpTitle.module.scss";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";

const UpTitle = ({ text }) => {
  return (
    <SlideUpAndFadeIn>
      <p className={styles["UpTitle"]}>{text}</p>
    </SlideUpAndFadeIn>
  );
};

export default UpTitle;
