'use client';
import { Children, cloneElement, isValidElement, useState } from 'react';

import styles from './TabList.module.scss';

interface TabListProperties {
  children: Array<React.ReactNode>;
  items: Array<string>;
}

const TabList: React.FC<TabListProperties> = ({ children, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.TabList}>
      <div className={styles.tabs} role="tablist">
        {items.map((item, index) => (
          <button
            aria-selected={index === activeIndex}
            tabIndex={0}
            role="tab"
            key={item}
            className={index === activeIndex ? styles.active : ''}
            onClick={() => setActiveIndex(index)}
          >
            {item}
          </button>
        ))}
      </div>
      {Children.toArray(children).map((child, index) =>
        isValidElement(child)
          ? cloneElement(child as React.ReactElement, {
              'aria-hidden': index === activeIndex ? 'false' : 'true',
              style: {
                display: index === activeIndex ? 'block' : 'none',
              },
            })
          : child,
      )}
    </div>
  );
};

export default TabList;
