import styles from "./CompetenceCard.module.scss";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";
import competences from "../../data/competences";

const CompetenceCard = () => {
  return (
    <SlideUpAndFadeIn className={styles["CompetenceCard"]}>
      <div className={styles["CompetenceCard__items"]}>
        {competences.map((item, i) => (
          <div className={styles["CompetenceCard__item"]} key={i}>
            <i className={item.icon}></i>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </SlideUpAndFadeIn>
  );
};

export default CompetenceCard;
