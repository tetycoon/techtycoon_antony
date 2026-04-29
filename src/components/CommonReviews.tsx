import React from 'react';
import { motion } from 'framer-motion';

interface ReviewProps {
  name: string;
  text: string;
  location?: string;
  profession?: string;
}

const reviews: ReviewProps[] = [
  {
    name: "Karthik Subramaniam",
    text: "The AI course was incredibly practical. I've been able to implement what I learned immediately in my business.",
    location: "Chennai",
    profession: "Digital Entrepreneur"
  },
  {
    name: "Ananya Krishnan",
    text: "A game-changer for my marketing strategy. The AI tools they taught have saved me hours of work every week.",
    location: "Bengaluru",
    profession: "Marketing Manager"
  },
  {
    name: "Venkatesh Raman",
    text: "The instructors break down complex AI concepts in a way that's easy to understand and apply. Highly recommended!",
    location: "Hyderabad",
    profession: "Tech Consultant"
  },
  {
    name: "Priya Lakshmi",
    text: "This course gave me a competitive edge in my industry. Now I'm implementing AI strategies my competitors haven't even heard of.",
    location: "Coimbatore",
    profession: "Business Owner"
  },
  {
    name: "Rajesh Naidu",
    text: "Worth every rupee! The hands-on approach and practical examples made learning AI marketing techniques enjoyable.",
    location: "Kochi",
    profession: "Content Creator"
  }
];

const CommonReviews: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white border-t border-gray-200 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-3 dark:bg-blue-900/50 dark:text-blue-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Our Students Say
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Join hundreds of satisfied students from across South India who have transformed their careers and businesses with our AI courses.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 p-6"
            >
              {/* Rating stars */}
              <div className="mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 italic mb-5 text-lg">"{review.text}"</p>
              
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {review.location}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{review.profession}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonReviews; 