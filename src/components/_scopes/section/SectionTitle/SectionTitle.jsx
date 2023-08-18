import InViewAnimation from '@/components/InViewAnimation/InViewAnimation';

import styles from './SectionTitle.module.scss';

const SectionTitle = ({ title, className, tagLevel = 2 }) => {
  const headingProperties = {
    2: { tagName: 'h2' },
    3: { tagName: 'h3' },
    4: { tagName: 'h4' },
    5: { tagName: 'h5' },
    6: { tagName: 'h6' },
  };

  // Check if the tagLevel prop is valid, otherwise default to h6
  const { tagName } = headingProperties[tagLevel] || headingProperties[6];

  return (
    <InViewAnimation
      hidden={{ opacity: 0, y: '100px' }}
      visible={{ opacity: 1, y: '0px' }}
      tag={tagName}
      className={`${styles.Title} ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
};

export default SectionTitle;
