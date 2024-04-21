import Image, { ImageProps } from 'next/image';

import styles from './CurserFollowImage.module.scss';

type CurserFollowImageProperties = {
  isHovered: boolean;
  mousePosition: { x: number; y: number };
} & ImageProps;

const CurserFollowImage: React.FC<CurserFollowImageProperties> = ({
  isHovered,
  mousePosition,
  ...rest
}) => {
  return (
    <Image
      {...rest}
      alt={rest.alt}
      className={`${styles.CurserFollowImage} ${isHovered && styles.isHovered}`}
      style={{ left: `${mousePosition?.x}px`, top: `${mousePosition?.y}px` }}
    />
  );
};

export default CurserFollowImage;
