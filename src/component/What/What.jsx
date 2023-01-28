import styles from "./What.module.scss";
import Section from "../../component/Section/Section";
import Title from "../Title/Title";
import UpTitle from "../UpTitle/UpTitle";
import CompetenceCard from "../CompetenceCard/CompetenceCard";

const What = () => {
  return (
    <Section id='skills' className={styles["What"]}>
      <UpTitle text='FEATURES' />
      <Title>Skills</Title>
      <div className={styles["What__cards"]}>
        <CompetenceCard />
      </div>
    </Section>
  );
};

export default What;
