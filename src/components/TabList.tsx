'use client';

import { Children, cloneElement, isValidElement, useState } from 'react';

interface TabListProperties {
  children: Array<React.ReactNode>;
  items: Array<string>;
}

const TabList: React.FC<TabListProperties> = ({ children, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex overflow-x-auto md:flex-col min-w-52" role="tablist">
        {items.map((item, index) => (
          <button
            aria-selected={index === activeIndex}
            tabIndex={0}
            role="tab"
            key={item}
            aria-controls={`panel-${index}`}
            className={`border-b p-4 font-semibold font-serif whitespace-nowrap md:text-start ${
              index === activeIndex ? 'border-blue-500 md:bg-blue-950 md:border' : 'md:border-none'
            }`}
            onClick={() => setActiveIndex(index)}
            id={`tab-${index}`}
          >
            {item}
          </button>
        ))}
      </div>
      {Children.toArray(children).map((child, index) =>
        isValidElement(child)
          ? cloneElement(child as React.ReactElement, {
              'aria-hidden': index === activeIndex ? 'false' : 'true',
              'aria-labelledby': `tab-${index}`,
              id: `panel-${index}`,
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
