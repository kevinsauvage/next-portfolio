'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import Link from 'next/link';

import ClientPortal from '@/components/ClientPortal/ClientPortal';
import CurserFollowImage from '@/components/CurserFollowImage/CurserFollowImage';

import { ProjectType } from './types';

import styles from './Project.module.scss';

import { MoveUpRight } from 'lucide-react';

type Properties = {
  item: ProjectType;
  mousePosition: { x: number; y: number };
} & React.HTMLAttributes<HTMLAnchorElement>;

const Project = ({ item, mousePosition, className }: Properties) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, technologies, images, websiteLink } = item || {};

  return (
    <article
      className={`${styles.card} ${className}`}
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Link
        href={websiteLink}
        target="_blank"
        rel="noopener noreferrer"
        title={`Go to ${title}`}
        aria-label={`Open ${title} website in a new tab`}
      >
        <ClientPortal selector="#portal-root">
          <CurserFollowImage
            {...images.thumbnail}
            isHovered={isHovered}
            mousePosition={mousePosition}
            width={1600}
            height={900}
          />
        </ClientPortal>
        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className={styles.title}>{title}</h3>

            <div className={styles.languages}>
              {technologies.map(({ name }) => (
                <div key={name} className={styles.language}>
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.linkPlaceHolder}>
            View project <MoveUpRight size={20} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Project;
