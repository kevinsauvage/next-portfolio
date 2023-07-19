import Animation from '@/components/Animation/Animation';

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

  // Render the appropriate heading element
  const HeadingTag = tagName;
  return (
    <Animation
      duration={1000}
      delay={100}
      animationKeyframes={['slide', 'fade-in']}
      initialStyle={{ opacity: 0, transform: 'translate(200px, 0px)' }}
    >
      <HeadingTag
        className={`${styles.Title} ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </Animation>
  );
};

export default SectionTitle;
