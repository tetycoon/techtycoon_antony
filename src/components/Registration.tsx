import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface RegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  coursePrice: string;
}

const Registration: React.FC<RegistrationProps> = ({ 
  isOpen, 
  onClose, 
  courseTitle, 
  coursePrice 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseTitle,
    coursePrice
  });
  
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setPaymentStatus('processing');
    
    try {
      // Initialize Razorpay payment
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay key
        amount: parseInt(coursePrice.replace(/[^0-9]/g, '')) * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "Tech Tycoon",
        description: `Registration for ${courseTitle}`,
        handler: function(response: any) {
          // Payment successful
          setPaymentId(response.razorpay_payment_id);
          setPaymentStatus('success');
          
          // Send email with payment details
          sendConfirmationEmail(response.razorpay_payment_id);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#3b82f6"
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus('idle');
          }
        }
      };
      
      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus('error');
    }
  };
  
  const sendConfirmationEmail = async (paymentId: string) => {
    try {
      await emailjs.send(
        "YOUR_EMAILJS_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_EMAILJS_TEMPLATE_ID", // Replace with your EmailJS template ID
        {
          to_email: "admin@example.com", // Replace with admin email
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          course_title: courseTitle,
          course_price: coursePrice,
          payment_id: paymentId
        },
        "YOUR_EMAILJS_USER_ID" // Replace with your EmailJS user ID
      );
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  };
  
  const handleContactWhatsApp = () => {
    window.open(`https://wa.me/7558133039?text=Hi, I'm interested in the ${courseTitle} course.`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <form ref={formRef} onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Register for Course</h2>
              <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-4">{courseTitle}</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Course Fee
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {coursePrice}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={paymentStatus === 'processing'}
                >
                  {paymentStatus === 'processing' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : "Pay Now"}
                </motion.button>
                
                <button
                  type="button"
                  onClick={handleContactWhatsApp}
                  className="w-full border border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Contact on WhatsApp
                </button>
              </div>
              
              {paymentStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">
                  Payment successful! Your payment ID is: {paymentId}
                </div>
              )}
              
              {paymentStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">
                  Payment failed. Please try again or contact support.
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Registration; 