/* eslint-disable react/display-name */
/* eslint-disable func-names */

'use client';

import projects from '@/config/projects';
import { ImageGalleryProvider, useImageGalleryContext } from '@/contexts/ImageGalleryProvider';

import ProjectCard from './Project/Project';

import styles from './Projects.module.scss';

const WithImageGalleryProvider = (WrappedComponent) =>
  function () {
    return (
      <ImageGalleryProvider>
        <WrappedComponent />
      </ImageGalleryProvider>
    );
  };

const Projects = () => {
  const { updateSelectedImages } = useImageGalleryContext();

  return (
    <ul className={styles.Projects}>
      {projects.map((item) => (
        <ProjectCard key={item.title} item={item} updateSelectedImages={updateSelectedImages} />
      ))}
    </ul>
  );
};

export default WithImageGalleryProvider(Projects);
