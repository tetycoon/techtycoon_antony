import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  perspective?: number;
  scale?: number;
  rotationFactor?: number;
  glareOpacity?: number;
  disabled?: boolean;
}

/**
 * TiltCard - A component that creates a 3D tilt effect on hover
 * 
 * Provides a premium 3D parallax tilt effect with configurable glare
 * and smooth transitions, making content feel more interactive.
 */
const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glareColor = 'rgba(255, 255, 255, 0.4)',
  perspective = 1500,
  scale = 1.05,
  rotationFactor = 15,
  glareOpacity = 0.3,
  disabled = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized mouse position (-1 to 1)
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    // Calculate rotation angles
    const rotateY = normalizedX * rotationFactor;
    const rotateX = -normalizedY * rotationFactor;
    
    // Update state
    setRotation({ x: rotateX, y: rotateY });
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
  };

  // Handle mouse leave - reset all transforms
  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden transition-transform',
        disabled ? 'cursor-default' : 'cursor-pointer',
        className
      )}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Actual content */}
      <div
        className="transform-style-3d"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0)' }}
      >
        {children}
      </div>

      {/* Glare effect - only visible on hover */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%, ${glareColor}, transparent)`,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(1px)', // Place slightly above content
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? glareOpacity : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

export default TiltCard; 