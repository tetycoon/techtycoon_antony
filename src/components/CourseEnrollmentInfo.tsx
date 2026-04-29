import React from 'react';
import { motion } from 'framer-motion';

const CourseEnrollmentInfo: React.FC = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-8">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 bg-green-500 p-2 rounded-full">
            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.298.446-.446.149-.148.223-.248.334-.415.112-.167.056-.312-.008-.446-.063-.133-.57-1.38-.782-1.89-.212-.51-.426-.464-.57-.473-.149-.008-.297-.01-.446-.01-.173 0-.347.074-.52.372-.173.297-.663.966-.663 2.36 0 1.393.967 2.733 1.102 2.92.136.187 1.84 2.81 4.46 3.93.616.287 1.098.45 1.473.577.615.255 1.175.29 1.62.03.445-.26 1.01-1.025 1.29-1.76.28-.733.28-1.36.195-1.49-.086-.13-.347-.21-.644-.358z" />
            </svg>
          </div>
          <h2 className="ml-4 text-xl font-bold text-gray-800">How Our Course Enrollment Works</h2>
        </div>
        
        <div className="space-y-4 text-gray-600">
          <p>
            After successful payment for any of our courses, you'll be provided with a WhatsApp group link to join. 
            These groups are where all course materials, schedules, and resources will be shared.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Important</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>You must join the WhatsApp group linked to your course to receive course materials</li>
              <li>Each course has its own dedicated WhatsApp group</li>
              <li>Live session links will be shared exclusively in these groups</li>
              <li>Recordings and additional resources will be available there as well</li>
            </ul>
          </div>
          
          <p className="text-sm italic">
            If you have any questions about accessing your course materials, please contact our support team via the WhatsApp button
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseEnrollmentInfo; 