import AnimatedContainer from '@/components/AnimatedContainer/AnimatedContainer';

import styles from './SectionUpTitle.module.scss';

type Properties = {
  text: string;
  icon: React.ReactNode;
  id?: string;
};

const SectionUpTitle = ({ text, icon, id }: Properties) => (
  <AnimatedContainer
    className={styles.uptitle}
    id={id}
    from={{ opacity: 0, x: 150 }}
    to={{ duration: 0.2, opacity: 1, x: 0 }}
    timelineOptions={{
      scrollTrigger: {
        start: 'top 80%',
      },
    }}
  >
    {icon}
    <p>{text}</p>
  </AnimatedContainer>
);

export default SectionUpTitle;
