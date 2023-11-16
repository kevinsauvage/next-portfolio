import styles from './SectionUpTitle.module.scss';

type Properties = {
  text: string;
  icon: React.ReactNode;
};

const SectionUpTitle = ({ text, icon }: Properties) => (
  <div className={styles.uptitle}>
    {icon}
    <p>{text}</p>
  </div>
);

export default SectionUpTitle;
