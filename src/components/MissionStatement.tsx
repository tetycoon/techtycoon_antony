import React from 'react';
import { motion } from 'framer-motion';

const MissionStatement: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 md:p-12 shadow-lg border border-blue-100/50 dark:border-blue-800/30"
      >
        <motion.div 
          variants={itemVariants}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mb-10 text-center"
        >
          <p className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-200 italic">
            "To democratize AI-powered marketing and empower businesses of all sizes to thrive in the digital landscape."
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="space-y-6 text-gray-600 dark:text-gray-300"
        >
          <p>
            At Tech Tycoon Digital Solutions, we believe that every business, regardless of size or budget, deserves access to cutting-edge AI marketing tools and strategies. We're on a mission to bridge the gap between advanced technology and practical business applications.
          </p>
          
          <p>
            Our team of experts is committed to simplifying complex AI concepts and transforming them into actionable strategies that drive real business growth. We focus on delivering measurable results, providing exceptional value, and fostering long-term success for our clients and students.
          </p>
          
          <p>
            Through our comprehensive training programs and customized marketing solutions, we aim to empower entrepreneurs, marketers, and business owners with the knowledge and tools they need to navigate the ever-evolving digital landscape confidently.
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-10 flex justify-center"
        > 
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MissionStatement; 