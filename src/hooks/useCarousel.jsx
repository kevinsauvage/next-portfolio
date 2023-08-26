import { Children, useCallback, useEffect, useState } from 'react';

const swipeLimit = 70;

const useCarousel = (children, itemToShow, slideReference, sliderReference) => {
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const childrensCount = Children.count(children);

  useEffect(() => {
    const handleResize = () => {
      const initialSlideWidth = slideReference.current.offsetWidth;
      const initialSliderWidth = sliderReference.current.offsetWidth;
      setSliderWidth(initialSliderWidth);
      setMaxTranslate(initialSlideWidth * childrensCount - sliderWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slideReference, itemToShow, childrensCount, sliderReference, sliderWidth]);

  const updateActive = useCallback(
    (newIndex) => {
      setTouchEnd();
      setTouchStart();

      if (newIndex <= 0) {
        setTranslate(0);
        setPage(0);
        return;
      }

      if ((newIndex + 1) * sliderWidth > maxTranslate) setTranslate(maxTranslate);
      else setTranslate((newIndex + 1) * sliderWidth);
      setPage(newIndex);
    },
    [maxTranslate, sliderWidth]
  );

  const handleTouchStart = (event) => setTouchStart(event.targetTouches[0].clientX);

  const handleTouchMove = (event) => setTouchEnd(event.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > swipeLimit)
      updateActive(page + 1 >= childrensCount / itemToShow ? page : page + 1);
    if (touchStart - touchEnd < -swipeLimit) updateActive(page - 1);
  };

  return {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    maxTranslate,
    page,
    translate,
    updateActive,
  };
};

export default useCarousel;
