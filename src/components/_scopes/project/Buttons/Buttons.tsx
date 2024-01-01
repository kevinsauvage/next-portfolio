'use client';

import { FaGithub } from 'react-icons/fa';

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

  return (
    <div className={styles.buttons}>
      {item.githubLink?.length > 0 && (
        <button
          type="button"
          aria-label="Open Github in a new tab"
          title="See the code on Github in a new tab"
          onClick={handleClickSourceCode}
        >
          <FaGithub />
        </button>
      )}
    </div>
  );
};

export default Buttons;
