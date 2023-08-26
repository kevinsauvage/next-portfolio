'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import IconCloseOutline from '@/svg/IconCloseOutline';

import Carousel from '../Carousel/Carousel';

import styles from './ImageGallery.module.scss';

const swipeLimit = 70;

const ImageGallery = ({ selectedImages, updateSelectedImages }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();

  const handleTouchStart = (event) => setTouchStart(event.targetTouches[0].clientX);

  const handleTouchMove = (event) => setTouchEnd(event.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > swipeLimit) {
      setSelectedImageIndex((previous) =>
        previous >= selectedImages.length - 1 ? previous : previous + 1
      );
    }
    if (touchStart - touchEnd < -swipeLimit) {
      setSelectedImageIndex((previous) => (previous <= 0 ? 0 : previous - 1));
    }
  };

  const openImage = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    updateSelectedImages([]);
  };

  return (
    <div className={styles.gallery}>
      {selectedImages?.length > 0 && (
        <div
          tabIndex={0}
          role="button"
          className={styles.modalOverlay}
          onClick={closeImage}
          onKeyDown={(event) => event.key === 'Enter' && closeImage()}
        >
          <div
            role="presentation"
            className={styles.modal}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.stopPropagation();
                event.preventDefault();
              }
            }}
          >
            <button type="button" className={styles.closeButton} onClick={closeImage}>
              <IconCloseOutline />
            </button>
            <Image
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
              key={selectedImages[selectedImageIndex].src}
              src={selectedImages[selectedImageIndex].src}
              alt="Selected image"
              className={styles.modalImage}
              width={1600}
              height={900}
            />

            <div className={styles.carousel}>
              <Carousel className={styles.carouselInner} slideClass={styles.slide} itemToShow={5}>
                {selectedImages.map((image, index) => (
                  <Image
                    key={image.thumbnail}
                    src={image.thumbnail}
                    width={1600}
                    height={900}
                    alt={`Image ${index}`}
                    className={`${styles.thumbnail} ${
                      selectedImageIndex === index && styles.selected
                    }`}
                    onClick={(event) => openImage(event, index)}
                  />
                ))}
              </Carousel>
            </div>

            <div className={styles.indicators}>
              <span>{selectedImageIndex + 1}</span>
              <span>/</span>
              <span>{selectedImages?.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
