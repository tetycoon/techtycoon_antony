import React from 'react';
import { motion } from 'framer-motion';
import { PricingSection } from '../components/ui-enhanced/PricingCard';
import { Button } from '../components/ui-enhanced/Button';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { CompactFounderSection } from '../components/ui-enhanced/CompactFounderSection';
import { Navbar } from '../components/ui-enhanced/Navbar';

const PricingDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      {/* Navbar */}
      <Navbar transparent={true} />
      
      {/* Header Section - with pt-16 to account for navbar height */}
      <div className="pt-16 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-6">
              <SparklesIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Limited time offer</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Elevate Your Career with <span className="text-blue-600 dark:text-blue-400">AI Education</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Our comprehensive AI courses and community resources help you stay ahead 
              of the curve in today's rapidly evolving technological landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="default" 
                roundness="full"
                size="lg"
                rightIcon={<ArrowRightIcon className="h-5 w-5" />}
              >
                Get Started Now
              </Button>
              
              <Button 
                variant="outline" 
                roundness="full"
                size="lg"
              >
                View Course Catalog
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Highlight Section */}
      <div className="py-8 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-white">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Quick Results</p>
                <p className="text-sm text-white/80">See progress in weeks</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Industry Recognized</p>
                <p className="text-sm text-white/80">Certified programs</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Expert Support</p>
                <p className="text-sm text-white/80">24/7 community access</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-16 space-y-16">
        {/* Meet the Founder Section (New Compact Version) */}
        <div className="container mx-auto px-4">
          <CompactFounderSection />
        </div>
      
        {/* Pricing Section */}
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Choose Your AI Learning Path
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Flexible options designed to fit your learning goals and schedule.
              Select the program that works best for you.
            </motion.p>
          </div>
          
          <PricingSection />
        </div>
        
        {/* Testimonials */}
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                What Our Students Say
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join thousands of satisfied learners on their AI journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Data Scientist",
                  content: "The AI Secrets course completely transformed my approach to machine learning projects. The instructor's expertise and practical examples made complex concepts easy to understand.",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  role: "College Student",
                  content: "As a student with no prior programming experience, the Summer Bootcamp was perfect. It gave me a solid foundation and the confidence to pursue more advanced AI courses.",
                  rating: 4
                },
                {
                  name: "Jessica Patel",
                  role: "Marketing Professional",
                  content: "Being part of the AI Tycoon Community has been invaluable. The daily sessions keep me updated on the latest trends, and I've implemented several AI tools that have increased our marketing ROI by 32%.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.content}</p>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ready to Master AI Technology?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/80 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Start your journey today and join our community of AI enthusiasts and professionals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                variant="gradient"
                roundness="full"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Sign Up Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDemo; 