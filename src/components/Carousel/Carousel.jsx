import { Children, cloneElement } from 'react';

import IconArrowLeftSquareFill from '@/svg/IconArrowLeftSquareFill';
import IconArrowRightSquareFill from '@/svg/IconArrowRightSquareFill';

import Indicators from './Indicators/Indicators';
import useCarouselFonctions from './useCarouselFonctions';

import styles from './Carousel.module.scss';

const Carousel = ({
  children,
  itemToShow,
  showIndicators,
  padding,
  arrowLeftStyle,
  arrowRightStyle,
}) => {
  const { handleTouchEnd, handleTouchMove, handleTouchStart, page, updateActive, childrensCount } =
    useCarouselFonctions(children, itemToShow);

  return (
    <>
      <div
        className={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <button
          type="button"
          aria-label="arrow left"
          style={arrowLeftStyle}
          className={`${styles.arrow} ${styles['arrow-left']}`}
          onClick={() => updateActive(page - 1)}
        >
          <IconArrowLeftSquareFill />
        </button>
        <div className={styles.inner} style={{ transform: `translateX(-${page * 100}%)` }}>
          {Children.map(children || undefined, (child, index) => (
            <div
              style={{
                paddingRight: `${padding}px`,
                width: `${100 / itemToShow}%`,
              }}
              className={`${styles.item} ${
                index + 1 <= itemToShow * (page + 1) &&
                index >= (page + 1) * itemToShow - itemToShow
                  ? ''
                  : styles.inactive
              }`}
            >
              {cloneElement(child)}
            </div>
          ))}
        </div>
        <button
          type="button"
          style={arrowRightStyle}
          aria-label="arrow right"
          className={`${styles.arrow} ${styles['arrow-right']}`}
          onClick={() => updateActive(page + 1)}
        >
          <IconArrowRightSquareFill />
        </button>
      </div>
      {showIndicators && (
        <Indicators
          page={page}
          updateActive={updateActive}
          itemsShow={itemToShow}
          childrensCount={childrensCount}
        />
      )}
    </>
  );
};

export default Carousel;
