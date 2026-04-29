import React, { useEffect, useState, useRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    withUnderline?: boolean;
  }
>(({ className, withUnderline = false, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-blue-500 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-blue-400 relative",
      withUnderline && "data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 dark:data-[state=active]:after:bg-blue-400",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface AnimatedTabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  slideDirection?: 'left' | 'right' | 'none';
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  AnimatedTabsContentProps
>(({ className, slideDirection = 'none', ...props }, ref) => {
  const animations = {
    left: {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 10 },
    },
    right: {
      initial: { opacity: 0, x: 10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -10 },
    },
    none: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  return (
    <TabsPrimitive.Content
      ref={ref}
      asChild
      {...props}
    >
      <motion.div
        className={cn(
          "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-500",
          className
        )}
        {...animations[slideDirection]}
        transition={{ duration: 0.2 }}
      />
    </TabsPrimitive.Content>
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Variant with an animated indicator
interface AnimatedTabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  tabItems: {
    value: string;
    label: React.ReactNode;
  }[];
}

const AnimatedTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  AnimatedTabsProps
>(({ className, tabItems, defaultValue, ...props }, ref) => {
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultValue as string);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  // Handle tab change to update the indicator position
  const handleValueChange = (value: string) => {
    setActiveTab(value);
    updateIndicatorPosition(value);
  };

  // Update indicator position based on active tab
  const updateIndicatorPosition = (value: string) => {
    if (!tabsRef.current) return;
    
    const activeTabElement = tabsRef.current.querySelector(`[data-state="active"][value="${value}"]`);
    
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement as HTMLElement;
      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  };

  // Update indicator position on mount and when tabs change
  useEffect(() => {
    if (activeTab) {
      updateIndicatorPosition(activeTab);
    }
    
    // Add resize listener to handle window size changes
    const handleResize = () => activeTab && updateIndicatorPosition(activeTab);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, tabItems]);

  return (
    <Tabs
      ref={ref}
      defaultValue={defaultValue}
      className={cn("relative", className)}
      onValueChange={handleValueChange}
      {...props}
    >
      <div className="relative" ref={tabsRef}>
        <TabsList className="w-full flex rounded-full p-1">
          {tabItems.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="flex-1 rounded-full z-10"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <motion.div 
          className="absolute z-0 h-8 bg-white dark:bg-gray-900 rounded-full"
          style={{
            top: '4px',
            ...indicatorStyle
          }}
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        />
      </div>
      {props.children}
    </Tabs>
  );
});
AnimatedTabs.displayName = "AnimatedTabs";

export { Tabs, TabsList, TabsTrigger, TabsContent, AnimatedTabs }; 