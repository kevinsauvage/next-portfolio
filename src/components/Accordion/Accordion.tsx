'use client';

import { Children, ElementType, useState } from 'react';

import styles from './Accordion.module.scss';

interface AccordionProperties {
  children: React.ReactNode;
  totalVisible?: number;
  className: string;
  Tag: ElementType;
}

const Accordion = ({ children, totalVisible = 8, className, Tag = 'div' }: AccordionProperties) => {
  const [visible, setVisible] = useState(totalVisible);
  const childrenCount = Children.toArray(children).length;

  return (
    children && (
      <>
        <Tag className={className}>{Children.toArray(children).slice(0, visible)}</Tag>
        {visible < childrenCount && (
          <button
            title="See more content"
            type="button"
            className={styles.button}
            onClick={() => setVisible(childrenCount)}
            aria-label="See more"
          >
            See more
          </button>
        )}
      </>
    )
  );
};

export default Accordion;
