/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable react/no-unescaped-entities */
import { AiOutlineProfile } from 'react-icons/ai';
import { MdOutgoingMail } from 'react-icons/md';
import { useRouter } from 'next/router';

import about from '../../data/about';
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
      <div className={styles.container}>
        <SlideUpAndFadeIn>
          <div className={styles.wrapper}>
            {about}
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
