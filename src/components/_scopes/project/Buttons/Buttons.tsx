'use client';

import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

import styles from './Buttons.module.scss';

type Properties = {
  item: {
    githubLink: Array<string>;
    websiteLink: string;
  };
};

const Buttons = ({ item }: Properties) => {
  const handleClickSourceCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    item.githubLink.forEach((element) => window.open(element));
  };

  const handleClickVisit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.open(item.websiteLink);
  };

  return (
    <div className={styles.buttons}>
      {item.githubLink?.length > 0 && (
        <button
          type="button"
          aria-label="Open Github"
          title="See the code on Github"
          onClick={handleClickSourceCode}
        >
          <FaGithub />
        </button>
      )}
      <button type="button" aria-label="Open website" onClick={handleClickVisit}>
        <FiExternalLink />
      </button>
    </div>
  );
};

export default Buttons;
