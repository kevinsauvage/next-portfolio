import styles from './SectionSubtitle.module.scss';

type Properties = {
  subtitle: string;
};

const SectionSubtitle = ({ subtitle }: Properties) => <p className={styles.subtitle}>{subtitle}</p>;

export default SectionSubtitle;
