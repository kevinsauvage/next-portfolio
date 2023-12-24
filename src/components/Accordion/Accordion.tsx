'use client';

import { Children, ElementType, useCallback, useEffect, useState } from 'react';

import { breakpoints } from '@/utils/breakpoints';

import styles from './Accordion.module.scss';

type Breakpoint = keyof typeof breakpoints;

interface AccordionProperties {
  children: React.ReactNode;
  totalVisible?: { [K in Breakpoint | 'default']?: number };
  className: string;
  Tag: ElementType;
}

const Accordion = ({ children, totalVisible, className, Tag = 'div' }: AccordionProperties) => {
  const [visible, setVisible] = useState(0);
  const childrenCount = Children.toArray(children).length;

  const handleFindTotalVisible = useCallback(() => {
    if (typeof totalVisible !== 'object') return;
    const keys = Object.keys(totalVisible);
    const key = keys.find((item) => window.matchMedia(`(max-width: ${item}px)`).matches);
    const defaultVisible = totalVisible.default || childrenCount;

    setVisible(totalVisible[key as keyof typeof totalVisible] || defaultVisible);
  }, [childrenCount, totalVisible]);

  useEffect(() => {
    handleFindTotalVisible();
  }, [handleFindTotalVisible]);

  useEffect(() => {
    window.addEventListener('resize', handleFindTotalVisible);
    return () => window.removeEventListener('resize', handleFindTotalVisible);
  }, [handleFindTotalVisible]);

  return (
    children && (
      <>
        <Tag className={className}>{Children.toArray(children).slice(0, visible)}</Tag>
        <button
          title="See more content"
          type="button"
          className={styles.button}
          onClick={() =>
            visible < childrenCount ? setVisible(childrenCount) : handleFindTotalVisible()
          }
          aria-label="See more"
        >
          {visible < childrenCount ? <>See more</> : <>See less</>}
        </button>
      </>
    )
  );
};

export default Accordion;
