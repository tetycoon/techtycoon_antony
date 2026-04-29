import React, { ReactNode } from 'react';
import { useTheme } from '../ThemeProvider';

interface AcrylicBackgroundProps {
  children: ReactNode;
  className?: string;
  blurStrength?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundOpacity?: number;
  borderOpacity?: number;
}

const AcrylicBackground: React.FC<AcrylicBackgroundProps> = ({
  children,
  className = '',
  blurStrength = 'md',
  backgroundOpacity = 0.7,
  borderOpacity = 0.1
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getBlurClass = () => {
    switch (blurStrength) {
      case 'sm': return 'backdrop-blur-sm';
      case 'lg': return 'backdrop-blur-lg';
      case 'xl': return 'backdrop-blur-xl';
      default: // 'md'
        return 'backdrop-blur-md';
    }
  };

  const backgroundStyle = isDark
    ? `bg-black/60 ${getBlurClass()}`
    : `bg-white/60 ${getBlurClass()}`;

  const borderStyle = isDark
    ? 'border border-white/10'
    : 'border border-black/5';

  return (
    <div
      className={`relative ${className}`}
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className={`absolute inset-0 ${backgroundStyle} ${borderStyle}`}></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AcrylicBackground; 