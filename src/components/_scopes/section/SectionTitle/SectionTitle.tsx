import { createElement } from 'react';

import styles from './SectionTitle.module.scss';

type Properties = {
  title: string;
  className?: string;
  TitleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const SectionTitle = ({ title, className, TitleTag = 'h6' }: Properties) => {
  const dynamicProperties = {
    className: `${styles.Title} ${className ?? ''}`,
    dangerouslySetInnerHTML: { __html: title },
  };

  return createElement(TitleTag, dynamicProperties);
};

export default SectionTitle;
