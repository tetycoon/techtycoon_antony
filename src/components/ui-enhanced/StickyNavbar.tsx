import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface StickyNavbarProps {
  items: NavItem[];
  className?: string;
  activeClass?: string;
  scrollOffset?: number;
  mobileBreakpoint?: number;
  onChange?: (item: NavItem) => void;
}

/**
 * StickyNavbar - A responsive, sticky navigation bar with scroll tracking
 * 
 * Features:
 * - Sticks to top when scrolling down
 * - Collapses to a mobile-friendly version on small screens
 * - Tracks scroll position to highlight the active section
 * - Smooth scroll to sections when links are clicked
 * - Fully keyboard accessible
 */
const StickyNavbar: React.FC<StickyNavbarProps> = ({
  items,
  className = '',
  activeClass = 'text-blue-600 dark:text-blue-400 font-medium',
  scrollOffset = 100,
  mobileBreakpoint = 768,
  onChange,
}) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [mobileBreakpoint]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      const scrolled = window.scrollY > 20;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
      
      // Find active section
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean);
      
      // Find the section currently in view
      let currentSection = '';
      sections.forEach((section) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        if (rect.top <= scrollOffset && rect.bottom > scrollOffset) {
          currentSection = section.id;
        }
      });
      
      if (currentSection !== activeId) {
        setActiveId(currentSection);
        const activeItem = items.find(item => item.id === currentSection);
        if (activeItem && onChange) {
          onChange(activeItem);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items, activeId, isScrolled, scrollOffset, onChange]);

  // Handle clicking on a nav item
  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    const section = document.getElementById(item.id);
    if (!section) return;
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    
    // Scroll to section
    section.scrollIntoView({ behavior: 'smooth' });
    
    // Update active section
    setActiveId(item.id);
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <nav 
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled ? 'py-2 shadow-md' : 'py-4',
        className
      )}
      aria-label="Page navigation"
    >
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className={cn(
          'hidden md:flex justify-center items-center space-x-8',
          isScrolled ? 'h-12' : 'h-14',
          'transition-all duration-300'
        )}>
          {items.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'px-3 py-2 rounded-md transition-colors',
                'relative hover:text-blue-600 dark:hover:text-blue-400',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                item.id === activeId ? activeClass : 'text-gray-700 dark:text-gray-300'
              )}
              onClick={(e) => handleNavItemClick(e, item)}
              aria-current={item.id === activeId ? 'page' : undefined}
            >
              {item.label}
              {item.id === activeId && (
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500 dark:bg-blue-400"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
            </a>
          ))}
        </div>
        
        {/* Mobile Navigation Button */}
        <div className="flex md:hidden justify-end items-center">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className={cn(
              'p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
              'text-gray-700 dark:text-gray-200',
              isMobileMenuOpen ? 'bg-gray-100 dark:bg-gray-800' : ''
            )}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <div className="w-6 h-6 relative">
              <span className={cn(
                'absolute h-0.5 w-6 bg-current transform transition-all duration-300',
                isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1.5'
              )} />
              <span className={cn(
                'absolute h-0.5 w-6 bg-current transform transition-all duration-300',
                isMobileMenuOpen ? 'opacity-0' : 'top-3'
              )} />
              <span className={cn(
                'absolute h-0.5 w-6 bg-current transform transition-all duration-300',
                isMobileMenuOpen ? '-rotate-45 top-3' : 'top-4.5'
              )} />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {items.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                    item.id === activeId
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                  onClick={(e) => handleNavItemClick(e, item)}
                  aria-current={item.id === activeId ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default StickyNavbar; 