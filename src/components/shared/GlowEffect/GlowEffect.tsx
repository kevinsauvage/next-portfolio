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

  const variantClasses = {
    'primary-secondary': (
      <>
        <div
          className={`absolute -top-24 -right-24 ${intensityClasses[intensity]} bg-primary-500/20 rounded-full blur-3xl`}
        />
        <div
          className={`absolute -bottom-24 -left-24 ${intensityClasses[intensity]} bg-secondary-500/20 rounded-full blur-3xl`}
        />
      </>
    ),
    'secondary-accent': (
      <>
        <div
          className={`absolute top-0 right-0 ${intensityClasses[intensity]} bg-secondary-500/20 rounded-full blur-3xl`}
        />
        <div
          className={`absolute bottom-0 left-0 ${intensityClasses[intensity]} bg-accent-500/20 rounded-full blur-3xl`}
        />
      </>
    ),
    'primary-only': (
      <div
        className={`absolute -top-24 -right-24 ${intensityClasses[intensity]} bg-primary-500/20 rounded-full blur-3xl`}
      />
    ),
    'secondary-only': (
      <div
        className={`absolute -bottom-24 -left-24 ${intensityClasses[intensity]} bg-secondary-500/20 rounded-full blur-3xl`}
      />
    ),
  };

  return (
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${className}`}
    >
      {variantClasses[variant]}
    </div>
  );
};

export default GlowEffect;
