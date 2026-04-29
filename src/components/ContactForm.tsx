import React, { RefObject } from 'react';
import { motion } from 'framer-motion';

interface ContactFormProps {
  formRef: RefObject<HTMLFormElement>;
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  formStatus: {
    isSubmitting: boolean;
    isSubmitted: boolean;
    isError: boolean;
    message: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formRef,
  formData,
  formStatus,
  handleInputChange,
  handleSubmit
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Get in touch</h3>
        
        {formStatus.message && (
          <div className={`p-4 mb-6 rounded-md ${formStatus.isError ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
            {formStatus.message}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="+91 1234567890"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>
        
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-6 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={formStatus.isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>
    </div>
  );
};

export default ContactForm; 