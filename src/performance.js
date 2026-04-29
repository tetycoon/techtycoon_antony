/**
 * Performance optimizations for Tech Tycoon website
 * 
 * This file includes performance enhancements that can be imported
 * into the main App component to improve loading speed without
 * changing functionality.
 */

// Image loading optimization - applies to all images in the site
export const optimizeImages = () => {
  // Immediately optimize critical images
  const optimizeCriticalImages = () => {
    // Optimize visible images immediately
    const preOptimizeImages = () => {
      const images = document.querySelectorAll('img');
      const viewportHeight = window.innerHeight;
      
      images.forEach(img => {
        // Skip already optimized images
        if (img.dataset.optimized) return;
        
        // Add decoding async attribute to all images
        img.decoding = 'async';
        
        // Get the image's position relative to the viewport
        const rect = img.getBoundingClientRect();
        const isAboveTheFold = rect.top < viewportHeight;
        
        // Set priority loading for above-the-fold images
        if (isAboveTheFold) {
          img.loading = 'eager';
          img.fetchPriority = 'high';
        } else {
          img.loading = 'lazy';
          img.fetchPriority = 'low';
        }
        
        // Mark as optimized to avoid duplicate processing
        img.dataset.optimized = 'true';
      });
    };
    
    // Run optimization right away for critical images
    if (document.readyState !== 'loading') {
      preOptimizeImages();
    } else {
      // Or wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', preOptimizeImages);
    }
  };
  
  // Process all images once the page is fully loaded
  const optimizeAllImages = () => {
    const images = document.querySelectorAll('img:not([data-optimized="true"])');
    
    images.forEach(img => {
      // Skip already optimized images
      if (img.dataset.optimized) return;
      
      // Add decoding async attribute
      img.decoding = 'async';
      
      // Mark as optimized to avoid duplicate processing
      img.dataset.optimized = 'true';
      
      // Set all non-critical images to lazy load
      img.loading = 'lazy';
      
      // Dynamically set size attributes if missing
      if (!img.width && !img.height && img.naturalWidth && img.naturalHeight) {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
      }
    });
  };
  
  // Optimize images in carousel and sections (for home page)
  const optimizeHomePageSections = () => {
    // Check if we're on the home page
    if (window.location.pathname === '/' || window.location.pathname === '') {
      // Find carousel and section images
      setTimeout(() => {
        // Target specific home page sections
        const homeHeroSection = document.querySelector('.home-hero');
        const carouselSection = document.querySelector('.horizontal-scroll');
        
        if (homeHeroSection) {
          // Pre-render hero section to improve LCP
          homeHeroSection.style.contentVisibility = 'auto';
          homeHeroSection.style.containIntrinsicSize = '0 500px';
        }
        
        if (carouselSection) {
          // Defer carousel section loading
          carouselSection.style.contentVisibility = 'auto';
          
          // Find carousel images and optimize them
          const carouselImages = carouselSection.querySelectorAll('img');
          carouselImages.forEach((img, index) => {
            if (index > 3) {
              // Only load the first few images eagerly
              img.loading = 'lazy';
              img.fetchPriority = 'low';
            }
          });
        }
      }, 100);
    }
  };
  
  // Run optimizations
  optimizeCriticalImages();
  
  // Complete optimization after load
  window.addEventListener('load', () => {
    optimizeAllImages();
    optimizeHomePageSections();
  });
};

// Memory optimization for framer-motion animations
export const optimizeAnimations = () => {
  window.addEventListener('DOMContentLoaded', () => {
    // Track visible motion elements
    const visibleMotionElements = new Set();
    
    // Find all motion elements and delay those off-screen
    const optimizeMotionElements = () => {
      // Target framer-motion elements
      const motionElements = document.querySelectorAll('[class*="motion-"], [style*="transform"]');
      
      motionElements.forEach(el => {
        // Skip already optimized elements
        if (el.dataset.motionOptimized) return;
        
        // Mark as optimized
        el.dataset.motionOptimized = 'true';
        
        // Add to Intersection Observer to track visibility
        observer.observe(el);
      });
    };
    
    // Create Intersection Observer for lazy animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        
        if (entry.isIntersecting) {
          // Element is visible, enable animations
          visibleMotionElements.add(el);
          el.style.willChange = 'transform, opacity';
        } else {
          // Element is not visible, disable animations
          visibleMotionElements.delete(el);
          el.style.willChange = 'auto';
        }
      });
    }, {
      rootMargin: '100px',
      threshold: 0.01
    });
    
    // Throttle animation frames for off-screen elements
    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = function(callback) {
      // Only process visible elements at full frame rate
      return originalRAF.call(window, callback);
    };
    
    // Home page specific optimizations
    const optimizeHomePage = () => {
      if (window.location.pathname === '/' || window.location.pathname === '') {
        // Find hero section and optimize it
        const heroSection = document.querySelector('.home-hero');
        if (heroSection) {
          heroSection.style.willChange = 'transform, opacity';
          
          // After initial animation, remove will-change
          setTimeout(() => {
            heroSection.style.willChange = 'auto';
          }, 2000);
        }
        
        // Optimize specific heavy animations
        setTimeout(() => {
          // Find animated elements
          const animatedSections = document.querySelectorAll('[class*="animate-"], [class*="motion-"]');
          let visibleSectionCount = 0;
          
          animatedSections.forEach(section => {
            // Focus on currently visible sections
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
              visibleSectionCount++;
              
              // Prioritize first few visible sections
              if (visibleSectionCount <= 3) {
                section.style.willChange = 'transform, opacity';
              } else {
                // Deprioritize additional sections to prevent jank
                section.style.willChange = 'auto';
              }
            } else {
              section.style.willChange = 'auto';
            }
          });
        }, 500);
      }
    };
    
    // Memory optimization
    const garbageCollect = () => {
      if (window.gc) {
        try {
          window.gc();
        } catch (e) {
          // GC not available, ignore
        }
      }
    };
    
    // Throttle scroll and resize events
    let throttleTimer;
    const throttleEvent = (callback, time) => {
      if (throttleTimer) return;
      throttleTimer = true;
      setTimeout(() => {
        callback();
        throttleTimer = false;
      }, time);
    };
    
    // Handle scroll events with efficiency
    window.addEventListener('scroll', () => {
      throttleEvent(() => {
        optimizeMotionElements();
        garbageCollect();
      }, 200);
    }, { passive: true });
    
    // Run initial optimization
    setTimeout(() => {
      optimizeMotionElements();
      optimizeHomePage();
    }, 100);
    
    // Re-optimize on resize
    window.addEventListener('resize', () => {
      throttleEvent(() => {
        optimizeMotionElements();
        optimizeHomePage();
      }, 200);
    }, { passive: true });
  });
};

// Enable resource hints for faster loading
export const enableResourceHints = () => {
  // Preconnect to important domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://checkout.razorpay.com'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Optimize module loading for better performance
export const optimizeModuleLoading = () => {
  // Preload critical paths when idle
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Current path-based optimization
      const currentPath = window.location.pathname;
      
      // Home page specific optimizations
      if (currentPath === '/' || currentPath === '') {
        // Preload component resources
        const preloadLinks = [
          // Font files for better CLS
          { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' },
          
          // Preconnect to image sources
          { rel: 'preconnect', href: 'https://images.unsplash.com' },
          
          // Preload critical images if available
          { rel: 'preload', href: '/static/media/logo.png', as: 'image' },
        ];
        
        // Add preload links to document head
        preloadLinks.forEach(linkData => {
          const link = document.createElement('link');
          Object.keys(linkData).forEach(key => {
            link[key] = linkData[key];
          });
          document.head.appendChild(link);
        });
      }
    }, { timeout: 2000 });
  }
  
  // Optimize chunking and code splitting for faster loading
  const originalImport = window.import;
  if (originalImport && window.location.pathname === '/') {
    try {
      // Cache imported modules
      const moduleCache = new Map();
      
      // Override import to prioritize home page modules
      window.import = function(path) {
        // Check if we've cached this module
        if (moduleCache.has(path)) {
          return moduleCache.get(path);
        }
        
        // If it's a home page relevant module, prioritize it
        const isHomeModule = path.includes('Home') || path.includes('horizontal') || 
                           path.includes('carousel') || path.includes('hero');
        
        // Execute the import
        const importPromise = originalImport.call(this, path);
        
        // Cache the result
        moduleCache.set(path, importPromise);
        
        return importPromise;
      };
    } catch (e) {
      // Revert if there's an error
      window.import = originalImport;
    }
  }
  
  // Add React component caching for repeat renders
  if (window.React) {
    // Try to capture React createElement to add caching
    try {
      const originalCreateElement = window.React.createElement;
      const elementCache = new Map();
      
      // Only in production mode to avoid development issues
      if (process.env.NODE_ENV === 'production') {
        window.React.createElement = function(type, props, ...children) {
          // Only cache simple components that don't change often
          if (typeof type === 'string' && props && !props.onChange && !props.onClick) {
            const key = `${type}-${JSON.stringify(props || {})}-${children.length}`;
            
            if (elementCache.has(key)) {
              return elementCache.get(key);
            }
            
            const element = originalCreateElement.call(this, type, props, ...children);
            elementCache.set(key, element);
            return element;
          }
          
          return originalCreateElement.call(this, type, props, ...children);
        };
      }
    } catch (e) {
      // Revert if there's an error
      console.log('React optimization failed, using default behavior');
    }
  }
};

// Main function to apply all optimizations
export const applyPerformanceOptimizations = () => {
  optimizeImages();
  optimizeAnimations();
  enableResourceHints();
  optimizeModuleLoading();

  // Add additional web vitals optimizations
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Optimize paint and composition
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          will-change: auto !important;
        }
        .motion-safe {
          will-change: transform;
        }
        img, video {
          content-visibility: auto;
        }
      `;
      document.head.appendChild(style);
    });
  }
};

export default applyPerformanceOptimizations; 