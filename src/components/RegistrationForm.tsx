import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { PaymentResponse } from '../interfaces/Payment';
import { openRazorpay } from '../services/payment';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { getWhatsAppGroupLink } from '../services/whatsappGroups';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_q3q75bd',
  templateId: 'template_52sgt8p',
  publicKey: 'JPL083BhpGSElhQKd',
  adminEmail: 'techtycoondigitalsolutions@gmail.com'
};

interface CourseDetails {
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

interface RegistrationFormProps {
  courseDetails?: CourseDetails;
  courseName?: string;
  coursePrice?: number;
  courseId?: string;
  onClose?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  courseDetails,
  courseName,
  coursePrice,
  courseId,
  onClose 
}) => {
  // Use either direct props or extract from courseDetails for backward compatibility
  const title = courseName || (courseDetails?.title || '');
  const price = coursePrice || (courseDetails?.price || 0);
  const id = courseId || (courseDetails?.id || '');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    course: title
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  // Added flag to track if WhatsApp link has been clicked
  const [whatsappLinkClicked, setWhatsappLinkClicked] = useState<boolean>(false);

  useEffect(() => {
    try {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (paymentId: string) => {
    try {
      console.log('Starting email send process...');
      
      const templateParams = {
        to_email: EMAILJS_CONFIG.adminEmail,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        course: title,
        payment_id: paymentId,
        amount: price,
        type: 'admin'
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log('EmailJS Response:', response);

      if (response.status === 200) {
        console.log('Email sent successfully');
        setPaymentStatus('Registration successful! Check your email for confirmation.');
        setShowSuccess(true);
        triggerConfetti();
        
        // Removed automatic timeout that was closing the form
        // if (onClose) {
        //   setTimeout(onClose, 5000);
        // }
      } else {
        throw new Error(`Email sending failed with status: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Email sending failed with error:', error);
      setPaymentStatus(
        `Payment successful but email confirmation failed. Error: ${error?.message || 'Unknown error'}. Please contact admin via WhatsApp: +91 1234567890`
      );
      setShowSuccess(true);
    }
  };

  // Function to handle WhatsApp link click
  const handleWhatsAppLinkClick = () => {
    setWhatsappLinkClicked(true);
    // This doesn't close the page, just tracks that they've clicked the link
    // The user can still decide to stay on the page or go back
  };

  const handlePaymentSuccess = async (response: PaymentResponse) => {
    try {
      await sendEmail(response.razorpay_payment_id);
      setShowSuccess(true);
      triggerConfetti();
    } catch (error) {
      console.error('Payment success handling failed:', error);
      setPaymentStatus('Payment successful but confirmation failed. Please contact admin via WhatsApp.');
      setShowSuccess(true);
    }
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    setPaymentStatus('Payment failed. Please try again.');
    setShowSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await openRazorpay(price, formData, handlePaymentSuccess, handlePaymentError);
    } catch (error) {
      console.error('Payment process failed:', error);
      setPaymentStatus('Payment process failed. Please try again.');
      setShowSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
          className="relative max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 z-50"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Register for {title}
        </h2>
        {onClose && !showSuccess && (
          <button
            type="button"
            onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-8"
          >
            <div className="text-green-500 text-6xl mx-auto mb-4">
              <FaCheckCircle />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
            {paymentStatus.includes('failed') ? (
              <>
                <p className="text-red-600 mb-4">Your data was not sent to the admin.</p>
                <p className="text-gray-600 mb-4">Please contact admin via WhatsApp:</p>
                <a 
                      href={`https://wa.me/${process.env.REACT_APP_ADMIN_WHATSAPP || '7558133039'}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contact Admin
                </a>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">We've sent you a confirmation email with all the details.</p>
                    <p className="text-sm text-gray-500 mb-6">Complete your enrollment by joining the WhatsApp group below:</p>
                    
                    <a 
                      href={getWhatsAppGroupLink(id)}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppLinkClick}
                      className="inline-flex items-center justify-center w-full px-6 py-3 mb-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.298.446-.446.149-.148.223-.248.334-.415.112-.167.056-.312-.008-.446-.063-.133-.57-1.38-.782-1.89-.212-.51-.426-.464-.57-.473-.149-.008-.297-.01-.446-.01-.173 0-.347.074-.52.372-.173.297-.663.966-.663 2.36 0 1.393.967 2.733 1.102 2.92.136.187 1.84 2.81 4.46 3.93.616.287 1.098.45 1.473.577.615.255 1.175.29 1.62.03.445-.26 1.01-1.025 1.29-1.76.28-.733.28-1.36.195-1.49-.086-.13-.347-.21-.644-.358m-5.73 3.347c-.322.23-.73.343-1.144.343-1.198 0-2.31-.52-3.12-1.46-.81-.94-1.25-2.2-1.25-3.52 0-1.32.44-2.58 1.25-3.52.81-.94 1.92-1.46 3.12-1.46.414 0 .822.113 1.144.343.322.23.5.55.5.9 0 .35-.178.67-.5.9-.322.23-.73.34-1.144.34-.79 0-1.53.34-2.08.95-.55.61-.85 1.42-.85 2.28 0 .86.3 1.67.85 2.28.55.61 1.29.95 2.08.95.414 0 .822.11 1.144.34.322.23.5.55.5.9 0 .35-.178.67-.5.9M12 2C6.48 2 2 6.48 2 12c0 1.7.45 3.3 1.23 4.7L2 22l5.3-1.23C8.7 21.55 10.3 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                      </svg>
                      JOIN WHATSAPP GROUP
                    </a>
                    
                    <p className="text-xs text-gray-500 italic mb-6">Important: You must join the WhatsApp group to access course materials</p>
                    
                    <div className="flex space-x-4 mt-6">
                      {whatsappLinkClicked && (
                        <button
                          onClick={onClose}
                          className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Back to Previous Page
                        </button>
                      )}
                      {!whatsappLinkClicked && (
                        <p className="text-orange-500 text-sm font-medium">
                          Please click the WhatsApp group link above to continue
                        </p>
                      )}
                    </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-center text-gray-800">
                Course Price: ₹{price}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </button>

            {paymentStatus && !showSuccess && (
              <div className={`p-4 rounded-lg ${
                paymentStatus.includes('successful') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {paymentStatus}
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
      </div>
    </div>
  );
};

export default RegistrationForm; 