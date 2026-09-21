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
  unoptimized?: boolean;
  /** Optional base64 data URL for a real blur-up preview. Omit to render empty (space is reserved by the aspect ratio). */
  blurDataURL?: string;
};

export const CardImage = ({
  src,
  alt,
  className,
  aspectRatio = 'video',
  objectFit = 'cover',
  priority = false,
  quality = 85,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
  width = 800,
  height = 600,
  unoptimized = false,
  blurDataURL,
}: CardImageProps) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/10]',
    auto: '',
  } as const;

  const aspectClass = (() => {
    switch (aspectRatio) {
      case 'square':
        return aspectClasses.square;
      case 'video':
        return aspectClasses.video;
      case 'wide':
        return aspectClasses.wide;
      case 'auto':
        return aspectClasses.auto;
      default:
        return aspectClasses.video;
    }
  })();

  return (
    <div
      className={clsx(
        'relative w-full rounded-lg overflow-hidden border border-zinc-800 group-hover:border-primary-500/50 group-focus-within:border-primary-500/50 transition-all duration-300 shadow-lg group-hover:shadow-glow-md group-focus-within:shadow-glow-md',
        aspectClass,
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
          'w-full h-full',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill'
        )}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        {...(blurDataURL ? { blurDataURL, placeholder: 'blur' as const } : {})}
        unoptimized={unoptimized}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300' />
    </div>
  );
};

export default CardImage;
