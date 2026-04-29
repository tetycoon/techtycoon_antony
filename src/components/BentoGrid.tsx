import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

interface BentoItem {
    id: string | number;
    title: string;
    description: string;
    icon?: React.ReactNode;
    size: 'small' | 'medium' | 'large';
    gradient?: string;
    image?: string;
}

interface BentoGridProps {
    items: BentoItem[];
    className?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ items, className = '' }) => {
    const getSizeClasses = (size: string) => {
        switch (size) {
            case 'large':
                return 'col-span-2 row-span-2';
            case 'medium':
                return 'col-span-2 row-span-1';
            case 'small':
            default:
                return 'col-span-1 row-span-1';
        }
    };

    return (
        <section className={`relative py-20 overflow-hidden ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-sm font-medium mb-4">
                        Our Services
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Comprehensive digital solutions tailored for your growth
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className={getSizeClasses(item.size)}
                        >
                            <TiltCard className="h-full" tiltMaxAngle={10}>
                                <div className={`relative h-full rounded-2xl p-6 md:p-8 overflow-hidden group cursor-pointer
                  bg-gradient-to-br ${item.gradient || 'from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/30'}
                  border border-blue-200/50 dark:border-blue-700/50
                  hover:border-blue-300 dark:hover:border-blue-600
                  shadow-xl shadow-blue-500/10 dark:shadow-blue-500/5
                  hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10
                  transition-all duration-300`}
                                >
                                    {/* Background Image */}
                                    {item.image && (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                    )}

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        {/* Icon */}
                                        {item.icon && (
                                            <motion.div
                                                className="text-4xl md:text-5xl mb-4 opacity-90"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {item.icon}
                                            </motion.div>
                                        )}

                                        {/* Text */}
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-300 transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 line-clamp-3">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Hover arrow */}
                                        <motion.div
                                            className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={{ x: -10 }}
                                            whileHover={{ x: 0 }}
                                        >
                                            <svg
                                                className="w-6 h-6 text-primary dark:text-blue-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    {/* Shimmer effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 -translate-x-full"
                                        animate={{
                                            translateX: ['-100%', '200%']
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatDelay: 5,
                                            ease: 'linear'
                                        }}
                                    />
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
