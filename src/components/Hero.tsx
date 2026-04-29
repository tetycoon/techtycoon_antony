import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

// Import fallback images
import digitalMarketingImg from '../assets/digital-marketing-placeholder.jpg';
import executiveTrainingImg from '../assets/executive-training-placeholder.jpg';
import strategicConsultingImg from '../assets/strategic-consulting-placeholder.jpg';

// Blue text effect with enhanced animation
const GradientText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`relative text-blue-600 animate-pulse-slow ${className}`}>
    {children}
    <span className="absolute inset-0 text-blue-500 blur-sm opacity-50 animate-pulse">
      {children}
    </span>
  </span>
);

// Premium animated button with enhanced hover effects
const AnimatedButton: React.FC<{
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  to?: string;
  className?: string;
}> = ({ children, primary = false, onClick, to, className = '' }) => {

  if (to) {
    return (
      <Link to={to}>
        <motion.button
          className={`relative group overflow-hidden rounded-xl border btn-hover-effect transition-all duration-300 ${primary
            ? 'bg-blue-600 text-white border-transparent shadow-blue-glow hover:bg-blue-700'
            : 'bg-blue-100/30 backdrop-blur-sm border-blue-400/30 text-blue-800 hover:border-blue-500/50 dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-700/50'
            } ${className}`}
          whileHover={{ scale: 1.05, boxShadow: primary ? '0 10px 25px rgba(37, 99, 235, 0.35)' : '0 8px 20px rgba(37, 99, 235, 0.15)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-0 w-full h-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10 px-8 py-3 inline-flex items-center justify-center font-medium">
            {children}
            <motion.span
              className="ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`relative group overflow-hidden rounded-xl border btn-hover-effect transition-all duration-300 ${primary
        ? 'bg-blue-600 text-white border-transparent shadow-blue-glow hover:bg-blue-700'
        : 'bg-blue-100/30 backdrop-blur-sm border-blue-400/30 text-blue-800 hover:border-blue-500/50 dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-700/50'
        } ${className}`}
      whileHover={{ scale: 1.05, boxShadow: primary ? '0 10px 25px rgba(37, 99, 235, 0.35)' : '0 8px 20px rgba(37, 99, 235, 0.15)' }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="absolute inset-0 w-full h-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <span className="relative z-10 px-8 py-3 inline-flex items-center justify-center font-medium">
        {children}
        <motion.span
          className="ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
};

// Service card component with enhanced parallax and 3D effects
const ServiceCard: React.FC<{
  service: {
    title: string;
    description: string;
    icon: React.ReactNode;
    image: string;
    fallbackImage?: string;
    link?: string;
  };
  scrollYProgress: MotionValue<number>;
  index: number;
  isHovered: boolean;
  onHover: (index: number, isHovered: boolean) => void;
}> = ({ service, scrollYProgress, index, isHovered, onHover }) => {
  const [imageError, setImageError] = useState(false);

  // Advanced parallax animation for each card
  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 30 + (index * 15)] // Each card moves at slightly different rate
  );

  // Enhanced shadow and transform effects - smoother animations
  const cardVariants = {
    hover: {
      y: -8,
      rotateY: 5,
      rotateX: 2,
      scale: 1.05,
      height: 220,
      transition: {
        duration: 0.3,
        ease: [0.2, 0.65, 0.3, 0.9], // Smoother curve
        height: { duration: 0.3 }
      }
    },
    rest: {
      y: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 0.95,
      height: 140,
      transition: {
        duration: 0.3,
        ease: [0.3, 0.45, 0.5, 0.95],
        delay: isHovered ? 0 : 0.1,
        height: { duration: 0.25, delay: isHovered ? 0 : 0.05 }
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Generate backup image URL using a placeholder service if needed
  const getImageUrl = () => {
    if (imageError) {
      if (service.fallbackImage) {
        return service.fallbackImage;
      } else {
        // Use a placeholder image with the service title
        return `https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=${service.title.replace(/\s+/g, '+')}`;
      }
    }
    return service.image;
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl shadow-lg shadow-blue-900/20 transform-gpu perspective-1000 cursor-pointer"
      style={{
        y: cardY,
        transformStyle: "preserve-3d",
        zIndex: isHovered ? 20 : index
      }}
      variants={cardVariants}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      onHoverStart={() => onHover(index, true)}
      onHoverEnd={() => onHover(index, false)}
      layout="position"
      layoutDependency={isHovered}
    >
      {/* Card border glow effect */}
      <motion.div
        className="absolute -inset-px rounded-xl bg-blue-600/40 animate-pulse-slow"
        animate={{
          opacity: isHovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Overlay and image */}
      <div className="relative h-full overflow-hidden rounded-xl">
        {/* Premium blue overlay with animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/80 z-10"
          animate={{
            opacity: isHovered ? 0.85 : 0.92,
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.img
          src={getImageUrl()}
          alt={service.title}
          onError={handleImageError}
          className="object-cover w-full h-full"
          animate={{
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? "brightness(1.2)" : "brightness(0.9)"
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content with enhanced layout */}
        <div className="absolute inset-0 z-20 p-4 md:p-5 flex flex-col">
          <div className="flex items-center space-x-3 mb-2">
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/30 backdrop-blur-sm shadow-inner shadow-blue-400/10"
              animate={{
                scale: isHovered ? 1.05 : 1,
                backgroundColor: isHovered ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-white">{service.icon}</div>
            </motion.div>
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
          </div>

          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.6,
              height: isHovered ? 'auto' : '0px',
              marginBottom: isHovered ? '1rem' : '0'
            }}
            transition={{
              duration: 0.3,
              opacity: { duration: 0.25 }
            }}
            className="overflow-hidden"
          >
            <p className="text-white/90 text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.div>

          <motion.div
            className="mt-auto"
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{
              duration: 0.3,
              delay: isHovered ? 0.05 : 0,
              y: { type: "spring", stiffness: 500, damping: 25 }
            }}
          >
            <Link to={service.link || "#"}>
              <motion.button
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-white text-sm rounded-lg backdrop-blur-sm flex items-center gap-2 transition-colors border border-blue-400/20"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Hero component
const Hero: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll tracking with improved performance
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Handle card hover events
  const handleCardHover = (index: number, isHovered: boolean) => {
    setHoveredCardIndex(isHovered ? index : null);
  };

  // Service data for cards
  const services = [
    {
      title: "Digital Marketing",
      description: "Elevate your brand with our comprehensive digital marketing solutions. From SEO and content strategy to PPC campaigns and social media management.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      fallbackImage: digitalMarketingImg,
      link: "/services"
    },
    {
      title: "Executive Training",
      description: "Empower your leadership with cutting-edge skills. Our executive training programs blend theoretical knowledge with practical applications in digital transformation.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGV4ZWN1dGl2ZSUyMHRyYWluaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      fallbackImage: executiveTrainingImg,
      link: "/newsletter"
    },
    {
      title: "Strategic Consulting",
      description: "Accelerate your business growth with our expert consulting services. We provide data-driven insights and strategic recommendations tailored to your goals.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHN0cmF0ZWdpYyUyMGNvbnN1bHRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      fallbackImage: strategicConsultingImg,
      link: "/about"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950" ref={heroRef}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated gradient blob */}
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] bg-blue-400/20 rounded-full blur-[120px] animate-pulse-slow"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        ></div>

        {/* Animated stars/particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-blue-200 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{
                opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
              }}
            />
          ))}
        </div>
      </div>

      {/* Main hero content */}
      <div className="container-custom relative z-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8">
                <div className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-sm text-white/90 animate-shimmer">
                  A visionary enterprise for the digital age
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  <GradientText className="block mb-2">AI-Powered</GradientText>
                  <GradientText className="block mb-2">Digital Solutions</GradientText>
                  <span className="text-blue-100 block text-4xl md:text-5xl">For Business Growth</span>
                </h1>
                <p className="text-xl text-blue-200 max-w-xl leading-relaxed">
                  A visionary enterprise dedicated to revolutionizing how businesses thrive through <span className="text-white font-bold">marketing</span> and professionals excel through <span className="text-white font-bold">training</span> in an increasingly digital landscape.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <AnimatedButton primary to="/courses">
                  Start Your Journey
                </AnimatedButton>
                <AnimatedButton primary to="/services">
                  Explore Services
                </AnimatedButton>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-4xl font-bold text-white mb-1">500<span className="text-blue-400">+</span></h3>
                  <p className="text-blue-200 text-sm">Enterprise Clients</p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-4xl font-bold text-white mb-1">6<span className="text-blue-400">+</span> yrs</h3>
                  <p className="text-blue-200 text-sm">Industry Experience</p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h3 className="text-4xl font-bold text-white mb-1">5000<span className="text-blue-400">+</span></h3>
                  <p className="text-blue-200 text-sm">Professionals Trained</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Service cards with parallax effect */}
          <div className="relative">
            <motion.div
              className="relative z-10 space-y-4"
              layout
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  scrollYProgress={scrollYProgress}
                  index={index}
                  isHovered={hoveredCardIndex === index}
                  onHover={handleCardHover}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Registration form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-blue-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
              className="w-full max-w-xl mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <RegistrationForm
                onClose={() => setShowForm(false)}
                courseDetails={{
                  id: 'hero-course',
                  title: 'Unlock AI Secrets',
                  price: 99,
                  description: 'Get ready to act smart with AI, not just in your work place, also amidst your Family, Friends and Relative. Your Three Hrs of our work can be done in 3 minutes with the help of AI. Become super smart with AI.',
                  duration: '2.5 hours',
                  level: 'All Levels',
                  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  benefits: [
                    'The Secret of AI Future',
                    '50 plus Hidden AI Tools',
                    'Master Prompt Engineering',
                    'Secret tips to mastering the use of AI',
                    'Materials worth Rs. 5000/- for Free. (PDF, PPT, Posters, Videos etc.)',
                  ],
                  schedule: {
                    timing: '6:00pm to 08:30pm',
                    venue: 'Online Live'
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero; 