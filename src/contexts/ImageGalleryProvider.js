'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import FixedLoader from '@/components/FixedLoader/FixedLoader';

const ImageGallery = dynamic(() => import('@/components/ImageGallery/ImageGallery'), {
  loading: () => <FixedLoader />,
  ssr: false,
});

export const ImageGalleryContext = createContext();

export const ImageGalleryProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const body = document.querySelector('html');
    body.style.overflow = selectedImages?.length ? 'hidden' : 'unset';
  }, [selectedImages]);

  const updateSelectedImages = useCallback((images) => {
    setSelectedImages(images);
  }, []);

  const state = useMemo(
    () => ({
      selectedImages,
      updateSelectedImages,
    }),
    [selectedImages, updateSelectedImages]
  );

  return (
    <ImageGalleryContext.Provider value={state}>
      {children}
      {selectedImages?.length > 0 && (
        <ImageGallery selectedImages={selectedImages} updateSelectedImages={updateSelectedImages} />
      )}
    </ImageGalleryContext.Provider>
  );
};

export const useImageGalleryContext = () => {
  const context = useContext(ImageGalleryContext);

  if (!context) {
    throw new Error('useImageGalleryContext must be used within a GalleryProvider');
  }

  return context;
};
