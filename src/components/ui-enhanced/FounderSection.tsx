import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Try direct import without spaces in filename
import founderImage from '../../assets/Antony.png';

interface FounderSectionProps {
  className?: string;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ className }) => {
  const [imageError, setImageError] = useState(false);
  
  // Image path as a fallback
  const imagePath = '/src/assets/Antony.png';
  
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 shadow-lg ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Meet the Founder
        </h2>
      </div>
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <motion.div 
          className="w-64 h-64 rounded-full overflow-hidden flex-shrink-0 border-4 border-white dark:border-gray-800 shadow-xl mx-auto md:mx-0 bg-blue-100 dark:bg-blue-900/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {!imageError ? (
            <img 
              src={founderImage || imagePath}
              alt="Antony - Founder" 
              className="w-full h-full object-cover"
              loading="lazy"
              width={256}
              height={256}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-600 dark:text-blue-400">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm">Antony Thomas</p>
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="flex flex-col flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Antony Thomas
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
              AI Education Specialist & Entrepreneur
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              With over 15 years of experience in artificial intelligence and education, 
              Antony has helped thousands of students transition into successful AI careers. 
              His unique teaching methodology combines theoretical foundations with practical, 
              hands-on projects that prepare students for real-world AI implementation.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              "My goal is to demystify AI and make it accessible to everyone. 
              You don't need to be a math genius or have a computer science degree to 
              leverage the power of artificial intelligence in your career or business."
            </p>
            
            <div className="flex flex-wrap gap-3">
              <motion.div 
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <span className="font-medium">15+ Years Experience</span>
              </motion.div>
              <motion.div 
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <span className="font-medium">10,000+ Students</span>
              </motion.div>
              <motion.div 
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <span className="font-medium">200+ AI Courses</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Social proof section */}
      <motion.div 
        className="mt-8 pt-8 border-t border-blue-200 dark:border-blue-800/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">200+</p>
            <p className="text-gray-600 dark:text-gray-300">AI Courses Created</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</p>
            <p className="text-gray-600 dark:text-gray-300">Students Trained</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">92%</p>
            <p className="text-gray-600 dark:text-gray-300">Success Rate</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">15+</p>
            <p className="text-gray-600 dark:text-gray-300">Years Experience</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 