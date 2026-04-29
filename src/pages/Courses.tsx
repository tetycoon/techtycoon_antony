import React, { ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CourseEnrollmentInfo from '../components/CourseEnrollmentInfo';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  image: string;
  benefits?: string[];
  schedule?: {
    timing: string;
    venue: string;
  };
  limitedOffer?: boolean;
}

const Courses: React.FC = (): ReactElement => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Updated course data with all new courses
  const courses: Course[] = [
    {
      id: 'unlock-ai-secrets',
      title: 'Unlock AI Secrets',
      description: 'The Entire world is going crazy after AI. It is because AI is Revolutionizing our World. Three Hrs of our works can be done in 3 minutes with the help of AI.',
      price: 99,
      duration: '2.5 hours',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        'The History, future and the Massive Influence of AI',
        '50 plus Hidden AI Tools',
        'AI Prompts (Prompt Engineering)',
        'Secret tips to mastering the use of AI',
        'Certified session'
      ],
      schedule: {
        timing: '6:00pm to 08:30pm',
        venue: 'Online Live'
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
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
      },
      limitedOffer: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Training & Workshops
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose from our wide range of professional courses
          </p>
        </div>

        {/* Course enrollment information */}
        <CourseEnrollmentInfo />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-bold text-white">{course.title}</h2>
                </div>
                {/* Limited Time Offer Badge */}
                {course.limitedOffer && (
                  <motion.div
                    className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse z-20"
                    initial={{ scale: 0.9, opacity: 0.7 }}
                    animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Limited Time Offer!
                  </motion.div>
                )}
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{course.level}</span>
                  </div>
                </div>
                

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{course.price}
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses; 