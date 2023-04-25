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
            <ul className={styles.about}>
              <li>
                <h3>About me</h3>
                <p>
                  Hello there! My name is Kévin Sauvage, and I'm a passionate full-stack web
                  developer with a talent for creating exceptional user experiences.
                </p>
              </li>
              <li>
                <h3>Expertise</h3>
                <p>
                  My expertise lies in a variety of popular programming languages and frameworks,
                  including Javascript, React.js, Next.js, Svelte.js, Node.js, and Express.js.
                </p>
              </li>
              <li>
                <h3>Unique Perspective</h3>
                <p>
                  What sets me apart is that I made a bold career change to pursue my passion for
                  programming, which has given me a unique perspective and dedication to my craft.
                  I'm always eager to learn and grow, and I stay up-to-date with the latest industry
                  trends and best practices to ensure my work is cutting-edge and of the highest
                  quality.
                </p>
              </li>
              <li>
                <h3>Certification & Professional Experience</h3>
                <p>
                  I hold a certification in full-stack web development from Le Wagon, where I gained
                  hands-on experience with a range of programming languages and tools. I have
                  professional experience as a front-end developer for Subforce and as a developer
                  consultant for Extia, where I've honed my skills in designing and developing web
                  applications using responsive design principles and popular JavaScript libraries.
                </p>
              </li>
              <li>
                <h3>Interests</h3>
                <p>
                  In my free time, I like to explore the vibrant city of Barcelona where I currently
                  reside, and stay active through hiking and working out. I also have a passion for
                  music, movies, and trying out new restaurants and cuisines.
                </p>
              </li>
              <li>
                <h3>Get In Touch</h3>
                <p>
                  If you're looking for a skilled and enthusiastic developer to join your team, I
                  would be delighted to hear from you. Please don't hesitate to contact me or view
                  my portfolio to learn more about my experience and skills. Thank you for visiting
                  my website, and I look forward to the opportunity to work with you!
                </p>
              </li>
            </ul>
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
