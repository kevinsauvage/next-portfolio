/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable react/no-unescaped-entities */
import { AiOutlineProfile } from 'react-icons/ai';
import { MdOutgoingMail } from 'react-icons/md';
import { useRouter } from 'next/router';

import about from '../../data/about';
import GradientBorder from '../GradientBorder/GradientBorder';
import Section from '../Section/Section';
import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';
import Title from '../Title/Title';
import UpTitle from '../UpTitle/UpTitle';

import styles from './About.module.scss';

const About = () => {
  const router = useRouter();

  const handleClickResume = () => window.open('/Kévin__sauvage__resume.pdf');

  const handleClickContact = () => router.push('/#contact');

  return (
    <Section id="about">
      <UpTitle text="ABOUT ME" />
      <Title>Who am I</Title>
      <div className={styles.container}>
        <SlideUpAndFadeIn>
          <div className={styles.wrapper}>
            {about}
            <div className={styles.btns}>
              <GradientBorder radius="10px">
                <button
                  type="button"
                  onClick={handleClickResume}
                  className={`${styles.btn} ${styles['btn-resume']}`}
                >
                  <AiOutlineProfile />
                  <p>Resume</p>
                </button>
              </GradientBorder>
              <button
                type="button"
                onClick={handleClickContact}
                className={`${styles.btn}  ${styles['btn-contact']}`}
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
