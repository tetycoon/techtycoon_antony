import React, { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        gradient: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-blue-200 bg-transparent hover:bg-blue-100 text-blue-600",
        subtle: "bg-blue-100 text-blue-900 hover:bg-blue-200",
        ghost: "bg-transparent hover:bg-blue-100 text-blue-600",
        link: "text-blue-600 underline-offset-4 hover:underline p-0 h-auto dark:text-blue-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
      },
      roundness: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      roundness: "default",
    },
  }
);

interface RippleProps {
  x: number;
  y: number;
  size: number;
}

const Ripple: React.FC<RippleProps> = ({ x, y, size }) => {
  return (
    <motion.span
      className="absolute bg-white/30 rounded-full pointer-events-none"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0.5, scale: 0 }}
      animate={{ opacity: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ripple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    roundness,
    children,

    isLoading, 
    loadingText, 
    leftIcon, 
    rightIcon,
    ripple = true,
    ...props 
  }, ref) => {
    const [ripples, setRipples] = useState<RippleProps[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || isLoading) return;
      
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;
      
      const newRipple: RippleProps = { x, y, size };
      
      setRipples([...ripples, newRipple]);
      
      // Clean up ripples after animation
      setTimeout(() => {
        setRipples(ripples => ripples.slice(1));
      }, 500);
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, roundness, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        onClick={(e) => {
          handleClick(e);
          props.onClick?.(e);
        }}
        {...props}
      >
        {/* Ripple effects */}
        {ripples.map((ripple, i) => (
          <Ripple key={i} {...ripple} />
        ))}
        
        {/* Loading spinner */}
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {loadingText && <span>{loadingText}</span>}
          </span>
        )}
        
        {/* Button content */}
        <motion.span 
          className={isLoading ? 'invisible' : 'flex items-center gap-2'}
          whileTap={{ scale: 0.98 }}
        >
          {leftIcon && <span className="mr-1">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-1">{rightIcon}</span>}
        </motion.span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants }; 