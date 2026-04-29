import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  text: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Ramesh",
    role: "Small Business Owner",
    text: "The training I received at Tech Tycoon Digital Solution LLP was incredibly practical and easy to follow. I started as a beginner and now I confidently manage social media campaigns for my own brand!"
  },
  {
    id: 2,
    name: "Arun Kumar",
    role: "Startup Founder",
    text: "We hired Tech Tycoon for our startup's digital marketing. Within 3 months, we saw a 200% increase in leads. Highly professional and committed team!"
  },
  {
    id: 3,
    name: "Sneha Thomas",
    role: "Marketing Specialist",
    text: "I joined the AI & Digital Marketing course and it changed the way I see technology. Antony sir makes complex topics very simple to understand."
  },
  {
    id: 4,
    name: "Rajiv Menon",
    role: "E-commerce Manager",
    text: "We partnered with Tech Tycoon for a campaign launch. Their strategies were innovative and result-oriented. Our online presence has never been better!"
  },
  {
    id: 5,
    name: "Deepak Narayanan",
    role: "Content Creator",
    text: "What I loved most was their hands-on training. Everything was practical—from running ad campaigns to using tools like Canva and ChatGPT."
  },
  {
    id: 6,
    name: "Suresh Varadhan",
    role: "Business Consultant",
    text: "Antony and his team are truly passionate about what they do. They guided my business through a full rebranding and digital transformation."
  },
  {
    id: 7,
    name: "Meena Krishnan",
    role: "Author & Entrepreneur",
    text: "I never thought I could learn digital marketing at the age of 40, but Tech Tycoon proved me wrong. Their support and guidance are unmatched."
  },
  {
    id: 8,
    name: "Joseph D'Souza",
    role: "Digital Strategist",
    text: "I recommend Tech Tycoon to anyone serious about growing online or learning real-world digital skills. They are authentic, knowledgeable, and reliable."
  },
  {
    id: 9,
    name: "Aishwarya Menon",
    role: "Freelance Designer",
    text: "I attended the one-month online AI course, and it exceeded all my expectations! The sessions were interactive, and I learned how to use real AI tools in my daily work."
  },
  {
    id: 10,
    name: "Vikram S",
    role: "Product Manager",
    text: "The offline AI workshop conducted by Tech Tycoon was one of the best learning experiences I've had. Hands-on activities, real-world examples, and great mentorship!"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  const nextTestimonial = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Glassmorphic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Abstract shapes */}
        <svg className="absolute top-0 left-0 w-full h-full text-blue-100 dark:text-blue-900/20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Animated gradient blobs */}
        <motion.div 
          className="absolute right-1/4 top-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 dark:from-blue-500/10 dark:to-purple-500/10 blur-3xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute left-1/4 bottom-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-200/20 to-blue-200/20 dark:from-indigo-500/10 dark:to-blue-500/10 blur-3xl opacity-70"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -10, 0],
            opacity: [0.3, 0.4, 0.3],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 text-sm font-medium mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Testimonials
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What Our Clients Say
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 mx-auto mb-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover what our clients and students have to say about their experience with Tech Tycoon Digital Solution LLP.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="relative max-w-6xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                }}
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Left side - Testimonial card */}
                  <div className="relative">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 p-8 md:p-10 relative overflow-hidden group">
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-20 h-20 bg-blue-100/50 dark:bg-blue-900/30 rounded-br-3xl z-0"></div>
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-100/50 dark:bg-blue-900/30 rounded-tl-3xl z-0"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold relative overflow-hidden">
                            {testimonials[currentIndex].name.charAt(0)}
                            <img 
                              src={`https://randomuser.me/api/portraits/${testimonials[currentIndex].name.includes('Priya') || 
                                   testimonials[currentIndex].name.includes('Sneha') || 
                                   testimonials[currentIndex].name.includes('Meena') || 
                                   testimonials[currentIndex].name.includes('Aishwarya') ? 'women' : 'men'}/${(currentIndex % 70) + 1}.jpg`}
                              alt={testimonials[currentIndex].name}
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonials[currentIndex].name}</h3>
                            {testimonials[currentIndex].role && (
                              <p className="text-sm text-gray-600 dark:text-gray-300">{testimonials[currentIndex].role}</p>
                            )}
                          </div>
                        </div>
                        
                        <blockquote className="text-gray-700 dark:text-gray-300 text-lg italic mb-6">
                          "{testimonials[currentIndex].text}"
                        </blockquote>
                        
                        <div className="flex justify-start">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Testimonial gallery */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-2 gap-4 h-full">
                      {[...Array(4)].map((_, i) => {
                        const index = (currentIndex + i + 1) % testimonials.length;
                        return (
                          <motion.div
                            key={i}
                            className="relative cursor-pointer overflow-hidden rounded-xl shadow-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 group"
                            initial={{ opacity: 0.5, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            onClick={() => {
                              setDirection(index > currentIndex ? 'right' : 'left');
                              setCurrentIndex(index);
                            }}
                            whileHover={{ y: -5, scale: 1.02 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                            
                            <div className="p-4 relative z-20">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 mr-3">
                                  <img 
                                    src={`https://randomuser.me/api/portraits/${testimonials[index].name.includes('Priya') || 
                                         testimonials[index].name.includes('Sneha') || 
                                         testimonials[index].name.includes('Meena') || 
                                         testimonials[index].name.includes('Aishwarya') ? 'women' : 'men'}/${(index % 70) + 1}.jpg`} 
                                    alt={testimonials[index].name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-800 dark:text-white text-sm group-hover:text-white transition-colors duration-300">
                                    {testimonials[index].name}
                                  </h5>
                                  {testimonials[index].role && (
                                    <p className="text-blue-600 dark:text-blue-400 text-xs group-hover:text-blue-300 transition-colors duration-300">
                                      {testimonials[index].role}
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-gray-600 dark:text-gray-300 text-xs mt-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                                "{testimonials[index].text}"
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10">
            <div className="flex space-x-2">
              <motion.button 
                onClick={prevTestimonial}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full w-12 h-12 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none transition-colors duration-300 border border-white/50 dark:border-gray-700/50"
                aria-label="Previous"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button 
                onClick={nextTestimonial}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full w-12 h-12 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none transition-colors duration-300 border border-white/50 dark:border-gray-700/50"
                aria-label="Next"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
            
            {/* Indicator dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 'right' : 'left');
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-500 w-6 dark:bg-blue-400' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-300 dark:hover:bg-blue-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 