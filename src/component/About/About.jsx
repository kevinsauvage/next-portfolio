/* eslint-disable react/no-unescaped-entities */
import { MdOutgoingMail } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import ReactGA from "react-ga4";
import styles from "./About.module.scss";
import Section from "../Section/Section";
import Title from "../Title/Title";
import UpTitle from "../UpTitle/UpTitle";
import SlideUpAndFadeIn from "../SlideUpAndFadeIn/SlideUpAndFadeIn";
import GradientBorder from "../GradientBorder/GradientBorder";
import { useRouter } from "next/router";
import getdateAndTime from "../../helpers/getDateAndTime";

const About = () => {
  const router = useRouter();

  const handleClickResume = () => {
    ReactGA.event({
      category: "CV",
      action: `CV download cicked, the ${getdateAndTime().date} at time: ${getdateAndTime().time}`,
    });
    window.open("/Kévin__sauvage__resume.pdf");
  };

  const handleClickContact = () => {
    router.push("/#contact");
  };

  return (
    <Section id="about" className={styles["About"]}>
      <UpTitle text="ABOUT ME" />
      <Title>Who am I</Title>
      <div className={styles["About__container"]}>
        <SlideUpAndFadeIn>
          <div className={styles["About__wrapper"]}>
            <p>
              Hello! The main area of my expertise is front-end development using Html, CSS, the
              DOM, SASS, JavaScript (ES5, ES6), React.js (hooks, react-router, context api) and
              Next.js, but I also enjoy the back-end using Node.js and Express.js. <br />
              <br />
              To describe me, I would say that I'm passionate about what I do, naturally curious,
              autonomous, committed and always enthusiastic about learning new things. My past
              experience in the commerce industry brings me powerful communication skills, and the
              ability to create strong working relationships.
            </p>
            <div className={styles["About__btns"]}>
              <GradientBorder radius="10px">
                <button
                  onClick={handleClickResume}
                  className={styles["About__btn"] + " " + styles["About__btn-resume"]}>
                  <AiOutlineProfile />
                  <p>Resume</p>
                </button>
              </GradientBorder>
              <button
                onClick={handleClickContact}
                className={styles["About__btn"] + "  " + styles["About__btn-contact"]}>
                <MdOutgoingMail />
                <p>Contact me</p>
              </button>
            </div>
          </div>
        </SlideUpAndFadeIn>
      </div>
    </Section>
  );
};

export default About;
