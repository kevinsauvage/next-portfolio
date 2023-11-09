import styles from './SectionTitle.module.scss';

const headingProperties = {
  2: { tagName: 'h2' },
  3: { tagName: 'h3' },
  4: { tagName: 'h4' },
  5: { tagName: 'h5' },
  6: { tagName: 'h6' },
};

const SectionTitle = ({ title, className, tagLevel = 6 }) => {
  const Tag = headingProperties[tagLevel].tagName;

  return (
    <Tag
      className={`${styles.Title} ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
};

export default SectionTitle;
