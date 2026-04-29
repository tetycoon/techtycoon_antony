import React, { ReactNode } from 'react';
import { useTheme } from '../ThemeProvider';
import AcrylicBackground from './AcrylicBackground';

export type CardVariant = 'flat' | 'bordered' | 'shadow' | 'acrylic';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  isPressable?: boolean;
  isHoverable?: boolean;
  isBlurred?: boolean;
  isFooterBlurred?: boolean;
  isHeaderBlurred?: boolean;
  fullWidth?: boolean;
  radius?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  disableAnimation?: boolean;
}

export const CardHeader: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 pt-6 flex flex-col gap-2 ${className}`}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-4 flex-grow ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 pb-6 flex items-center gap-2 ${className}`}>
      {children}
    </div>
  );
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'flat',
  isPressable = false,
  isHoverable = false,
  isBlurred = false,
  isFooterBlurred = false,
  isHeaderBlurred = false,
  fullWidth = false,
  radius = 'lg',
  shadow = 'md',
  disableAnimation = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getRadiusClasses = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'lg': return 'rounded-xl';
      default: // 'md'
        return 'rounded-lg';
    }
  };

  const getShadowClasses = () => {
    if (variant !== 'shadow' && variant !== 'acrylic') return '';
    
    switch (shadow) {
      case 'none': return '';
      case 'sm': return isDark ? 'shadow-sm shadow-gray-900/40' : 'shadow-sm';
      case 'lg': return isDark ? 'shadow-xl shadow-gray-900/40' : 'shadow-xl';
      default: // 'md'
        return isDark ? 'shadow-md shadow-gray-900/40' : 'shadow-md';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return isDark ? 'border border-gray-700' : 'border border-gray-200';
      case 'shadow':
        return isDark ? 'bg-gray-800' : 'bg-white';
      case 'acrylic':
        return '';
      default: // 'flat'
        return isDark ? 'bg-gray-800' : 'bg-white';
    }
  };

  const getInteractiveClasses = () => {
    const pressable = isPressable ? (isDark ? 'active:opacity-70' : 'active:opacity-80') : '';
    const hoverable = isHoverable ? (isDark 
      ? 'hover:bg-gray-700 hover:z-10 hover:-translate-y-1' 
      : 'hover:bg-gray-50 hover:z-10 hover:-translate-y-1') : '';
    
    return `${pressable} ${hoverable}`;
  };

  const getAnimationClasses = () => {
    return disableAnimation ? '' : 'transition-all duration-200';
  };

  const baseClasses = `
    ${getRadiusClasses()}
    ${getShadowClasses()}
    ${getVariantClasses()}
    ${getInteractiveClasses()}
    ${getAnimationClasses()}
    ${fullWidth ? 'w-full' : ''}
    overflow-hidden
    flex flex-col
  `;

  if (variant === 'acrylic') {
    return (
      <AcrylicBackground 
        className={`${baseClasses} ${className}`} 
        blurStrength={isBlurred ? 'xl' : 'lg'}
      >
        {children}
      </AcrylicBackground>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card; 