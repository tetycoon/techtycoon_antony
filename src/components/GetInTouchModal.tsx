import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { createPortal } from 'react-dom';

// EmailJS Configuration (same as RegistrationForm)
const EMAILJS_CONFIG = {
    serviceId: 'service_q3q75bd',
    templateId: 'template_52sgt8p',
    publicKey: 'JPL083BhpGSElhQKd',
    adminEmail: 'techtycoondigitalsolutions@gmail.com'
};

interface GetInTouchModalProps {
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    serviceInterest: string;
}

const GetInTouchModal: React.FC<GetInTouchModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceInterest: 'General Inquiry'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            emailjs.init(EMAILJS_CONFIG.publicKey);
        } catch (error) {
            console.error('Failed to initialize EmailJS:', error);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Simplified template params that match standard EmailJS templates
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                service: formData.serviceInterest,
                message: formData.message,
                to_email: EMAILJS_CONFIG.adminEmail
            };

            console.log('Sending email with params:', templateParams);

            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams,
                EMAILJS_CONFIG.publicKey
            );

            console.log('EmailJS response:', response);

            if (response.status === 200) {
                setIsSuccess(true);
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    serviceInterest: 'General Inquiry'
                });
            } else {
                throw new Error('Failed to send email');
            }
        } catch (err: any) {
            console.error('Email sending failed:', err);

            // More detailed error message
            let errorMessage = 'Failed to send message. ';
            if (err?.text) {
                errorMessage += `Error: ${err.text}. `;
            }
            if (err?.status) {
                errorMessage += `Status: ${err.status}. `;
            }
            errorMessage += 'Please contact us directly at techtycoondigitalsolutions@gmail.com or call +91 7558133039';

            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[10000]">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="flex items-center justify-center min-h-screen px-4 py-8 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                    className="relative w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Get in Touch</h2>
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <p className="text-blue-100 mt-2 text-sm">
                            Fill out the form below and we'll get back to you shortly.
                        </p>
                    </div>

                    <div className="p-6 md:p-8">
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FaCheckCircle className="text-4xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                                        Thank you for contacting us. We will review your message and respond as soon as possible.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    {error && (
                                        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                                            {error}
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="serviceInterest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service of Interest</label>
                                        <select
                                            id="serviceInterest"
                                            name="serviceInterest"
                                            value={formData.serviceInterest}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Digital Marketing">Digital Marketing</option>
                                            <option value="Social Media Management">Social Media Management</option>
                                            <option value="SEO Optimization">SEO Optimization</option>
                                            <option value="Content Creation">Content Creation</option>
                                            <option value="Web Development">Web Development</option>
                                            <option value="AI Solutions">AI Solutions</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Tell us about your project or requirements..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3.5 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : 'Submit Request'}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>,
        document.body
    );
};

export default GetInTouchModal;
