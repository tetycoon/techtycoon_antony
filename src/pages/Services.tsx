import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import WhatsAppMarketing from '../assets/whatsappmark.jpeg';
import { firstRowServices, remainingServices } from '../services/serviceData';
import GetInTouchModal from '../components/GetInTouchModal';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image: string;
  benefits: string[];
  slug: string;
}

const Services: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerDelay = 0.1;

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section with 3D elements */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 z-0"></div>

        {/* Abstract background shapes */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm">
                AI-Powered Solutions
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Our AI-Driven Marketing Services
            </motion.h1>

            <motion.p
              className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Leverage the power of artificial intelligence to transform your marketing strategy and achieve unprecedented results for your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setShowContactModal(true)}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Us
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900 z-10"></div>
      </section>

      {/* Services Section with modern card design */}
      <section id="services" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              Supercharge Your Marketing Strategy
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Our suite of AI-powered marketing services designed to give you a competitive edge in today's digital landscape.
            </motion.p>
          </div>

          {/* First row services */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {firstRowServices.map((service, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full flex flex-col rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} mix-blend-multiply opacity-90 z-10`}></div>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        // Fallback image for specific services
                        const target = e.target as HTMLImageElement;
                        if (service.title === "WhatsApp Marketing") {
                          target.src = "https://placehold.co/600x400/25D366/FFFFFF?text=WhatsApp+Marketing";
                        } else if (service.title === "Video Editing") {
                          target.src = "https://placehold.co/600x400/FF5722/FFFFFF?text=Video+Editing";
                        } else {
                          target.src = "https://placehold.co/600x400/3B82F6/FFFFFF?text=Service+Image";
                        }
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg bg-white/20 backdrop-blur-md`}>
                          {service.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>

                    <div className="mb-6">
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Button Section */}
                  <div className="px-6 pb-6 mt-auto">
                    <Link
                      to={`/services/${service.slug}`}
                      className={cn(
                        "w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center",
                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gradient-to-r hover:text-white",
                        service.color
                      )}
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Remaining services */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {remainingServices.map((service, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full flex flex-col rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} mix-blend-multiply opacity-90 z-10`}></div>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        // Fallback image for specific services
                        const target = e.target as HTMLImageElement;
                        if (service.title === "WhatsApp Marketing") {
                          target.src = "https://placehold.co/600x400/25D366/FFFFFF?text=WhatsApp+Marketing";
                        } else if (service.title === "Video Editing") {
                          target.src = "https://placehold.co/600x400/FF5722/FFFFFF?text=Video+Editing";
                        } else {
                          target.src = "https://placehold.co/600x400/3B82F6/FFFFFF?text=Service+Image";
                        }
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg bg-white/20 backdrop-blur-md`}>
                          {service.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>

                    <div className="mb-6">
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Button Section */}
                  <div className="px-6 pb-6 mt-auto">
                    <Link
                      to={`/services/${service.slug}`}
                      className={cn(
                        "w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center",
                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gradient-to-r hover:text-white",
                        service.color
                      )}
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section - New addition */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our AI Marketing Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A streamlined approach to implementing cutting-edge AI solutions for your marketing needs.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>

              {/* Process steps */}
              {[
                {
                  title: "Discovery & Analysis",
                  description: "We begin by analyzing your current marketing strategies and identifying key areas for AI implementation.",
                  icon: "🔍"
                },
                {
                  title: "Strategy Development",
                  description: "Our team develops a tailored AI strategy aligned with your business goals and marketing objectives.",
                  icon: "📝"
                },
                {
                  title: "Implementation",
                  description: "We implement AI-driven solutions across your marketing channels, with careful monitoring and optimization.",
                  icon: "⚙️"
                },
                {
                  title: "Testing & Optimization",
                  description: "Continuous testing and refinement ensure optimal performance and maximum marketing ROI.",
                  icon: "📊"
                },
                {
                  title: "Scaling & Growth",
                  description: "As results improve, we scale successful strategies and explore new AI applications for your marketing.",
                  icon: "📈"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.7,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    }
                  }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-md`}>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </div>

                  <div className="w-8 flex-shrink-0 relative flex items-center justify-center">
                    <div className="absolute w-10 h-10 rounded-full bg-white border-4 border-blue-500 z-10 flex items-center justify-center text-xl">
                      {step.icon}
                    </div>
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with glass morphism effect */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90"></div>

        {/* Glass morphism background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <div className="text-center">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  Contact Us for Our Services
                </motion.h2>

                <motion.p
                  className="text-xl text-white/90 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Ready to elevate your business with our digital marketing solutions? Get in touch with us today to discuss your requirements.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="inline-flex items-center px-8 py-4 bg-white rounded-lg text-blue-700 font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    Contact Us for Our Services
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <GetInTouchModal onClose={() => setShowContactModal(false)} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Services; 