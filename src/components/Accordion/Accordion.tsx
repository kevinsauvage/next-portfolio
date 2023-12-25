'use client';

import { Children, ElementType, useCallback, useEffect, useState } from 'react';

import { breakpoints } from '@/utils/breakpoints';

import styles from './Accordion.module.scss';

type Breakpoint = keyof typeof breakpoints;

interface AccordionProperties {
  children: React.ReactNode;
  totalVisible?: { [K in Breakpoint]?: number };
  className: string;
  Tag: ElementType;
  defaultVisible: number;
}

const Accordion = ({
  children,
  totalVisible,
  className,
  Tag = 'div',
  defaultVisible,
}: AccordionProperties) => {
  const [visible, setVisible] = useState(defaultVisible);
  const childrenCount = Children.toArray(children).length;

  const handleFindTotalVisible = useCallback(() => {
    if (typeof totalVisible !== 'object') return;
    const keys = Object.keys(totalVisible);
    const key = keys.find((item) => window.matchMedia(`(max-width: ${item}px)`).matches);
    if (!key) {
      const higherKey = keys.reduce((previous, current) => {
        if (Number(previous) > Number(current)) return previous;
        return current;
      });
      const nextVisible = totalVisible[higherKey as keyof typeof totalVisible] ?? childrenCount;
      setVisible(nextVisible);
      return;
    }
    const nextVisible = totalVisible[key as keyof typeof totalVisible] ?? childrenCount;

    setVisible(nextVisible);
  }, [childrenCount, totalVisible]);

  useEffect(() => {
    handleFindTotalVisible();
  }, [handleFindTotalVisible]);

  return (
    children && (
      <>
        <Tag className={className}>{Children.toArray(children).slice(0, visible)}</Tag>
        {visible <= childrenCount && (
          <button
            title="See more content"
            type="button"
            className={styles.button}
            onClick={() => {
              if (visible < childrenCount) {
                setVisible(childrenCount);
              } else {
                handleFindTotalVisible();
              }
            }}
            aria-label="See more"
          >
            {visible < childrenCount && <>See more</>}
            {visible === childrenCount && <>See less</>}
          </button>
        )}
      </>
    )
  );
};

export default Accordion;
