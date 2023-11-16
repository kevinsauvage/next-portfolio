import { createElement } from 'react';

import styles from './SectionTitle.module.scss';

type headingPropertiesType = {
  [key: number]: {
    tagName: string;
  };
};

const headingProperties: headingPropertiesType = {
  2: { tagName: 'h2' },
  3: { tagName: 'h3' },
  4: { tagName: 'h4' },
  5: { tagName: 'h5' },
  6: { tagName: 'h6' },
};

type Properties = {
  title: string;
  className?: string;
  tagLevel?: number;
};

const SectionTitle = ({ title, className, tagLevel = 6 }: Properties) => {
  const Tag = headingProperties[tagLevel].tagName;

  const dynamicProperties = {
    className: `${styles.Title} ${className || ''}`,
    dangerouslySetInnerHTML: { __html: title },
  };

  return createElement(Tag, dynamicProperties);
};

export default SectionTitle;
