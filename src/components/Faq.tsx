import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '../lib/utils';
import Registration from './Registration';

type TrainingItem = {
  id: number;
  title: string;
  description: string;
  details: string[];
  highlight?: string;
  price?: string;
  icon?: React.ReactNode;
};

const trainingPrograms: TrainingItem[] = [
  {
    id: 1,
    title: "Unlock AI Secrets",
    description: "Are You Ready to UNLOCK the Secrets of AI? (CERTIFIED SESSION)",
    details: [
      "The History, future and the Massive Influence of AI",
      "50 plus Hidden AI Tools",
      "AI Prompts (Prompt Engineering)",
      "Secret tips to mastering the use of AI",
      "Certified session"
    ],
    highlight: "Register Now with just Rs. 99/-",
    price: "₹99",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Summer Special AI Bootcamp",
    description: "Turn your free time into a Future-Ready Skill with our Artificial Intelligence Summer Bootcamp!",
    details: [
      "For: Ages 13 years and above",
      "Ideal for: School and College going students",
      "Language: English only",
      "Date: 1st May 2025 - 31st May 2025",
      "Time: 9:00 AM to 11:00 AM (Monday to Friday)",
      "Venue: Online – Live Session"
    ],
    highlight: "Change and Challenge Your Life for the Future",
    price: "₹4999",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: 3,
    title: "AI Tycoon Community",
    description: "Join our exclusive AI Tycoon Community for continuous learning and growth",
    details: [
      "Everyday 15-20 minutes Lives session introducing one AI Tool and sharing one Technology related News",
      "50% offer on all sessions conducted in the Future",
      "Secret way to get Canva Pro for Free",
      "Life time Membership to be part of our AI Tycoon Community",
      "Access to recordings if you miss the session for the day",
      "AI Related Materials for Free"
    ],
    highlight: "Special Offer Only for YOU!",
    price: "₹2999",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

const Faq: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Registration modal state
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{title: string, price: string}>({
    title: '',
    price: ''
  });
  
  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const handleEnrollClick = (program: TrainingItem) => {
    setSelectedCourse({
      title: program.title,
      price: program.price || '0'
    });
    setIsRegistrationOpen(true);
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Glassmorphic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background shapes */}
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-100/50 to-blue-100/50 dark:from-indigo-900/20 dark:to-blue-900/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5
          }}
        />
        
        {/* Particle effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/20 dark:bg-blue-400/20"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                delay: Math.random() * 20,
              }}
            />
          ))}
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTYwIDBoLTN2M2gzVjB6bS0xMCAwSDIwdjNoMzBWMHptLTQwIDBoLTN2M2gzVjB6TTMgMEgwdjNoM1Ywem01NyA3aC0zdjNoM1Y3em0tMTAgMEgyMHYzaDMwVjd6bS00MCAwSDB2M2gxMFY3ek0zIDdIMHYzaDNWN3ptNTcgN2gtM3YzaDNWMTR6bS0xMCAwSDIwdjNoMzBWMTR6bS00MCAwSDd2M2gzVjE0ek0zIDE0SDB2M2gzVjE0em01NyA3aC0zdjNoM1YyMXptLTEwIDBIMjB2M2gzMFYyMXptLTQwIDBIMHYzaDEwVjIxek0zIDIxSDB2M2gzVjIxem01NyA3aC0zdjNoM1YyOHptLTEwIDBIMjB2M2gzMFYyOHptLTQwIDBIN3YzaDNWMjh6TTMgMjhIMHYzaDNWMjh6bTU3IDdoLTN2M2gzVjM1em0tMTAgMEgyMHYzaDMwVjM1em0tNDAgMEgwdjNIMTBWMzV6TTMgMzVIMHYzaDNWMzV6bTU3IDdoLTN2M2gzVjQyem0tMTAgMEgyMHYzaDMwVjQyem0tNDAgMEg3djNoM1Y0MnptNTcgN2gtM3YzaDNWNDl6bS0xMCAwSDIwdjNoMzBWNDl6bS00MCAwSDB2M2gxMFY0OXpNMyA0OUgwdjNoM1Y0OXptNTcgN2gtM3YzaDNWNTZ6bS0xMCAwSDIwdjNoMzBWNTZ6bS00MCAwSDd2M2gzVjU2ek0zIDU2SDB2M2gzVjU2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 dark:opacity-10"></div>
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
            Elevate Your Skills
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Training & Workshops
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 mx-auto mb-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Empower yourself with cutting-edge skills in Digital Marketing and Artificial Intelligence
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trainingPrograms.map((program, idx) => (
            <motion.div
              key={program.id}
              className="h-full"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              onMouseEnter={() => setHoveredId(program.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className={cn(
                  "h-full relative group overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-500 border flex flex-col",
                  "bg-white/70 border-white/50 dark:bg-gray-800/70 dark:border-gray-700/50",
                  hoveredId === program.id ? "shadow-xl shadow-blue-500/10 dark:shadow-blue-500/5" : "shadow-lg"
                )}
              >
                {/* Simplified background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent opacity-30 transition-opacity duration-700 z-0"></div>
                
                {/* Header - Made larger and more prominent */}
                <div className="relative z-10">
                  <div className="bg-blue-600 p-8 rounded-t-2xl">
                    <div className="flex flex-col items-center text-center mb-2">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white mb-4">
                        {program.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{program.title}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Content - Simplified layout */}
                <div className="p-6 relative z-10 flex-grow flex flex-col">
                  <p className="text-gray-700 dark:text-gray-300 mb-6 font-medium text-center">{program.description}</p>
                  
                  <ul className="space-y-3 mb-6 flex-grow">
                    {program.details.map((detail, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-3"
                      >
                        <span className="h-6 w-6 mt-0.5 flex-shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {program.highlight && (
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50 mb-6 text-center">
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{program.highlight}</p>
                    </div>
                  )}
                  
                  <div className="mt-auto">
                    {program.id === 1 && (
                      <div className="mb-4 px-2">
                        <a href="#" className="block text-center text-sm text-blue-600 hover:underline">
                          Register Now with just Rs. 99/-
                        </a>
                      </div>
                    )}
                    
                    {program.id === 3 && (
                      <div className="mb-6 px-2">
                        <div className="relative mb-6">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase py-1 px-3 absolute -top-3 right-0 rounded-full shadow-lg transform rotate-3">
                            50% OFF
                          </div>
                          <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl p-4 bg-blue-50 dark:bg-blue-900/20">
                            <div className="flex flex-col gap-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Six Months:</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 line-through text-sm">₹5,999/-</span>
                                  <span className="text-blue-600 dark:text-blue-400 font-bold">NOW ₹2,999/-</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">One Year:</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 line-through text-sm">₹11,999/-</span>
                                  <span className="text-blue-600 dark:text-blue-400 font-bold">NOW ₹4,999/-</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mb-4">
                          <button
                            onClick={() => handleEnrollClick({...program, price: "₹2999", title: "AI Tycoon Community (6 Months)"})}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm py-2 px-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            6 Months
                          </button>
                          <button
                            onClick={() => handleEnrollClick({...program, price: "₹4999", title: "AI Tycoon Community (1 Year)"})}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm py-2 px-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            1 Year
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {program.id !== 3 && (
                      <motion.button
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleEnrollClick(program)}
                      >
                        Enroll Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    )}
                    
                    {program.id === 1 && (
                      <p className="text-center mt-4 text-gray-500 dark:text-gray-400 italic font-medium">
                        "AI WILL NOT REPLACE YOU, BUT A PERSON USING AI WILL"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-20 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/50 dark:border-gray-700/50 overflow-hidden relative">
            {/* Animated background gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent opacity-50 z-0"
              animate={{ 
                background: [
                  "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
                  "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
                  "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
                ] 
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            />
            
            <div className="relative z-10 text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Need more information?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Contact us directly for customized programs for institutions, corporate training, or one-on-one sessions.</p>
              
              <motion.div 
                className="inline-flex items-center gap-4 bg-blue-50/90 dark:bg-blue-900/30 backdrop-blur-sm p-4 rounded-xl shadow-md border border-blue-100/80 dark:border-blue-800/30"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
            <p className="font-medium text-gray-800 dark:text-white">Antony Praveen</p>
            <a 
              href="tel:+917558133039" 
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-lg"
            >
              +91 75581 33039
            </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Add registration popup */}
        <Registration 
          isOpen={isRegistrationOpen}
          onClose={() => setIsRegistrationOpen(false)}
          courseTitle={selectedCourse.title}
          coursePrice={selectedCourse.price}
        />
      </div>
    </section>
  );
};

export default Faq; 