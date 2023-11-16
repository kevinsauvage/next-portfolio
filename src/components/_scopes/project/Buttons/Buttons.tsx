'use client';

import IconBxLinkExternal from '@/svg/IconBxLinkExternal';
import IconGithub from '@/svg/IconGithub';

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
