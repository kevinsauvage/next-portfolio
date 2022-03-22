import styles from "./About.module.scss";
import Section from "../Section/Section";
import Title from "../Title/Title";
import UpTitle from "../UpTitle/UpTitle";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";

const About = () => {
  return (
    <Section id="about" className={styles["About"]}>
      <UpTitle text="SOMETHING" />
      <Title>About me</Title>
      <div className={styles["About__container"]}>
        <SlideUpAndFadeIn>
          <p>
            Hello! My name is Kévin. I'm a French developer living in Barcelona, SPAIN. I like to
            create successful responsive websites that are fast, easy to use, and built with best
            practices. The main area of my expertise is front-end development using HTML, CSS, SASS,
            JavaScript, React.js, Next.js, but I also have some experience in back end development
            using Node.js, Express.js. When I'm not in front of the computer designing and
            developing interactive projects, I enjoy spending time in nature, listening music,
            travelling, working out, hiking, biking or swimming.
          </p>
        </SlideUpAndFadeIn>
      </div>
    </Section>
  );
};

export default About;
