import { AiOutlineGithub } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';

import Button from '../Button/Button';
import GradientBorder from '../GradientBorder/GradientBorder';

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
      <GradientBorder radius="10px">
        <Button
          onClick={handleClickSourceCode}
          svg={<AiOutlineGithub />}
          label="Source code"
          variant="outlined"
        />
      </GradientBorder>
      <Button onClick={handleClickVisit} svg={<FiExternalLink />} label="Visit website" />
    </div>
  );
};

export default ProjectBtns;
