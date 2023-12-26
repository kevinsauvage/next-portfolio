import { ExpertiseType } from './types';

import styles from './Expertise.module.scss';

type Properties = {
  expertise: ExpertiseType;
  displayKeyPoints?: boolean;
  index: number;
};

const Expertise = ({ expertise, displayKeyPoints, index }: Properties) => {
  const { title, content, keyPoints } = expertise || {};

  return (
    <li>
      <div className={styles.card}>
        <div className={styles.index}>{`0${index + 1}`}</div>
        <h3 className={styles.title}>{title}</h3>
        <p>{content}</p>
        {displayKeyPoints && (
          <ul className={styles.keyPoints}>
            {keyPoints.map((keyPoint) => (
              <li key={keyPoint}>{keyPoint}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default Expertise;
