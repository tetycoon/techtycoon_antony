import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MarqueeItem {
    id: string | number;
    content: React.ReactNode;
}

interface InfiniteMarqueeProps {
    items: MarqueeItem[];
    speed?: number;
    direction?: 'left' | 'right';
    pauseOnHover?: boolean;
    className?: string;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
    items,
    speed = 50,
    direction = 'left',
    pauseOnHover = true,
    className = ''
}) => {
    const [isPaused, setIsPaused] = React.useState(false);

    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items];

    const duration = duplicatedItems.length * speed;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div
                className="flex"
                onMouseEnter={() => pauseOnHover && setIsPaused(true)}
                onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            >
                <motion.div
                    className="flex gap-8 pr-8"
                    animate={{
                        x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
                    }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatType: 'loop'
                    }}
                    style={{
                        animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                >
                    {duplicatedItems.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="flex-shrink-0"
                        >
                            {item.content}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default InfiniteMarquee;
