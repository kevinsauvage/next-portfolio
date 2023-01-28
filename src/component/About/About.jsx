/* eslint-disable react/no-unescaped-entities */
import { MdOutgoingMail } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import ReactGA from "react-ga4";
import styles from "./About.module.scss";
import Section from "../../component/Section/Section";
import Title from "../../component/Title/Title";
import UpTitle from "../../component/UpTitle/UpTitle";
import SlideUpAndFadeIn from "../../component/SlideUpAndFadeIn/SlideUpAndFadeIn";
import GradientBorder from "../../component/GradientBorder/GradientBorder";
import { useRouter } from "next/router";
import { about } from "../../data/about";

const About = () => {
  const router = useRouter();

  const handleClickResume = () => {
    ReactGA.event({ category: "CV", action: `CV download clicked` });
    window.open("/Kévin__sauvage__resume.pdf");
  };

  const handleClickContact = () => router.push("/#contact");

  return (
    <Section id='about' className={styles["About"]}>
      <UpTitle text='ABOUT ME' />
      <Title>Who am I</Title>
      <div className={styles["About__container"]}>
        <SlideUpAndFadeIn>
          <div className={styles["About__wrapper"]}>
            {about}
            <div className={styles["About__btns"]}>
              <GradientBorder radius='10px'>
                <button
                  onClick={handleClickResume}
                  className={styles["About__btn"] + " " + styles["About__btn-resume"]}
                >
                  <AiOutlineProfile />
                  <p>Resume</p>
                </button>
              </GradientBorder>
              <button
                onClick={handleClickContact}
                className={styles["About__btn"] + "  " + styles["About__btn-contact"]}
              >
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
