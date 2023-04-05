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
import UpTitle from '../UpTitle/UpTitle';

import styles from './About.module.scss';

const About = () => {
  const router = useRouter();

  const handleClickResume = () =>
    typeof window !== 'undefined' && window.open('/Kévin__sauvage__resume.pdf');

  const handleClickContact = () => typeof window !== 'undefined' && router.push('/#contact');

  return (
    <Section id="about">
      <UpTitle text="ABOUT ME" />
      <Title>Who am I</Title>
      <div>
        <SlideUpAndFadeIn>
          <div className={styles.wrapper}>
            <p className={styles.about}>
              Hello, my name is Kévin and I am a highly skilled and experienced freelance developer
              with a passion for staying current with the latest technologies and best practices. I
              specialize in front-end development and have extensive knowledge in HTML, CSS, SASS,
              JavaScript, React/Next, and Svelte. My years of professional experience and constant
              self-study have honed my skills, making me proficient in creating visually appealing,
              responsive, and user-friendly websites that meet the needs of any project.
              <br />
              <br />
              In addition to front-end development, I also have a keen interest in back-end
              development and have been working with Node.js and Express.js for some time. This has
              allowed me to gain a well-rounded understanding of the web development process and I
              have valuable experience in full-stack development.
              <br />
              <br />I am driven by a natural curiosity and willingness to learn, which has led me to
              continuously expand my skill set and knowledge base. This enables me to stay ahead of
              industry trends and adapt quickly to new technologies. I am confident in my ability to
              deliver high-quality, cutting-edge solutions that meet the needs of any project. My
              expertise in various technologies and ability to understand client's requirements
              makes me the perfect fit for your next project. Whether you need a new website, web
              application or any other digital solution, I am committed to delivering results that
              exceed your expectations.
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
