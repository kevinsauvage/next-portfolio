import useOnScreen from '../../../hooks/useOnScreen';

import styles from './Skill.module.scss';

const Skill = ({ item }) => {
  const { reference } = useOnScreen('fade-in', 'fade-in--active');
  return (
    <div ref={reference} className={styles.item}>
      {item?.icon}
      <p>{item?.description}</p>
    </div>
  );
};

export default Skill;
