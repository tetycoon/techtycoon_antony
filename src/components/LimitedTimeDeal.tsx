import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LimitedTimeDeal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-hide and show effect to draw attention
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 300);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.8,
        scale: isVisible ? 1 : 0.98,
        y: isVisible ? 0 : 2
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 text-white p-4 rounded-lg shadow-lg mb-6 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute -right-5 -top-5 w-20 h-20 bg-white rounded-full opacity-20"></div>
      <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white rounded-full opacity-10"></div>
      
      {/* Animated ribbon */}
      <motion.div 
        className="absolute -right-8 -top-8 w-24 h-24 bg-red-500 rotate-45"
        animate={{ 
          backgroundColor: ['#ef4444', '#f97316', '#ef4444'],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 3
        }}
      />
      
      {/* Star burst effect - removed percentage text */}
      <motion.div 
        className="absolute top-3 right-3 bg-white text-xs font-bold text-orange-600 rounded-full h-16 w-16 flex items-center justify-center shadow-md z-10"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
          boxShadow: ['0px 0px 0px rgba(255,255,255,0.5)', '0px 0px 15px rgba(255,255,255,0.8)', '0px 0px 0px rgba(255,255,255,0.5)']
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 10, ease: "linear" },
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          boxShadow: { repeat: Infinity, duration: 2 }
        }}
      >
        <div className="text-center">
          <div className="text-[10px]">LIMITED</div>
          <div className="text-[10px]">TIME</div>
        </div>
      </motion.div>

      <div className="relative z-10">
        <motion.h3 
          className="text-xl md:text-2xl font-extrabold mb-1 text-white"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Limited Time Offer!
        </motion.h3>
        
        <p className="text-sm md:text-base font-medium text-white mb-2">
          Enroll now in this exclusive course!
        </p>
        
        {/* Time remaining countdown */}
        <div className="mt-1">
          <div className="flex items-center gap-1 text-xs font-semibold">
            <motion.div 
              className="w-3 h-3 rounded-full bg-white"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <span>Offer expires soon!</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LimitedTimeDeal; 