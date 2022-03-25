import styles from "./What.module.scss";
import Section from "../Section/Section";
import Title from "../Title/Title";
import UpTitle from "../UpTitle/UpTitle";
import CompetenceCard from "../CompetenceCard/CompetenceCard";
import competences from "../../data/competences";

const What = () => {
  return (
    <Section id="skills" className={styles["What"]}>
      <UpTitle text="FEATURES" />
      <Title>Skills</Title>
      <div className={styles["What__cards"]}>
        {competences.map((item, i) => (
          <CompetenceCard item={item} key={i} />
        ))}
      </div>
    </Section>
  );
};

export default What;
