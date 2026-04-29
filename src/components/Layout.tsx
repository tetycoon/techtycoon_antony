import React, { ReactNode, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  includeFooter?: boolean;
  className?: string;
}

/**
 * Main application layout component
 * Provides consistent page structure with Navbar and optional Footer
 */
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  includeFooter = true,
  className = ''
}) => {
  const [showFab, setShowFab] = useState(false);
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  
  // Show FAB when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFab(scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle FAB menu
  const toggleFabMenu = () => {
    setFabMenuOpen(!fabMenuOpen);
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      <Navbar />
      
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      {includeFooter && <Footer />}
      
      {/* Mobile Floating Action Button (FAB) */}
      <AnimatePresence>
        {showFab && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-5 bottom-5 z-50 md:hidden"
          >
            {/* FAB Menu */}
            <AnimatePresence>
              {fabMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 bottom-16 flex flex-col items-end space-y-2 pb-2"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="flex items-center"
                  >
                    <span className="mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg">
                      Home
                    </span>
                    <Link to="/" className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                    className="flex items-center"
                  >
                    <span className="mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg">
                      Services
                    </span>
                    <Link to="/services" className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm.293 9.707a1 1 0 001.414 0L10 13.414l2.293 2.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 000 1.414z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                    className="flex items-center"
                  >
                    <span className="mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg">
                      Courses
                    </span>
                    <Link to="/courses" className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </Link>
                  </motion.div>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                    onClick={scrollToTop}
                    className="flex items-center"
                  >
                    <span className="mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg">
                      Top
                    </span>
                    <div className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Main FAB Button */}
            <motion.button
              onClick={toggleFabMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-xl ring-2 ring-white/20 dark:ring-gray-800/30 relative"
            >
              <motion.div
                animate={{ rotate: fabMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout; 