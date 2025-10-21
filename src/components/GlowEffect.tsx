type GlowEffectProps = {
  variant?: 'blue-purple' | 'purple-pink' | 'blue-only' | 'purple-only';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
};

const GlowEffect: React.FC<GlowEffectProps> = ({
  variant = 'blue-purple',
  intensity = 'medium',
  className = '',
}) => {
  const intensityClasses = {
    low: 'w-32 h-32',
    medium: 'w-48 h-48',
    high: 'w-64 h-64',
  };

  const variantClasses = {
    'blue-purple': (
      <>
        <div
          className={`absolute -top-24 -right-24 ${intensityClasses[intensity]} bg-blue-500/20 rounded-full blur-3xl`}
        />
        <div
          className={`absolute -bottom-24 -left-24 ${intensityClasses[intensity]} bg-purple-500/20 rounded-full blur-3xl`}
        />
      </>
    ),
    'purple-pink': (
      <>
        <div
          className={`absolute top-0 right-0 ${intensityClasses[intensity]} bg-purple-500/20 rounded-full blur-3xl`}
        />
        <div
          className={`absolute bottom-0 left-0 ${intensityClasses[intensity]} bg-pink-500/20 rounded-full blur-3xl`}
        />
      </>
    ),
    'blue-only': (
      <div
        className={`absolute -top-24 -right-24 ${intensityClasses[intensity]} bg-blue-500/20 rounded-full blur-3xl`}
      />
    ),
    'purple-only': (
      <div
        className={`absolute -bottom-24 -left-24 ${intensityClasses[intensity]} bg-purple-500/20 rounded-full blur-3xl`}
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
