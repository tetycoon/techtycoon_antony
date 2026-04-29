import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';

interface StatItem {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon?: React.ReactNode;
}

interface StatsCounterProps {
    stats: StatItem[];
    duration?: number;
}

const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            setCount(Math.floor(progress * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isInView, value, duration]);

    return <span ref={nodeRef}>{count}</span>;
};

const StatsCounter: React.FC<StatsCounterProps> = ({ stats, duration = 2 }) => {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent dark:via-blue-950/30 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-sm font-medium mb-4">
                        Our Impact
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Making a real difference with measurable results
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            className="relative group"
                        >
                            <div className="relative bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl shadow-blue-500/10 dark:shadow-blue-500/5 border border-blue-100/50 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Icon */}
                                {stat.icon && (
                                    <motion.div
                                        className="text-3xl md:text-4xl mb-3 opacity-80"
                                        animate={{
                                            rotate: [0, 10, 0],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        {stat.icon}
                                    </motion.div>
                                )}

                                {/* Number */}
                                <div className="relative">
                                    <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                                        {stat.prefix}
                                        <AnimatedNumber value={stat.value} duration={duration} />
                                        {stat.suffix}
                                    </div>

                                    {/* Label */}
                                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                                        {stat.label}
                                    </p>
                                </div>

                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10 -translate-x-full"
                                    animate={{
                                        translateX: ['- 100%', '200%']
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        ease: "linear"
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
