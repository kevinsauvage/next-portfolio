import styles from './AboutItem.module.scss';

const BOLD_WORDS = [
  'JavaScript',
  'TypeScript',
  'ReactJS',
  'NextJS',
  'SvelteJS',
  'NodeJS',
  'ExpressJS',
  'software development',
  'accessible',
  'high-performing',
  'user-friendly',
];

type Properties = {
  content: string;
};

const AboutItem = ({ content }: Properties) => {
  const regexPattern = new RegExp(BOLD_WORDS.join('|'), 'gi');

  return (
    <li className={styles.item}>
      <p
        dangerouslySetInnerHTML={{
          __html: content.replaceAll(regexPattern, '<strong>$&</strong>'),
        }}
      />
    </li>
  );
};

export default AboutItem;
