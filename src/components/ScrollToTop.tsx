import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top when route changes
 * This is a utility component that should be placed near the root of your app
 */
const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  // Use both pathname and key to ensure this fires on all navigation events
  useEffect(() => {
    // If there's a hash, scroll to the element with that ID
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }, 0);
    } 
    // Otherwise scroll to top of page - use instant scrolling for more reliable behavior
    else {
      // Force immediate scroll to top with no animation
      window.scrollTo(0, 0);
      
      // Additional backup method
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0; // For Safari
    }
  }, [pathname, hash, key]); // Include key to ensure this runs on all navigation events

  return null;
};

export default ScrollToTop; 