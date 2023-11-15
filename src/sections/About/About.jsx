import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import about from '@/config/about';
import sections from '@/config/sections';

import styles from './About.module.scss';

const hightlightedWords = [
  'JavaScript',
  'TypeScript',
  'React.js',
  'Next.js',
  'Svelte.js',
  'Node.js',
  'Express.js',
  'web development',
];

const AboutItem = ({ item }) => {
  const regexPattern = new RegExp(hightlightedWords.join('|'), 'gi');

  return (
    <li className={styles.item}>
      <p
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: item.content.replace(regexPattern, '<strong>$&</strong>'),
        }}
      />
    </li>
  );
};

const label = 'About Me';
const section = sections.find((data) => data.label === label);
const { icon, title, tagLevel } = section || {};

const About = () => (
  <SectionPresenter>
    <Section>
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} tagLevel={tagLevel} />
      <ul className={styles.about}>
        {about.map((item) => (
          <AboutItem key={item.content} item={item} />
        ))}
      </ul>
    </Section>
  </SectionPresenter>
);

export default About;
