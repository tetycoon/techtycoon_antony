import React, { useRef, useEffect, useState, memo, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue, Variants, TargetAndTransition, ValueKeyframesDefinition, AnimationControls } from 'framer-motion';
import Hero from '../components/Hero';
import CourseHighlights from '../components/CourseHighlights';
import Testimonials from '../components/Testimonials';
// import Faq from '../components/Faq';
import Footer from '../components/Footer';
import AntonyImage from '../assets/Antony.png';
import HorizontalScroll from '../components/HorizontalScroll';
import StatsCounter from '../components/StatsCounter';
import BentoGrid from '../components/BentoGrid';
import InfiniteMarquee from '../components/InfiniteMarquee';
import MagneticButton from '../components/MagneticButton';

// Add type declaration for window.hideLoading
declare global {
  interface Window {
    hideLoading?: () => void;
  }
}

// Define the type for GeometricShapeProps
interface GeometricShapeProps {
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  initial?: any;
  animate?: any;
  transition?: any;
  [key: string]: any;
}

// Function to check if device is mobile
const checkIsMobile = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
};

// Modern geometric blue shapes with enhanced 3D effect
const GeometricShape: React.FC<GeometricShapeProps> = memo(({
  className,
  style,
  variants,
  initial,
  animate,
  transition,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={variants}
      initial={initial}
      animate={isVisible ? animate : initial}
      transition={transition}
      {...props}
    />
  );
});

GeometricShape.displayName = 'GeometricShape';

// Optimized ParticleField component with enhanced performance checks
const ParticleField = memo(() => {
  // Use useRef instead of useState for visible flag to avoid re-renders
  const visibleRef = useRef(true);
  const particleRef = useRef<HTMLDivElement>(null);
  const shouldRenderParticles = useRef(true);
  const particlesRef = useRef<Array<{ x: number; y: number; size: number; speed: number; opacity: number }>>([]);

  // Using useMemo to avoid recreating this function on every render
  const isLowEndDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;

    // Simple performance check based on device memory and processor count
    // @ts-ignore - DeviceMemory API may not be recognized by TypeScript
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const lowProcessor = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    // Check if device is mobile or has limited CPU
    const isLowPowerDevice = checkIsMobile() || window.navigator.hardwareConcurrency <= 4;

    return lowMemory || lowProcessor || isLowPowerDevice;
  }, []);

  // Generate particles only once on mount with useMemo
  useMemo(() => {
    // Don't render particles on low-end devices
    if (isLowEndDevice) {
      visibleRef.current = false;
      shouldRenderParticles.current = false;
      return;
    }

    // Generate fewer particles on mobile - moved inside useMemo to compute only once
    const particleCount = (typeof window !== 'undefined' && window.innerWidth < 768) ? 15 : 30;

    // Pre-allocate array capacity
    const newParticles = new Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      newParticles[i] = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.2
      };
    }
    particlesRef.current = newParticles;
  }, [isLowEndDevice]);

  // Use React.useMemo for the particle elements to prevent recreation on each render
  // IMPORTANT: Move this before the conditional return to follow React Hook rules
  const particleElements = useMemo(() => {
    if (!visibleRef.current || !shouldRenderParticles.current) return null;

    return particlesRef.current.map((particle, index) => (
      <motion.div
        key={index}
        className="absolute rounded-full bg-primary/30 dark:bg-primary/20"
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
        }}
        animate={{
          y: ["0%", `${particle.speed * 100}%`],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
    ))
  }, []);

  // Early return if we shouldn't render
  if (!visibleRef.current || !shouldRenderParticles.current) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" ref={particleRef}>
      {particleElements}
    </div>
  );
});

// TechBadge component for the marquee
const TechBadge: React.FC<{ name: string; icon: string }> = ({ name, icon }) => (
  <motion.div
    whileHover={{ scale: 1.1, y: -5 }}
    className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-blue-100 dark:border-blue-900/50 flex items-center gap-3 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
  >
    <span className="text-2xl">{icon}</span>
    <span className="font-medium text-gray-900 dark:text-white">{name}</span>
  </motion.div>
);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  // Enhanced scroll tracking with performance optimizations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Handle responsive adjustments with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Add a CSS style tag for smooth transition effects
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      :root {
        --mouse-x: 0px;
        --mouse-y: 0px;
        --scroll-y: 0px;
        --parallax-speed: 0.05;
      }
      
      .smooth-scroll-visual {
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform;
        backface-visibility: hidden;
      }
      
      .bubble {
        transition: transform 0.6s ease-out;
        will-change: transform;
        filter: blur(30px);
        opacity: 0.8;
      }
      
      .overlay-effect {
        transition: opacity 0.6s ease-out;
        will-change: opacity;
      }
    `;
    document.head.appendChild(styleTag);

    // Hide loading indicator once home page is mounted
    if (typeof window !== 'undefined' && window.hideLoading) {
      window.hideLoading();
    }

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Simplified scroll handler
  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      frameId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);

        // Show scroll indicator when user has scrolled a bit
        setScrollIndicatorVisible(currentScrollY > 100);

        // Calculate scroll progress for indicators
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(currentScrollY / scrollHeight, 1);
        setProgressWidth(progress * 100);
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  // Simplified mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Enhanced blue gradient background colors for light mode
  const lightBackgroundColors = [
    'rgba(239, 246, 255, 0.97)',   // Blue-50 (lightest)
    'rgba(219, 234, 254, 0.97)',   // Blue-100
    'rgba(191, 219, 254, 0.95)',   // Blue-200
    'rgba(147, 197, 253, 0.93)',   // Blue-300
    'rgba(96, 165, 250, 0.92)',    // Blue-400
    'rgba(59, 130, 246, 0.9)'      // Blue-500 (darkest in light mode)
  ];

  // Enhanced blue dark mode atmosphere
  const darkBackgroundColors = [
    'rgba(7, 19, 43, 0.97)',       // Deep blue-950
    'rgba(12, 24, 55, 0.97)',      // Blue-900
    'rgba(23, 37, 84, 0.95)',      // Blue-800
    'rgba(30, 58, 138, 0.93)',     // Blue-700 
    'rgba(37, 99, 235, 0.92)',     // Blue-600
    'rgba(59, 130, 246, 0.9)'      // Blue-500
  ];

  // Simplified parallax values for stable animations
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxY4 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  // Group the parallax values in an array for easier access
  const parallaxLayers = [
    parallaxY1,
    parallaxY2,
    parallaxY3,
    parallaxY4
  ];

  // Enhanced floating animation with more natural physics and smooth transitions
  const floatingAnimation: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }
    }),
    float: (i: number) => ({
      y: [0, -10, 0] as any,
      x: [0, i % 2 === 0 ? 5 : -5, 0] as any,
      rotate: [0, i % 2 === 0 ? 3 : -3, 0] as any,
      scale: [1, 1.05, 1] as any,
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    })
  };

  // Refined content reveal animation
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.9,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  // Refined page transition
  const pageTransition = {
    duration: 1.4,
    ease: [0.22, 1, 0.36, 1],
    staggerChildren: 0.3
  };

  const ParallaxLayer = ({ depth, children, className = '' }: { depth: number, children: React.ReactNode, className?: string }) => {
    // Use CSS variables for transform to enable hardware acceleration
    const style = {
      transform: `translateY(calc(var(--scroll-y) * ${depth} * -1px))`,
      willChange: 'transform',
    };

    return (
      <div className={`parallax-layer ${className}`} style={style}>
        {children}
      </div>
    );
  };

  return (
    <motion.main
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="home-hero">
        {/* Particles background */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(80px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobile ? 0 : 0.3 }}
          transition={{ duration: 0.8 }}
        ></motion.div>
      </div>

      {/* Dark mode version */}
      <motion.div
        className="fixed inset-0 dark:bg-blue-950 z-0 dark:block hidden pointer-events-none"
        style={{
          opacity: useTransform(
            scrollYProgress,
            [0, 0.2, 0.4, 0.6, 0.8, 1],
            [0.92, 0.94, 0.96, 0.98, 0.99, 1]
          )
        }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 via-blue-200/60 to-blue-300/40 dark:from-blue-900/50 dark:via-blue-950/40 dark:to-blue-950/80"></div>

        {/* Floating bubbles */}
        <motion.div
          className="bubble bg-gradient-to-br from-blue-200/40 to-blue-300/20 dark:from-blue-500/20 dark:to-blue-600/10 absolute"
          style={{
            top: '3%',
            right: '15%',
            width: '35vw',
            height: '35vw',
            maxWidth: '700px',
            maxHeight: '700px',
            borderRadius: '50%',
            y: parallaxLayers[0]
          }}
        />

        <motion.div
          className="bubble bg-gradient-to-tr from-blue-300/40 to-blue-400/20 dark:from-blue-600/20 dark:to-blue-700/10 absolute"
          style={{
            bottom: '10%',
            left: '5%',
            width: '30vw',
            height: '30vw',
            maxWidth: '600px',
            maxHeight: '600px',
            borderRadius: '50%',
            y: parallaxLayers[1]
          }}
        />

        <motion.div
          className="bubble bg-gradient-to-tl from-blue-400/30 to-blue-500/20 dark:from-blue-700/20 dark:to-blue-800/10 absolute"
          style={{
            top: '45%',
            right: '22%',
            width: '25vw',
            height: '25vw',
            maxWidth: '500px',
            maxHeight: '500px',
            borderRadius: '50%',
            y: parallaxLayers[2]
          }}
        />

        <motion.div
          className="bubble bg-gradient-to-bl from-blue-500/30 to-blue-600/20 dark:from-blue-800/20 dark:to-blue-900/10 absolute"
          style={{
            bottom: '25%',
            right: '12%',
            width: '20vw',
            height: '20vw',
            maxWidth: '400px',
            maxHeight: '400px',
            borderRadius: '50%',
            y: parallaxLayers[3]
          }}
        />

        {/* Subtle patterns */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] overlay-effect"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzQjgyRjYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTYwIDBIMHY2MEg2MFYwWiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAwdjYwIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLW9wYWNpdHk9IjAuMDYiIHN0cm9rZS1kYXNoYXJyYXk9IjYiLz48cGF0aCBkPSJNMCAzMGg2MCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1vcGFjaXR5PSIwLjA2IiBzdHJva2UtZGFzaGFycmF5PSI2Ii8+PC9nPjwvZz48L3N2Zz4=')] overlay-effect"></div>

        {/* Particle system */}
        <ParticleField />
      </div>

      {/* Cursor effects - simplified */}
      <motion.div
        className="fixed pointer-events-none inset-0 z-30 opacity-0 md:opacity-30 transition-opacity duration-500"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 40%)",
          filter: "blur(10px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobile ? 0 : 0.3 }}
        transition={{ duration: 0.8 }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Hero Section */}
        <Hero />

        {/* Add Horizontal Scroll Component here */}
        <HorizontalScroll />
        {/* Founder Section - Antony Praveen */}
        <section className="relative py-20 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <GeometricShape
                className="w-96 h-96 -top-20 -left-20 opacity-50 dark:opacity-30"
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.6, 0.5],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <GeometricShape
                className="w-80 h-80 bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 opacity-60 dark:opacity-30"
                animate={{
                  rotate: [0, -10, 0],
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 0.7, 0.6],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Founder Image Section */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative w-full h-full max-w-md mx-auto lg:mx-0">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-blue-500/10 rounded-2xl transform rotate-3"></div>
                  <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/20 rounded-2xl transform -rotate-3"></div>
                  <div className="relative overflow-hidden rounded-2xl border border-blue-100 shadow-xl shadow-blue-500/10 dark:border-blue-500/20">
                    <motion.img
                      src={AntonyImage}
                      alt="Antony Praveen"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/600x800/3B82F6/FFFFFF?text=Antony+Praveen";
                      }}
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-full mb-2">
                          Founder & CEO
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-1">Antony Praveen</h3>
                        <p className="text-blue-100">Rockbridge Digital Solutions</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Founder Bio Section */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-sm font-medium mb-4">
                    About The Founder
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Meet Our Visionary Leader <br></br>Mr. Antony Praveen
                  </h2>
                  <div className="w-20 h-0 bg-primary rounded-full"></div>
                </motion.div>

                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="leading-relaxed"
                  >
                    As the founder of Rockbridge Digital Solutions, I am passionate about empowering
                    businesses and individuals to unlock their potential in the digital world. With over 4 years of
                    experience in digital marketing, content creation, and training, my journey has been
                    shaped by a commitment to excellence and innovation.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="leading-relaxed"
                  >
                    I hold a Master's Degree in Philosophy and have specialized in communication,
                    technology, Digital Media and AI, which gives me a unique perspective on blending
                    creative strategies with cutting-edge digital tools. My mission is to help businesses thrive
                    online and equip learners with practical skills in digital marketing and artificial
                    intelligence.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="leading-relaxed"
                  >
                    At Rockbridge, we pride ourselves on delivering result-driven marketing
                    strategies and industry-relevant training programs that make a tangible impact. I'm
                    deeply committed to helping my clients grow smarter, and my learners grow stronger in the
                    ever-evolving digital landscape.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="leading-relaxed"
                  >
                    Whether you're a startup looking to boost your digital presence or an individual eager
                    to learn new skills, I'm here to guide you on your path to success.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="pt-6"
                  >
                    <motion.a
                      href="/about"
                      className="inline-flex items-center gap-2 text-primary dark:text-blue-300 font-medium hover:text-secondary dark:hover:text-blue-200 transition-colors duration-300 group"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn more about our vision
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Course highlights with premium animations */}
        <CourseHighlights />

        {/* Premium testimonials section */}
        <Testimonials />

        {/* FAQ section with premium accordions */}


        {/* Footer */}
        <Footer />
      </motion.div>

    </motion.main>
  );
};

export default Home; 