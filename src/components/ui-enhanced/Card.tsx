import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  "rounded-lg shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        glass: "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 dark:border-gray-800/20",
        acrylic: "bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border border-white/10 dark:border-gray-700/20 shadow-xl",
        outline: "bg-transparent border border-gray-200 dark:border-gray-700",
        filled: "bg-gray-100 dark:bg-gray-900 border-none",
      },
      radius: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-3xl",
        none: "rounded-none",
      },
      shadow: {
        default: "shadow-md",
        sm: "shadow-sm",
        lg: "shadow-lg",
        xl: "shadow-xl",
        none: "shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
      shadow: "default",
    },
  }
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
  hoverEffect?: "lift" | "scale" | "glow" | "none";
  onClick?: () => void;
  isInteractive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className, 
    variant, 
    radius, 
    shadow,
    hoverEffect = "none",
    onClick,
    isInteractive = false,
    ...props 
  }, ref) => {
    const hoverEffectClass = {
      lift: "hover:-translate-y-1 transition-transform duration-300",
      scale: "hover:scale-105 transition-transform duration-300",
      glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-shadow duration-300",
      none: ""
    };

    return isInteractive ? (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(
          cardVariants({ variant, radius, shadow }),
          hoverEffectClass[hoverEffect],
          isInteractive && "cursor-pointer",
          className
        )}
        whileHover={hoverEffect === "lift" ? { y: -5 } : 
                    hoverEffect === "scale" ? { scale: 1.05 } : 
                    hoverEffect === "glow" ? { boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" } : 
                    {}}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    ) : (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, radius, shadow }),
          hoverEffectClass[hoverEffect],
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white",
      className
    )}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }; 