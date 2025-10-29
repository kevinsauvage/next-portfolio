import Image from 'next/image';

import clsx from 'clsx';

type CardImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill';
  priority?: boolean;
  quality?: number;
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
  quality = 85,
  sizes = '(max-width: 768px) 100vw, 40vw',
  width = 800,
  height = 600,
}: CardImageProps) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/10]',
    auto: '',
  } as const;

  return (
    <div
      className={clsx(
        'relative w-full rounded-lg overflow-hidden border border-zinc-800 group-hover:border-blue-500/50 transition-all duration-300 shadow-lg group-hover:shadow-glow-md',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        className={clsx(
          'w-full h-full transition-transform duration-500 group-hover:scale-110',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill'
        )}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
      />
      <div className='absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
    </div>
  );
};

export default CardImage;
