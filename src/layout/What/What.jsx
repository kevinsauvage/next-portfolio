import styles from "./What.module.scss";
import Section from "../Section/Section";
import Title from "../../component/Title/Title";
import UpTitle from "../../component/UpTitle/UpTitle";
import CompetenceCard from "../../component/CompetenceCard/CompetenceCard";

const What = () => {
  return (
    <Section id="skills" className={styles["What"]}>
      <UpTitle text="FEATURES" />
      <Title>Skills</Title>
      <div className={styles["What__cards"]}>
        <CompetenceCard />
      </div>
    </Section>
  );
};

export default What;
