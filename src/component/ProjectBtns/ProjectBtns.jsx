import { FiExternalLink } from 'react-icons/fi';

import { github } from '../../data/svg';
import Button from '../Button/Button';

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
      <Button onClick={handleClickSourceCode} svg={github} label="Source code" variant="outlined" />
      <Button onClick={handleClickVisit} svg={<FiExternalLink />} label="Visit website" />
    </div>
  );
};

export default ProjectBtns;
