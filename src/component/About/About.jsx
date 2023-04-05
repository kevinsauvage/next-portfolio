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
              Hi there! My name is Kévin Sauvage, and I am a skilled developer with expertise in
              Javascript, React.js, Next.js, Svelte.js, Node.js, and Express.js. As someone who made
              a career change to pursue my passion for programming, I bring a unique perspective to
              my work and am always eager to learn and grow.
              <br />
              <br />
              In addition to my technical skills, I hold a certification in full-stack web
              development from Le Wagon, During the 9-week program, I learned a variety of
              programming languages and tools, including HTML, CSS, Bootstrap, JavaScript, SQL, Git,
              GitHub, Heroku, and Ruby on Rails.
              <br />
              <br />
              Since completing the bootcamp, I have gained professional experience working as a
              front-end developer for Subforce and as a developer consultant for Extia. In these
              roles, I have honed my skills in designing and developing web applications using
              responsive design principles and popular JavaScript libraries such as React, Next,
              Svelte and Express.
              <br />
              <br />
              As an experienced developer, I am passionate about delivering high-quality, efficient,
              and reliable code that meets my clients' needs. Over the years, I have worked on a
              diverse range of projects, sharpening my technical skills and building my expertise in
              various programming languages and technologies. In addition to my technical
              proficiency, I am deeply committed to continuous learning and staying up-to-date with
              the latest industry trends and best practices.
              <br />
              <br />
              In my free time, I enjoy exploring the beautiful city of Barcelona, where I currently
              reside, and staying active through hiking and running. My personal interests and
              hobbies also include music, movies, and trying out new restaurants and cuisines.
              <br />
              <br />I am excited to connect with potential clients and employers who are seeking a
              skilled and enthusiastic developer to join their team. Thank you for visiting my
              website, and I look forward to hearing from you!
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
