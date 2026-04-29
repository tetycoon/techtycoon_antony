import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const phoneNumber = '7558133039'; // Replace with your WhatsApp number

  // Show button after a short delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    // Show message bubble after button appears
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 2500);
    
    // Hide message after some time
    const hideMessageTimer = setTimeout(() => {
      setShowMessage(false);
    }, 9000);
    
    // Re-show message periodically
    const messageInterval = setInterval(() => {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 6000);
    }, 30000);

    // Always keep pulsing animation
    setIsPulsing(true);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(messageTimer);
      clearTimeout(hideMessageTimer);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Continuous pulse animation */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-green-500 -z-10"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            />
            
            {/* Dynamic floating animation for the main button */}
            <motion.a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
              animate={{ 
                y: [0, -5, 0],
                boxShadow: [
                  '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  '0px 8px 16px rgba(0, 0, 0, 0.3)',
                  '0px 4px 8px rgba(0, 0, 0, 0.2)'
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 512" 
                className="w-8 h-8 text-white fill-current"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "easeInOut",
                  repeatDelay: 3
                }}
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </motion.svg>
            </motion.a>
            
            {/* Text bubble with dynamic effects */}
            <AnimatePresence>
              {showMessage && (
                <motion.div 
                  className="absolute top-0 right-full mr-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-sm font-medium text-gray-800 dark:text-white whitespace-nowrap"
                    animate={{ color: ['#1f2937', '#3b82f6', '#1f2937'] }}
                    transition={{ duration: 3, repeat: 2 }}
                  >
                    Need help? Chat with us!
                  </motion.div>
                  <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton; 