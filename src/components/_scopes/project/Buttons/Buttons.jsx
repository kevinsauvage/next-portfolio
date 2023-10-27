'use client';

import { track } from '@vercel/analytics/react';

import IconBxLinkExternal from '@/svg/IconBxLinkExternal';
import IconGithub from '@/svg/IconGithub';

import styles from './Buttons.module.scss';

const Buttons = ({ item }) => {
  const handleClickSourceCode = (event) => {
    event.preventDefault();
    item.githubLink.forEach((element) => window.open(element));
    track('Click sourceCode project', { item: item.title });
  };

  const handleClickVisit = (event) => {
    event.preventDefault();
    window.open(item.websiteLink);
    track('Click visit project', { item: item.title });
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
