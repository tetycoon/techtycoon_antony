import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 w-11 h-11 rounded-full flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md border border-gray-200/80 dark:border-gray-700/80 overflow-hidden transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {/* Sun */}
      <motion.div
        className="absolute"
        animate={{
          scale: isDark ? 0.5 : 1,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? -30 : 0,
          y: isDark ? -20 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-amber-500"
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
            clipRule="evenodd" 
          />
        </svg>
      </motion.div>
      
      {/* Moon */}
      <motion.div
        className="absolute"
        animate={{
          scale: isDark ? 1 : 0.5,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 30,
          y: isDark ? 0 : 20,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-indigo-300"
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </motion.div>
      
      {/* Stars */}
      {isDark && (
        <>
          <motion.div
            className="absolute top-2 right-2 w-1 h-1 bg-indigo-200 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-3 left-2.5 w-0.5 h-0.5 bg-indigo-200 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-3 left-3 w-0.5 h-0.5 bg-indigo-200 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
          />
        </>
      )}
      
      {/* Sun rays */}
      {!isDark && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/20 to-amber-100/5 blur-md" />
          </motion.div>
        </>
      )}
    </motion.button>
  );
};

export default ThemeToggle; 