import styles from './SectionTitle.module.scss';

type Properties = {
  title: string;
  position: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const SectionTitle = ({ title, position, ...rest }: Properties) => (
  <h2 className={styles.Title} {...rest}>
    <span className={styles.position}>{position}.</span>
    <span dangerouslySetInnerHTML={{ __html: title }} />
  </h2>
);

export default SectionTitle;
