import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { useTheme } from '../ThemeProvider';

export type ButtonVariant = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'ghost';
export type ButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
  fullWidth?: boolean;
  isLoading?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  disableAnimation?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      radius = 'md',
      fullWidth = false,
      isLoading = false,
      startContent,
      endContent,
      disableAnimation = false,
      isDisabled = false,
      isIconOnly = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return isIconOnly ? 'h-8 w-8 text-sm' : 'h-8 px-3 text-sm';
        case 'lg':
          return isIconOnly ? 'h-12 w-12 text-lg' : 'h-12 px-6 text-lg';
        default: // 'md'
          return isIconOnly ? 'h-10 w-10' : 'h-10 px-4';
      }
    };

    const getRadiusClasses = () => {
      switch (radius) {
        case 'none':
          return 'rounded-none';
        case 'sm':
          return 'rounded-sm';
        case 'lg':
          return 'rounded-lg';
        case 'full':
          return 'rounded-full';
        default: // 'md'
          return 'rounded-md';
      }
    };

    const getVariantClasses = () => {
      const colorMap = {
        default: {
          solid: `bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900 ${isDark ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : ''}`,
          bordered: `border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : ''}`,
          light: `bg-gray-100 text-gray-900 hover:bg-gray-200 ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : ''}`,
          flat: `bg-transparent text-gray-700 hover:bg-gray-100 ${isDark ? 'text-gray-300 hover:bg-gray-800' : ''}`,
          faded: `bg-gray-100/50 text-gray-900 hover:bg-gray-100 ${isDark ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800' : ''}`,
          ghost: `text-gray-700 hover:bg-gray-100 ${isDark ? 'text-gray-300 hover:bg-gray-800' : ''}`,
        },
        primary: {
          solid: `bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700`,
          bordered: `border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100 ${isDark ? 'hover:bg-primary-900 active:bg-primary-800' : ''}`,
          light: `bg-primary-100 text-primary-700 hover:bg-primary-200 ${isDark ? 'bg-primary-900 text-primary-400 hover:bg-primary-800' : ''}`,
          flat: `bg-transparent text-primary-500 hover:bg-primary-50 ${isDark ? 'hover:bg-primary-900' : ''}`,
          faded: `bg-primary-100/50 text-primary-700 hover:bg-primary-100 ${isDark ? 'bg-primary-900/50 text-primary-400 hover:bg-primary-900' : ''}`,
          ghost: `text-primary-500 hover:bg-primary-50 ${isDark ? 'hover:bg-primary-900' : ''}`,
        },
        secondary: {
          solid: `bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700`,
          bordered: `border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 active:bg-secondary-100 ${isDark ? 'hover:bg-secondary-900 active:bg-secondary-800' : ''}`,
          light: `bg-secondary-100 text-secondary-700 hover:bg-secondary-200 ${isDark ? 'bg-secondary-900 text-secondary-400 hover:bg-secondary-800' : ''}`,
          flat: `bg-transparent text-secondary-500 hover:bg-secondary-50 ${isDark ? 'hover:bg-secondary-900' : ''}`,
          faded: `bg-secondary-100/50 text-secondary-700 hover:bg-secondary-100 ${isDark ? 'bg-secondary-900/50 text-secondary-400 hover:bg-secondary-900' : ''}`,
          ghost: `text-secondary-500 hover:bg-secondary-50 ${isDark ? 'hover:bg-secondary-900' : ''}`,
        },
        success: {
          solid: `bg-green-500 text-white hover:bg-green-600 active:bg-green-700`,
          bordered: `border-2 border-green-500 text-green-500 hover:bg-green-50 active:bg-green-100 ${isDark ? 'hover:bg-green-900 active:bg-green-800' : ''}`,
          light: `bg-green-100 text-green-700 hover:bg-green-200 ${isDark ? 'bg-green-900 text-green-400 hover:bg-green-800' : ''}`,
          flat: `bg-transparent text-green-500 hover:bg-green-50 ${isDark ? 'hover:bg-green-900' : ''}`,
          faded: `bg-green-100/50 text-green-700 hover:bg-green-100 ${isDark ? 'bg-green-900/50 text-green-400 hover:bg-green-900' : ''}`,
          ghost: `text-green-500 hover:bg-green-50 ${isDark ? 'hover:bg-green-900' : ''}`,
        },
        warning: {
          solid: `bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700`,
          bordered: `border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50 active:bg-yellow-100 ${isDark ? 'hover:bg-yellow-900 active:bg-yellow-800' : ''}`,
          light: `bg-yellow-100 text-yellow-700 hover:bg-yellow-200 ${isDark ? 'bg-yellow-900 text-yellow-400 hover:bg-yellow-800' : ''}`,
          flat: `bg-transparent text-yellow-500 hover:bg-yellow-50 ${isDark ? 'hover:bg-yellow-900' : ''}`,
          faded: `bg-yellow-100/50 text-yellow-700 hover:bg-yellow-100 ${isDark ? 'bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900' : ''}`,
          ghost: `text-yellow-500 hover:bg-yellow-50 ${isDark ? 'hover:bg-yellow-900' : ''}`,
        },
        danger: {
          solid: `bg-red-500 text-white hover:bg-red-600 active:bg-red-700`,
          bordered: `border-2 border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100 ${isDark ? 'hover:bg-red-900 active:bg-red-800' : ''}`,
          light: `bg-red-100 text-red-700 hover:bg-red-200 ${isDark ? 'bg-red-900 text-red-400 hover:bg-red-800' : ''}`,
          flat: `bg-transparent text-red-500 hover:bg-red-50 ${isDark ? 'hover:bg-red-900' : ''}`,
          faded: `bg-red-100/50 text-red-700 hover:bg-red-100 ${isDark ? 'bg-red-900/50 text-red-400 hover:bg-red-900' : ''}`,
          ghost: `text-red-500 hover:bg-red-50 ${isDark ? 'hover:bg-red-900' : ''}`,
        },
      };

      return colorMap[color][variant];
    };

    const getDisabledClasses = () => {
      return 'opacity-50 cursor-not-allowed';
    };

    const getAnimationClasses = () => {
      return disableAnimation ? '' : 'transition-all duration-200';
    };

    const renderSpinner = () => (
      <svg
        className="animate-spin h-4 w-4 text-current"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        disabled={isDisabled || isLoading}
        className={`
          inline-flex items-center justify-center gap-2 font-medium
          ${getSizeClasses()}
          ${getRadiusClasses()}
          ${getVariantClasses()}
          ${isDisabled || isLoading ? getDisabledClasses() : ''}
          ${getAnimationClasses()}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading && !isIconOnly && <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{renderSpinner()}</div>}
        {isLoading && isIconOnly ? renderSpinner() : (
          <>
            {startContent && <span>{startContent}</span>}
            {!isLoading && <span>{children}</span>}
            {endContent && <span>{endContent}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 