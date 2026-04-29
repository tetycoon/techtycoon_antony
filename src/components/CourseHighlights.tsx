import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const CourseHighlights: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the subscription logic
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Glassmorphic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob shapes */}
        <motion.div 
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/10 opacity-70 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/10 dark:to-indigo-900/20 opacity-70 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTYwIDBoLTN2M2gzVjB6bS0xMCAwSDIwdjNoMzBWMHptLTQwIDBoLTN2M2gzVjB6TTMgMEgwdjNoM1Ywem01NyA3aC0zdjNoM1Y3em0tMTAgMEgyMHYzaDMwVjd6bS00MCAwSDB2M2gxMFY3ek0zIDdIMHYzaDNWN3ptNTcgN2gtM3YzaDNWMTR6bS0xMCAwSDIwdjNoMzBWMTR6bS00MCAwSDd2M2gzVjE0ek0zIDE0SDB2M2gzVjE0em01NyA3aC0zdjNoM1YyMXptLTEwIDBIMjB2M2gzMFYyMXptLTQwIDBIMHYzaDEwVjIxek0zIDIxSDB2M2gzVjIxem01NyA3aC0zdjNoM1YyOHptLTEwIDBIMjB2M2gzMFYyOHptLTQwIDBIN3YzaDNWMjh6TTMgMjhIMHYzaDNWMjh6bTU3IDdoLTN2M2gzVjM1em0tMTAgMEgyMHYzaDMwVjM1em0tNDAgMEgwdjNIMTBWMzV6TTMgMzVIMHYzaDNWMzV6bTU3IDdoLTN2M2gzVjQyem0tMTAgMEgyMHYzaDMwVjQyem0tNDAgMEg3djNoM1Y0MnptNTcgN2gtM3YzaDNWNDl6bS0xMCAwSDIwdjNoMzBWNDl6bS00MCAwSDB2M2gxMFY0OXpNMyA0OUgwdjNoM1Y0OXptNTcgN2gtM3YzaDNWNTZ6bS0xMCAwSDIwdjNoMzBWNTZ6bS00MCAwSDd2M2gzVjU2ek0zIDU2SDB2M2gzVjU2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 dark:opacity-10"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced newsletter section */}
        <motion.div 
          className="text-center mb-16 max-w-4xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg border border-white/50 dark:border-gray-700/50 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 pb-0">
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 text-sm font-medium mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
              Newsletter
          </motion.span>
          
          <motion.h2 
              className="text-3xl font-bold text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
              Subscribe to Tech Tycoon Updates
          </motion.h2>
          
          <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 mx-auto mb-4 rounded-full"
            initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 64, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
              Join our community and receive the latest updates on AI technology, digital marketing trends, 
              exclusive course discounts, and tech insights delivered right to your inbox.
          </motion.p>
          </div>

          {/* Benefits of subscribing */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800 dark:text-white">Early Access</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Be the first to know about new courses and events</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800 dark:text-white">Exclusive Discounts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Special offers only available to subscribers</p>
              </div>
            </div>
                  
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800 dark:text-white">AI Tips & Tricks</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Practical insights you can apply immediately</p>
              </div>
            </div>
          </motion.div>

          {/* Email subscription form */}
          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 border-t border-blue-100 dark:border-blue-800/20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
              >
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
                  
            <div className="mt-6 flex justify-center">
              <Link to="/newsletter" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                View our past newsletters
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
              </Link>
                </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseHighlights; 