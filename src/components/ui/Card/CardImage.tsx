import Image from 'next/image';

import clsx from 'clsx';

const ASPECT_CLASSES = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[16/10]',
  auto: '',
} as const;

type CardImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: keyof typeof ASPECT_CLASSES;
  objectFit?: 'cover' | 'contain' | 'fill';
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

export const CardImage = ({
  src,
  alt,
  className,
  aspectRatio = 'video',
  objectFit = 'cover',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
  width = 800,
  height = 600,
}: CardImageProps) => {
  return (
    <div
      className={clsx(
        'relative w-full rounded-lg overflow-hidden border border-zinc-800 group-hover:border-primary-500/50 group-focus-within:border-primary-500/50 transition-[border-color,box-shadow] duration-200 shadow-lg group-hover:shadow-glow-md group-focus-within:shadow-glow-md',
        // eslint-disable-next-line security/detect-object-injection -- keyed by a typed union
        ASPECT_CLASSES[aspectRatio],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx(
          'w-full h-full',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill'
        )}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority && { fetchPriority: 'high' as const })}
        sizes={sizes}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200' />
    </div>
  );
};

export default CardImage;
