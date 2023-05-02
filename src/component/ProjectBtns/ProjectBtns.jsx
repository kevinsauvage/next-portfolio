import { externalLink, github } from '../../data/svg';

import styles from './ProjectBtns.module.scss';

const ProjectBtns = ({ item }) => {
  const handleClickSourceCode = (event) => {
    event.stopPropagation();
    item.githubLink.forEach((element) => window.open(element));
  };

  const handleClickVisit = (event) => {
    event.stopPropagation();
    window.open(item.websiteLink);
  };

  return (
    <div className={styles.ProjectBtns}>
      <button type="button" onClick={handleClickSourceCode}>
        {github}
      </button>
      <button type="button" onClick={handleClickVisit}>
        {externalLink}
      </button>
    </div>
  );
};

export default ProjectBtns;
