import { AboutItemType } from './types';

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
  item: AboutItemType;
} & React.HTMLAttributes<HTMLLIElement>;

const AboutItem = ({ item, className }: Properties) => {
  const { content } = item || {};
  const regexPattern = new RegExp(BOLD_WORDS.join('|'), 'gi');

  return (
    <li className={`${styles.item} ${className}`}>
      <p
        dangerouslySetInnerHTML={{
          __html: content.replaceAll(regexPattern, '<strong>$&</strong>'),
        }}
      />
    </li>
  );
};

export default AboutItem;
