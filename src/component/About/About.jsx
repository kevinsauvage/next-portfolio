/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable react/no-unescaped-entities */
import { AiOutlineProfile } from 'react-icons/ai';
import { MdOutgoingMail } from 'react-icons/md';
import { useRouter } from 'next/router';

import Button from '../Button/Button';
import GradientBorder from '../GradientBorder/GradientBorder';
import Section from '../Section/Section';
import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';
import Title from '../Title/Title';

import styles from './About.module.scss';

const About = () => {
  const router = useRouter();

  const handleClickResume = () =>
    typeof window !== 'undefined' && window.open('/Kévin__sauvage__resume.pdf');

  const handleClickContact = () => typeof window !== 'undefined' && router.push('/#contact');

  return (
    <Section id="about">
      <Title>Who am I</Title>
      <div>
        <SlideUpAndFadeIn>
          <div className={styles.wrapper}>
            <p className={styles.about}>
              Hello, I'm Kévin Sauvage - a full-stack web developer with expertise in popular
              programming languages and frameworks like Javascript, React.js, Next.js, Svelte.js,
              Node.js, and Express.js. I have a certification in full-stack web development from Le
              Wagon and have worked professionally as a front-end developer for Subforce and as a
              developer consultant for Extia.
              <br />
              <br />
              What sets me apart is my passion for programming and my dedication to delivering
              efficient, reliable, and top-notch code. I take pride in building user-friendly
              applications that are both visually appealing and functional. I'm always eager to
              learn and stay up-to-date with the latest industry trends and best practices.
              <br />
              <br />
              In my free time, I enjoy exploring the vibrant city of Barcelona where I'm currently
              based, hiking, working out, and trying out new restaurants and cuisines. If you're
              interested in learning more about my experience and skills, please visit my portfolio
              or reach out to me directly. I look forward to the opportunity to work with you.
            </p>
            <div className={styles.btns}>
              <GradientBorder radius="10px">
                <Button
                  onClick={handleClickResume}
                  svg={<AiOutlineProfile />}
                  label="Resume"
                  variant="outlined"
                />
              </GradientBorder>
              <Button onClick={handleClickContact} svg={<MdOutgoingMail />} label="Contact me" />
            </div>
          </div>
        </SlideUpAndFadeIn>
      </div>
    </Section>
  );
};

export default About;
