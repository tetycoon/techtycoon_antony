import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// Note: We would need to install these packages:
// npm install swiper @types/swiper
// 
// Importing as a comment to avoid breaking the component in the current codebase
//
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// For now, we'll create a fallback testimonial carousel that can be easily 
// upgraded to Swiper.js when the dependencies are available.

export interface Testimonial {
  id: string;
  text: string;
  author: {
    name: string;
    title?: string;
    company?: string;
  };
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  className,
  autoplay = true,
  autoplaySpeed = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Move to next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Move to previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Handle autoplay
  React.useEffect(() => {
    if (autoplay) {
      timeoutRef.current = setTimeout(() => {
        nextTestimonial();
      }, autoplaySpeed);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, autoplay, autoplaySpeed]);

  // Get current testimonial
  const currentTestimonial = testimonials[currentIndex];

  // Render star ratings
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center mb-3" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              "w-5 h-5 mr-1",
              i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
            )}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("relative mx-auto max-w-4xl", className)}>
      <div 
        className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12"
          >
            {/* Testimonial content */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Initial letter avatar instead of image */}
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="relative">
                  <motion.div 
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-400 blur-md opacity-75"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                    {currentTestimonial.author.name.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Testimonial text */}
              <div className="flex-grow">
                {currentTestimonial.rating && renderRating(currentTestimonial.rating)}
                
                <blockquote>
                  <motion.p 
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    "{currentTestimonial.text}"
                  </motion.p>
                  
                  <footer className="flex items-center">
                    <div>
                      <cite className="not-italic">
                        <span className="font-semibold block text-gray-900 dark:text-white">
                          {currentTestimonial.author.name}
                        </span>
                        {(currentTestimonial.author.title || currentTestimonial.author.company) && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {currentTestimonial.author.title}
                            {currentTestimonial.author.title && currentTestimonial.author.company && ' - '}
                            {currentTestimonial.author.company}
                          </span>
                        )}
                      </cite>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Pagination dots */}
        <div className="flex items-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", 
                index === currentIndex 
                  ? "bg-blue-500 scale-110" 
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        
        <button
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Note: To upgrade to Swiper.js, uncomment this code and remove the manual implementation above

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={autoplay ? { delay: autoplaySpeed, disableOnInteraction: false } : false}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="rounded-2xl shadow-xl"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="p-8 md:p-12 bg-white dark:bg-gray-800">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {testimonial.author.avatar && (
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <img
                      src={testimonial.author.avatar}
                      alt={`${testimonial.author.name}`}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-grow">
                  {testimonial.rating && renderRating(testimonial.rating)}
                  
                  <blockquote>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                      "{testimonial.text}"
                    </p>
                    
                    <footer className="flex items-center">
                      <div>
                        <cite className="not-italic">
                          <span className="font-semibold block text-gray-900 dark:text-white">
                            {testimonial.author.name}
                          </span>
                          {(testimonial.author.title || testimonial.author.company) && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {testimonial.author.title}
                              {testimonial.author.title && testimonial.author.company && ' - '}
                              {testimonial.author.company}
                            </span>
                          )}
                        </cite>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      */}
    </div>
  );
};

export default TestimonialCarousel; 