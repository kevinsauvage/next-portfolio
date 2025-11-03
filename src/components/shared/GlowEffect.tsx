type GlowEffectProps = {
  variant?: 'primary-secondary' | 'secondary-accent' | 'primary-only' | 'secondary-only';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
};

const GlowEffect: React.FC<GlowEffectProps> = ({
  variant = 'primary-secondary',
  intensity = 'medium',
  className = '',
}) => {
  const intensityClasses = {
    low: 'w-32 h-32',
    medium: 'w-48 h-48',
    high: 'w-64 h-64',
  };

  const intensityClass = (() => {
    switch (intensity) {
      case 'low':
        return intensityClasses.low;
      case 'medium':
        return intensityClasses.medium;
      case 'high':
        return intensityClasses.high;
      default:
        return intensityClasses.medium;
    }
  })();

  const variantClasses = {
    'primary-secondary': (
      <>
        <div
          className={`absolute -top-24 -right-24 ${intensityClass} bg-primary-500/20 rounded-full blur-3xl`}
        />
        <div
          className={`absolute -bottom-24 -left-24 ${intensityClass} bg-secondary-500/20 rounded-full blur-3xl`}
        />
      </>
    ),
    'secondary-accent': (
      <>
        <div
          className={`absolute top-0 right-0 ${intensityClass} bg-secondary-500/20 rounded-full blur-3xl`}
        />
        <div
          className={`absolute bottom-0 left-0 ${intensityClass} bg-accent-500/20 rounded-full blur-3xl`}
        />
      </>
    ),
    'primary-only': (
      <div
        className={`absolute -top-24 -right-24 ${intensityClass} bg-primary-500/20 rounded-full blur-3xl`}
      />
    ),
    'secondary-only': (
      <div
        className={`absolute -bottom-24 -left-24 ${intensityClass} bg-secondary-500/20 rounded-full blur-3xl`}
      />
    ),
  };

  const variantContent = (() => {
    switch (variant) {
      case 'primary-secondary':
        return variantClasses['primary-secondary'];
      case 'secondary-accent':
        return variantClasses['secondary-accent'];
      case 'primary-only':
        return variantClasses['primary-only'];
      case 'secondary-only':
        return variantClasses['secondary-only'];
      default:
        return variantClasses['primary-secondary'];
    }
  })();

  return (
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${className}`}
    >
      {variantContent}
    </div>
  );
};

export default GlowEffect;
