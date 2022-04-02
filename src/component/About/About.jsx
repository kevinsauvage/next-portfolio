/* eslint-disable react/no-unescaped-entities */
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
            Hello! The main area of my expertise is front-end development using Html, CSS, the DOM,
            SASS, JavaScript (ES5, ES6), React.js (hooks, react-router, context api) and Next.js,
            but I also enjoy the back-end using Node.js and Express.js. <br />
            <br />
            To describe me, I would say that I'm passionate about what I do, naturally curious,
            autonomous, committed and always enthusiastic about learning new things. My past
            experience in the commerce industry brings me powerful communication skills, and the
            ability to create strong working relationships.
          </p>
        </SlideUpAndFadeIn>
      </div>
    </Section>
  );
};

export default About;
