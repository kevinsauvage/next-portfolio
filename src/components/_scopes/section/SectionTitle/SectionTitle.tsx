import { createElement } from 'react';

import styles from './SectionTitle.module.scss';

type Properties = {
  title: string;
  className?: string;
};

const SectionTitle = ({ title, className }: Properties) => {
  const dynamicProperties = {
    className: `${styles.Title} ${className ?? ''}`,
    dangerouslySetInnerHTML: { __html: title },
  };

  return createElement('h2', dynamicProperties);
};

export default SectionTitle;
