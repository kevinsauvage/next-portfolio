/* eslint-disable react/no-unescaped-entities */

import FadeIn from '../FadeIn/FadeIn';
import Section from '../Section/Section';
import Title from '../Title/Title';

import styles from './About.module.scss';

const About = () => (
  <Section id="about">
    <Title>Who am I</Title>
    <div>
      <div className={styles.wrapper}>
        <ul className={styles.about}>
          <li>
            <FadeIn>
              <h3>About me</h3>
            </FadeIn>
            <FadeIn>
              <p>
                Hello there! I'm Kévin Sauvage, a dedicated front-end developer with back-end
                knowledge and two years of experience under my belt. With a passion for creating
                seamless and responsive user experiences, I have honed my skills in various
                programming languages and frameworks, making me capable of delivering top-notch web
                solutions.
              </p>
            </FadeIn>
          </li>
          <li>
            <FadeIn>
              <h3>Expertise</h3>
            </FadeIn>
            <FadeIn>
              <p>
                With proficiency in various in-demand programming languages and frameworks, I am
                well-versed in Javascript, React.js, Next.js, Svelte.js, Node.js, and Express.js.
                These tools enable me to develop dynamic and efficient web applications, providing
                clients with high-quality solutions to meet their business needs.
              </p>
            </FadeIn>
          </li>
          <li>
            <FadeIn>
              <h3>Unique Perspective</h3>
            </FadeIn>
            <FadeIn>
              <p>
                What sets me apart is that I made a bold career change to pursue my passion for
                programming, which has given me a unique perspective and dedication to my craft. I'm
                always eager to learn and grow, and I stay up-to-date with the latest industry
                trends and best practices to ensure my work is cutting-edge and of the highest
                quality.
              </p>
            </FadeIn>
          </li>
          <li>
            <FadeIn>
              <h3>Certification & Professional Experience</h3>
            </FadeIn>
            <FadeIn>
              <p>
                My certification in full-stack web development from Le Wagon has provided me with
                hands-on expertise in various programming languages and tools. I've further refined
                my skills as a front-end developer for Subforce and developer consultant for Extia.
              </p>
            </FadeIn>
          </li>
          <li>
            <FadeIn>
              <h3>Interests</h3>
            </FadeIn>
            <FadeIn>
              <p>
                In my free time, I like to explore the vibrant city of Barcelona where I currently
                reside, and stay active through hiking and working out. I also have a passion for
                music, movies, and trying out new restaurants and cuisines.
              </p>
            </FadeIn>
          </li>
        </ul>
      </div>
    </div>
  </Section>
);

export default About;
