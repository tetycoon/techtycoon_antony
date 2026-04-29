import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    tiltMaxAngle?: number;
    glareEnable?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = '',
    tiltMaxAngle = 15,
    glareEnable = true
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltMaxAngle, -tiltMaxAngle]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltMaxAngle, tiltMaxAngle]), springConfig);

    // Glare background gradient - must be called unconditionally at top level
    const glareBackground = useTransform(
        [x, y],
        ([latestX, latestY]) =>
            `radial-gradient(circle at ${((latestX as number) + 1) * 50}% ${((latestY as number) + 1) * 50}%, rgba(255,255,255,0.3), transparent 50%)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const percentX = (e.clientX - centerX) / (rect.width / 2);
        const percentY = (e.clientY - centerY) / (rect.height / 2);

        x.set(percentX);
        y.set(percentY);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className={`relative ${className}`}
        >
            {/* Glare effect */}
            {glareEnable && (
                <motion.div
                    className="absolute inset-0 rounded-inherit pointer-events-none overflow-hidden"
                    style={{
                        background: glareBackground,
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                />
            )}

            {/* Content */}
            <div style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </motion.div>
    );
};

export default TiltCard;
