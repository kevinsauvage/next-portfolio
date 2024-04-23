import AnimatedContainer from '@/components/AnimatedContainer/AnimatedContainer';

import styles from './SectionTitle.module.scss';

type Properties = {
  title: string;
  position: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const SectionTitle = ({ title, position, ...rest }: Properties) => (
  <AnimatedContainer
    {...rest}
    className={styles.Title}
    Tag="h2"
    from={{ opacity: 0, x: 150 }}
    to={{ opacity: 1, x: 0 }}
    timelineOptions={{
      scrollTrigger: {
        start: 'top 80%',
      },
    }}
  >
    <span className={styles.position}>{position}.</span>
    <span dangerouslySetInnerHTML={{ __html: title }} />
  </AnimatedContainer>
);

export default SectionTitle;
