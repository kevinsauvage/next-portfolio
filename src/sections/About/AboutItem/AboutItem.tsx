import styles from './AboutItem.module.scss';

const BOLD_WORDS = [
  'JavaScript',
  'TypeScript',
  'React.js',
  'Next.js',
  'Svelte.js',
  'Node.js',
  'Express.js',
  'web development',
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
