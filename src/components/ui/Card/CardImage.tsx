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
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
  width = 800,
  height = 600,
  unoptimized = false,
  blurDataURL,
}: CardImageProps) => {
  return (
    <div
      className={clsx(
        'relative w-full rounded-lg overflow-hidden border border-zinc-800 group-hover:border-primary-500/50 group-focus-within:border-primary-500/50 transition-all duration-300 shadow-lg group-hover:shadow-glow-md group-focus-within:shadow-glow-md',
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
        sizes={sizes}
        {...(blurDataURL ? { blurDataURL, placeholder: 'blur' as const } : {})}
        unoptimized={unoptimized}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300' />
    </div>
  );
};

export default CardImage;
