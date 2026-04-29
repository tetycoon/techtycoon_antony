import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Using direct public path instead of import for more reliable loading
// import founderImage from '../../assets/Antony.png';

interface CompactFounderSectionProps {
  className?: string;
}

export const CompactFounderSection: React.FC<CompactFounderSectionProps> = ({ className }) => {
  const [imageError, setImageError] = useState(false);
  
  // Use the public path for the image
  const founderImageUrl = '/Antony.png';
  
  return (
    <motion.div 
      className={`bg-blue-50/80 dark:bg-blue-900/10 rounded-xl overflow-hidden shadow-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image column - taking up full height on desktop */}
        <div className="md:w-2/5 order-2 md:order-2 relative">
          {!imageError ? (
            <img 
              src={founderImageUrl}
              alt="Antony Praveen - Founder" 
              className="w-full h-full object-cover md:absolute md:inset-0"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm">Founder Image</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Content column */}
        <div className="md:w-3/5 p-6 order-1 md:order-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Meet the Founder
          </h2>
          
          <h3 className="text-blue-600 dark:text-blue-400 font-medium text-lg mb-4">
            Antony Praveen
          </h3>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
            As the founder of Tech Tycoon Digital Solutions, I am passionate about empowering
            businesses and individuals to unlock their potential in the digital world. With over 4 years
            of experience in digital marketing, content creation, and training, my journey has been
            shaped by a commitment to excellence and innovation.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
            I hold a Master's Degree in Philosophy and have specialized in communication, technology,
            Digital Media and AI, which gives me a unique perspective on blending creative strategies
            with cutting-edge digital tools.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 italic text-sm border-l-4 border-blue-500 pl-3 py-1">
            "AI WILL NOT REPLACE YOU, BUT A PERSON USING AI WILL."
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 