import styles from "./CompetenceCard.module.scss";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";

const CompetenceCard = ({ item }) => {
  return (
    <SlideUpAndFadeIn className={styles["CompetenceCard"]}>
      <div className={styles["CompetenceCard__items"]}>
        {item.description.map((item, i) => (
          <div className={styles["CompetenceCard__item"]} key={i}>
            <i className={item}></i>
          </div>
        ))}
      </div>
    </SlideUpAndFadeIn>
  );
};

export default CompetenceCard;
