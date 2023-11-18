import styles from './SectionUpTitle.module.scss';

type Properties = {
  text: string;
  icon: React.ReactNode;
  id?: string;
};

const SectionUpTitle = ({ text, icon, id }: Properties) => (
  <div className={styles.uptitle} id={id}>
    {icon}
    <p>{text}</p>
  </div>
);

export default SectionUpTitle;
