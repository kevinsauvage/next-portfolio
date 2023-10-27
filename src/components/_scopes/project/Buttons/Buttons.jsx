'use client';

import IconBxLinkExternal from '@/svg/IconBxLinkExternal';
import IconGithub from '@/svg/IconGithub';

import styles from './Buttons.module.scss';

const Buttons = ({ item }) => {
  const handleClickSourceCode = (event) => {
    event.preventDefault();
    item.githubLink.forEach((element) => window.open(element));
  };

  const handleClickVisit = (event) => {
    event.preventDefault();
    window.open(item.websiteLink);
  };

  return (
    <div className={styles.buttons}>
      {item.githubLink?.length > 0 && (
        <button type="button" aria-label="Open Github" onClick={handleClickSourceCode}>
          <IconGithub />
        </button>
      )}
      <button type="button" aria-label="Open Linkedin" onClick={handleClickVisit}>
        <IconBxLinkExternal />
      </button>
    </div>
  );
};

export default Buttons;
