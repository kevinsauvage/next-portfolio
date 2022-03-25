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
            Hello! I'm a French developer living in Barcelona for more than 10 years. The main area
            of my expertise is front-end development using Html, CSS, the DOM, SASS, JavaScript
            (ES5, ES6), React.js (Hooks, react-router, context api) and Next.js, but I also enjoy
            the back-end using Node.js and Express.js. <br />
            <br />
            To describe me, I would say that I'm passionate about what you do, naturally curious,
            autonomous, committed, enthusiastic with a "can-do" attitude and I'm always enthusiastic
            about learning new things. My past experience in the commerce industry brings me
            powerful communication skills, and the ability to create strong working relationships.
            <br />
            <br />
            When I'm not in front of the computer developing projects, I enjoy spending time in
            nature, listening to music, travelling, working out, hiking or biking.
          </p>
        </SlideUpAndFadeIn>
      </div>
    </Section>
  );
};

export default About;
