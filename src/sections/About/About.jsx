import about from '@/config/about';

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
        dangerouslySetInnerHTML={{
          __html: item.content.replace(regexPattern, '<strong>$&</strong>'),
        }}
      />
    </li>
  );
};

const About = () => (
  <ul className={styles.about}>
    {about.map((item) => (
      <AboutItem key={item.content} item={item} />
    ))}
  </ul>
);

export default About;
