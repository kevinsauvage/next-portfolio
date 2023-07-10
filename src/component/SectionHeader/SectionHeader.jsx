import useOnScreen from '../../hooks/useOnScreen';
import SectionSubtitle from '../SectionSubtitle/SectionSubtitle';
import Title from '../SectionTitle/SectionTitle';
import UpTitle from '../Uptitle/UpTitle';

import styles from './SectionHeader.module.scss';

const SectionHeader = ({ icon, title, subtitle }) => {
  const reference = useOnScreen('fade-in', 'fade-in--active');
  return (
    <div ref={reference} className={styles.header}>
      <UpTitle icon={icon} />
      <Title title={title} />
      <SectionSubtitle subtitle={subtitle} />
      <span className={styles.borderBottom} />
    </div>
  );
};

export default SectionHeader;
