'use client';

import { Children, useRef } from 'react';

import useCarousel from '@/hooks/useCarousel';
import IconArrowLeftShort from '@/svg/IconArrowLeftShort';
import IconArrowRightShort from '@/svg/IconArrowRightShort';

import styles from './Carousel.module.scss';

const Carousel = ({ children, slideClass, itemToShow }) => {
  const slideReference = useRef(null);
  const sliderReference = useRef(null);

  const {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    page,
    updateActive,
    translate,
    maxTranslate,
  } = useCarousel(children, itemToShow, slideReference, sliderReference);

  return (
    <div className={styles.container}>
      <div
        className={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <ul
          ref={sliderReference}
          className={styles.slides}
          style={{
            transform:
              translate >= maxTranslate
                ? `translateX(-${translate}px)`
                : `translateX(-${page * 100}%)`,
          }}
        >
          {Children.toArray(
            children.map((child) => (
              <li id="slide" ref={slideReference} className={`${styles.slide} ${slideClass}`}>
                {child}
              </li>
            ))
          )}
        </ul>
      </div>
      <div>
        <button
          type="button"
          disabled={page === 0}
          className={styles['prev-button']}
          onClick={() => updateActive(page - 1)}
          aria-label="Previous"
        >
          <IconArrowLeftShort />
        </button>
        <button
          type="button"
          disabled={translate >= maxTranslate}
          className={styles['next-button']}
          onClick={() => updateActive(page + 1)}
          aria-label="Next"
        >
          <IconArrowRightShort />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
