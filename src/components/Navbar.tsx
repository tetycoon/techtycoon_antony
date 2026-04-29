import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { ThemeToggle } from './ui/ThemeToggle';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animateNavbar, setAnimateNavbar] = useState(false);
  const location = useLocation();
  const { resolvedTheme } = useTheme();

  // Initialize animation after component mounts
  useEffect(() => {
    setAnimateNavbar(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-1.5' : 'py-2.5'
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={animateNavbar ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Enhanced glassmorphism background with gradient border */}
      <div
        className={`absolute inset-0 backdrop-blur-xl ${resolvedTheme === 'dark'
          ? 'bg-gray-900/80 border-gray-800/50'
          : 'bg-white/80 border-gray-200/50'
          } ${scrolled ? 'shadow-lg' : ''} transition-all duration-300 border-b`}
      >
        {/* Enhanced gradient overlay with animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14 relative z-10">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="relative"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Enhanced glow effect behind logo with pulse animation */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full blur-md opacity-70 dark:opacity-90 group-hover:opacity-100 transition-opacity"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
            <div className="relative bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg">
              <img
                src={logo}
                alt="Rockbridge Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
          </motion.div>
          <div className="flex flex-col">
            <motion.span
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 leading-tight pr-3"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Rockbridge
            </motion.span>
            <motion.span
              className="hidden sm:inline-block text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight pr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              Digital Solutions
            </motion.span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          <NavItem to="/" label="Home" isActive={isActive('/')} />
          <NavItem to="/services" label="Services" isActive={isActive('/services')} />
          <NavItem to="/courses" label="Courses" isActive={isActive('/courses')} />
          <NavItem to="/newsletter" label="Workshop" isActive={isActive('/newsletter')} />
          <NavItem to="/about" label="About" isActive={isActive('/about')} />

          {/* Enhanced theme toggle with animation wrapper */}
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <ThemeToggle />
          </motion.li>

          <motion.li
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <a
              href="https://drive.google.com/file/d/1bEgOy1ia2OQ93uEQ5zqfhGFECWcIKMN4/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <span className="relative px-6 py-2 bg-blue-500/10 dark:bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 dark:border-blue-400/30 text-blue-700 dark:text-blue-100 font-medium rounded-xl inline-flex items-center shadow-lg transition-all duration-300 text-sm group-hover:bg-blue-500/20 dark:group-hover:bg-blue-600/30">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/10 via-transparent to-transparent opacity-50"></span>
                <span className="relative flex items-center gap-2">
                  Profile
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'loop',
                      repeatDelay: 2,
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </span>
              </span>
            </a>
          </motion.li>
        </ul>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-3 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="relative z-10"
          >
            <ThemeToggle />
          </motion.div>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center relative z-10"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200/80 dark:border-gray-700/80">
              <div className="flex flex-col justify-between items-center h-3.5 w-5">
                <motion.div
                  className="w-full h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full origin-center"
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 6 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full"
                  animate={{
                    opacity: isOpen ? 0 : 1,
                    x: isOpen ? 10 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full origin-center"
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -6 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-b border-gray-200/50 dark:border-gray-800/50 overflow-hidden shadow-xl absolute w-full top-full left-0"
          >
            <div className="px-5 py-6 space-y-1">
              <ul className="flex flex-col space-y-3 py-2">
                <MobileNavItem
                  to="/"
                  label="Home"
                  isActive={isActive('/')}
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavItem
                  to="/services"
                  label="Services"
                  isActive={isActive('/services')}
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavItem
                  to="/courses"
                  label="Courses"
                  isActive={isActive('/courses')}
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavItem
                  to="/newsletter"
                  label="Workshop"
                  isActive={isActive('/newsletter')}
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavItem
                  to="/about"
                  label="About"
                  isActive={isActive('/about')}
                  onClick={() => setIsOpen(false)}
                />
                <motion.li
                  className="pt-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <a
                    href="https://drive.google.com/file/d/1ENCZa2-7Ig40ppsCtMX-vjZI066E09tv/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <span className="relative block w-full p-3 bg-blue-500/10 dark:bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 dark:border-blue-400/30 text-blue-700 dark:text-blue-100 font-medium rounded-xl text-center shadow-lg transition-all duration-300 group-hover:bg-blue-500/20 dark:group-hover:bg-blue-600/30">
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/10 via-transparent to-transparent opacity-50"></span>
                      <span className="relative flex items-center justify-center gap-2">
                        <span>Profile</span>
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'loop',
                            repeatDelay: 2,
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </span>
                    </span>
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Desktop navigation item component with enhanced animation
const NavItem: React.FC<{ to: string; label: string; isActive: boolean }> = ({
  to,
  label,
  isActive
}) => (
  <motion.li
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.1 * ["Home", "Services", "Courses", "About"].indexOf(label) + 0.1,
      duration: 0.3
    }}
  >
    <Link
      to={to}
      className={`relative px-1 py-1.5 font-medium text-sm transition-colors duration-300 group ${isActive
        ? 'text-primary-500 dark:text-primary-400'
        : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
        }`}
    >
      <span className="relative z-10 pr-1">{label}</span>
      {isActive && (
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          layoutId="navbar-active-indicator"
          transition={{ type: 'spring', stiffness: 350, damping: 35 }}
        />
      )}
    </Link>
  </motion.li>
);

// Mobile navigation item component with enhanced animation
const MobileNavItem: React.FC<{
  to: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({
  to,
  label,
  isActive,
  onClick
}) => (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Link
        to={to}
        onClick={onClick}
        className={`block relative w-full py-3 px-4 rounded-lg ${isActive
          ? 'text-white bg-gradient-to-r from-primary-500/90 to-secondary-500/90'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
          } transition-all duration-200`}
      >
        <span className="text-base font-medium pr-2">{label}</span>

        {isActive && (
          <motion.span
            layoutId="mobile-nav-indicator"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/90 to-secondary-500/90 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    </motion.li>
  );

export default Navbar; 