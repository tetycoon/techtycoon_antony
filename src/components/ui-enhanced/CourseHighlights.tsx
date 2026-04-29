import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EnhancedCourseHighlights: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <div ref={sectionRef} className="text-center mb-16">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Newsletter
      </motion.h2>
      
      <motion.div 
        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 mx-auto mb-6 rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      
      <motion.p 
        className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Stay updated with the latest AI trends, technology insights, and exclusive course offers by subscribing to our newsletter.
      </motion.p>
    </div>
  );
};

export default EnhancedCourseHighlights; 