import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AnimatedCounterProps {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * AnimatedCounter - Animated number counter with IntersectionObserver support
 * 
 * The counter only starts when it becomes visible in the viewport and animates
 * from start to end value with configurable duration, prefix, suffix, and separators.
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  start = 0,
  end,
  duration = 2,
  delay = 0.2,
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  className = '',
  onComplete,
}) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Format number with separator and decimals
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).replace(/,/g, separator);
  };

  // Set up intersection observer to detect when counter is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  // Animate the counter when it comes into view
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    
    hasAnimated.current = true;
    
    // Calculate frameRate for a smooth animation
    let frameRate = 1000 / 60; // 60fps
    let totalFrames = Math.round(duration * 1000 / frameRate);
    let currentFrame = 0;
    
    // The easing function for smoother motion
    const easeOutQuad = (t: number) => t * (2 - t);
    
    // Create animation frame
    const animate = () => {
      if (currentFrame < totalFrames) {
        currentFrame++;
        const progress = easeOutQuad(currentFrame / totalFrames);
        const currentCount = start + (end - start) * progress;
        setCount(currentCount);
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        if (onComplete) onComplete();
      }
    };
    
    // Start animation after delay
    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [isInView, start, end, duration, delay, onComplete]);

  return (
    <motion.div
      ref={counterRef}
      className={cn("font-bold", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <span className="sr-only">Count from {start} to {end}</span>
      <span aria-hidden={true}>
        {prefix}
        {formatNumber(count)}
        {suffix}
      </span>
    </motion.div>
  );
};

export default AnimatedCounter; 