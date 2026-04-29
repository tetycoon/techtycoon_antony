import React, { useState, ReactElement, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RegistrationForm from '../components/RegistrationForm';
import CommonReviews from '../components/CommonReviews';
import CourseCountdown from '../components/CourseCountdown';
import LimitedTimeDeal from '../components/LimitedTimeDeal';

interface Course {
  id: string;
  title: string;
  price: number;
  description: string;
  duration: string;
  level: string;
  image: string;
  benefits?: string[];
  schedule?: {
    timing: string;
    venue: string;
  };
}

const CourseDetails: React.FC = (): ReactElement => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<'6months' | '1year'>('6months');
  const [isButtonBlinking, setIsButtonBlinking] = useState<boolean>(true);
  const [showFloatingButton, setShowFloatingButton] = useState<boolean>(true);
  
  // Store scroll position when opening the registration modal
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  // Track scroll position for the floating button
  useEffect(() => {
    setShowFloatingButton(true); // Always show the floating button
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showRegistration) {
      // Store current scroll position
      setScrollPosition(window.pageYOffset);
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      // Restore body scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Restore scroll position
      window.scrollTo(0, scrollPosition);
    }
  }, [showRegistration, scrollPosition]);

  // Full-width floating button effect
  useEffect(() => {
    // Create and inject the full-width button directly
    const injectFullWidthButton = () => {
      // Create or replace the style element
      let styleEl = document.getElementById('full-width-button-style');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'full-width-button-style';
        document.head.appendChild(styleEl);
      }
      
      // Define the CSS
      styleEl.innerHTML = `
        .full-width-enroll-btn {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 65px;
          background: linear-gradient(90deg, #3B82F6, #4F46E5);
          color: white;
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          border: none;
          cursor: pointer;
          box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
          animation: gradientMove 3s infinite linear;
          background-size: 200% auto;
        }
        
        .full-width-enroll-btn span {
          margin-right: 12px;
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        body {
          padding-bottom: 70px !important;
        }
      `;
      
      // Create or replace the button element
      let buttonEl = document.getElementById('full-width-enroll-button');
      if (buttonEl) {
        document.body.removeChild(buttonEl);
      }
      
      buttonEl = document.createElement('button');
      buttonEl.id = 'full-width-enroll-button';
      buttonEl.className = 'full-width-enroll-btn';
      buttonEl.innerHTML = `
        <span>ENROLL NOW</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      `;
      
      // Add click event
      buttonEl.addEventListener('click', () => {
        setShowRegistration(true);
      });
      
      document.body.appendChild(buttonEl);
    };
    
    // Call the function
    injectFullWidthButton();
    
    // Set body padding
    document.body.style.paddingBottom = '70px';
    
    // Clean up
    return () => {
      const buttonEl = document.getElementById('full-width-enroll-button');
      if (buttonEl) {
        document.body.removeChild(buttonEl);
      }
      
      const styleEl = document.getElementById('full-width-button-style');
      if (styleEl) {
        document.head.removeChild(styleEl);
      }
      
      document.body.style.paddingBottom = '';
    };
  }, []);

  const courses: Course[] = [
    {
      id: 'unlock-ai-secrets',
      title: 'Unlock AI Secrets',
      description: 'Get ready to act smart with AI, not just in your work place, also amidst your Family, Friends and Relative. Your Three Hrs of our work can be done in 3 minutes with the help of AI. Become super smart with AI.',
      price: 99,
      duration: '3 hours',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'The Secret of AI Future',
        '50 plus Hidden AI Tools',
        'Master Prompt Engineering ',
        'Secret tips to mastering the use of AI',
        'Materials worth Rs. 5000/- for Free. (PDF, PPT, Posters, Videos etc.)'
      ],
      schedule: {
        timing: '6:00pm to 08:30pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'ai-linkedin-mastery',
      title: 'AI-Powered LinkedIn Mastery',
      description: 'Learn how to leverage AI tools to optimize your LinkedIn profile, create engaging content, and expand your professional network effectively.',
      price: 99,
      duration: '3 hours',
      level: 'Beginner to Intermediate',
      image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'AI-optimized profile creation',
        'Content generation strategies',
        'Automated networking techniques',
        'Lead generation using AI tools',
        'Certified session'
      ],
      schedule: {
        timing: '7:00pm to 10:00pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'business-automation-ai',
      title: 'Business Automation with AI',
      description: 'Discover how to implement AI-powered automation in your business processes to save time, reduce costs, and increase productivity.',
      price: 99,
      duration: '4 hours',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'Workflow automation techniques',
        'Customer service automation',
        'AI-powered data analysis',
        'Cost-effective implementation strategies',
        'Practical business applications'
      ],
      schedule: {
        timing: '6:00pm to 10:00pm',
        venue: 'Online Live'
      }
    },
    {
      id: '10x-income-with-ai',
      title: '10x your income with AI',
      description: 'Learn practical strategies to multiply your income by leveraging AI tools and platforms for freelancing, side hustles, and business scaling.',
      price: 99,
      duration: '3.5 hours',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'AI-powered income streams',
        'Freelancing with AI assistance',
        'Scaling businesses using automation',
        'Passive income strategies',
        'Real-world success case studies'
      ],
      schedule: {
        timing: '7:00pm to 10:30pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'make-movies-with-ai',
      title: 'Make Movies with AI',
      description: 'Learn to create compelling videos and short films using AI tools for script writing, video generation, editing, and post-production.',
      price: 99,
      duration: '4 hours',
      level: 'Beginner to Intermediate',
      image: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'AI script and storyboard generation',
        'Video synthesis techniques',
        'Voice and character creation',
        'Special effects with AI',
        'Distribution strategies'
      ],
      schedule: {
        timing: '6:00pm to 10:00pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'digital-marketing-ai',
      title: 'Digital Marketing with AI',
      description: 'Master digital marketing by implementing AI tools for content creation, SEO optimization, social media management, and campaign analysis.',
      price: 99,
      duration: '3 hours',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'AI-powered content strategies',
        'Automated social media management',
        'Data-driven campaign optimization',
        'SEO enhancement using AI',
        'Customer behavior prediction'
      ],
      schedule: {
        timing: '7:00pm to 10:00pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'business-growth-ai',
      title: 'Build and Grow your Business with AI',
      description: 'Learn comprehensive strategies to start, scale, and optimize your business operations using artificial intelligence and automation.',
      price: 99,
      duration: '4 hours',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'Business model optimization',
        'AI-powered market research',
        'Customer acquisition strategies',
        'Streamlined operations',
        'Growth hacking techniques'
      ],
      schedule: {
        timing: '6:00pm to 10:00pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'generative-ai',
      title: 'Generative AI',
      description: 'Explore the world of generative AI technologies, including image, text, and audio generation for creative and business applications.',
      price: 99,
      duration: '3 hours',
      level: 'Beginner to Intermediate',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'Image generation mastery',
        'Text and content creation',
        'Audio and music synthesis',
        'Practical implementation',
        'Future trends in generative AI'
      ],
      schedule: {
        timing: '7:00pm to 10:00pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'ms-excel-with-ai',
      title: 'MS Excel with AI',
      description: 'Transform your Excel skills by integrating AI capabilities for advanced data analysis, automation, and intelligent spreadsheet management.',
      price: 99,
      duration: '3 hours',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'AI-powered formulas and functions',
        'Automated data processing',
        'Predictive analytics in Excel',
        'Integration with AI services',
        'Time-saving Excel techniques'
      ],
      schedule: {
        timing: '6:00pm to 09:00pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'trading-with-ai',
      title: 'Trading with AI',
      description: 'Learn how to leverage artificial intelligence for stock market analysis, trend prediction, and developing automated trading strategies.',
      price: 99,
      duration: '4 hours',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'AI-based market analysis',
        'Algorithmic trading strategies',
        'Risk management techniques',
        'Backtesting with AI models',
        'Real-time trading tools'
      ],
      schedule: {
        timing: '7:00pm to 11:00pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'powerbi',
      title: 'PowerBI',
      description: 'Master Microsoft Power BI with AI integration for creating interactive dashboards, advanced data visualizations, and business intelligence solutions.',
      price: 99,
      duration: '3.5 hours',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'Interactive dashboard creation',
        'Data modeling and transformation',
        'AI-powered insights',
        'Business intelligence reporting',
        'Integration with other services'
      ],
      schedule: {
        timing: '6:00pm to 09:30pm',
        venue: 'Online Live'
      }
    },
    {
      id: 'advanced-ppt-mastery',
      title: 'Advanced PPT Mastery (AI-Powered)',
      description: 'Elevate your presentation skills with AI-powered techniques for creating professional, engaging PowerPoint presentations in a fraction of the time.',
      price: 99,
      duration: '3 hours',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'AI-generated presentation content',
        'Design automation techniques',
        'Visual storytelling strategies',
        'Animation and transition mastery',
        'Presentation delivery skills'
      ],
      schedule: {
        timing: '7:00pm to 10:00pm',
        venue: 'Online Live'
      }
    }
  ];

  const course = courses.find(c => c.id === courseId) || courses[0];

  const handleEnroll = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Course Header */}
          <div className="relative h-64 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative h-full flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white text-center px-4">
                {course.title}
              </h1>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Add countdown timer */}
                <CourseCountdown />
                
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8" style={{ whiteSpace: 'pre-line' }}>
                    {course.description}
                  </p>

                  {course.benefits && (
                    <>
                      <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {course.benefits.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {course.schedule && (
                    <>
                      <h2 className="text-2xl font-bold mb-4">Schedule</h2>
                      <div className="mb-8">
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-semibold">Timing:</span> {course.schedule.timing}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-semibold">Venue:</span> {course.schedule.venue}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 sticky top-8">
                  {/* Add Limited Time Deal */}
                  <LimitedTimeDeal />
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Course Details</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Level:</span>
                        <span className="ml-2 font-medium">{course.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Course Fee</h3>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{course.price}
                    </div>
                  </div>

                  {/* Blinking Enroll Now button */}
                  <AnimatePresence>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        scale: isButtonBlinking ? [1, 1.05, 1] : 1,
                        boxShadow: isButtonBlinking ? 
                          ['0px 0px 0px rgba(59, 130, 246, 0)', '0px 0px 15px rgba(59, 130, 246, 0.7)', '0px 0px 0px rgba(59, 130, 246, 0)'] : 
                          '0px 0px 0px rgba(59, 130, 246, 0)'
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      onClick={handleEnroll}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mb-4"
                    >
                      Enroll Now
                    </motion.button>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Registration Form Modal */}
      {showRegistration && (
        <RegistrationForm
          courseName={course.title}
          coursePrice={course.price}
          courseId={course.id}
          onClose={handleCloseRegistration}
        />
      )}

      {/* Add spacing div for separation */}
      <div className="mt-16 mb-8"></div>

      {/* Common Reviews Section */}
      <CommonReviews />
    </div>
  );
};

export default CourseDetails; 