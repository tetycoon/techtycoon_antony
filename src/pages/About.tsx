import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';

// Lazy load heavy components
const ContactForm = lazy(() => import('../components/ContactForm'));
const MissionStatement = lazy(() => import('../components/MissionStatement'));
const CoreValues = lazy(() => import('../components/CoreValues'));

// EmailJS Configuration (reuse from RegistrationForm)
const EMAILJS_CONFIG = {
  serviceId: 'service_q3q75bd',
  templateId: 'template_52sgt8p',
  publicKey: 'JPL083BhpGSElhQKd',
  adminEmail: 'techtycoondigitalsolutions@gmail.com'
};

const About: React.FC = () => {
  // Simplified animation variants with reduced duration
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  // Simplified container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });
  const formRef = useRef<HTMLFormElement>(null) as React.RefObject<HTMLFormElement>;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, isSubmitting: true, message: '' });

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          to_email: EMAILJS_CONFIG.adminEmail,
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: 'contact'
        },
        EMAILJS_CONFIG.publicKey
      );

      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: 'Thank you for your message! We will get back to you soon.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: 'Something went wrong. Please try again later.'
      });
    }
  };

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section - Simplified */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 z-0"></div>

        {/* Simplified background (fewer elements) */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm">
                About Tech Tycoon Digital Solution LLP
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              AI-Powered Marketing Experts
            </motion.h1>

            <motion.p
              className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              With 6+ years of experience in digital marketing, we're building towards the official establishment of Tech Tycoon Digital Solution LLP in 2025, dedicated to making cutting-edge AI marketing tools and strategies accessible to everyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <button
                onClick={() => {
                  const storySection = document.getElementById('our-story');
                  if (storySection) {
                    storySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 mr-4 transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 backdrop-blur-sm transition-colors border-white"
              >
                Get In Touch
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900 z-10"></div>
      </section>

      {/* Our Story Section - Simplified */}
      <section id="our-story" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              Our Journey in AI Marketing
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              With 6+ years of experience in digital marketing, we're building towards the official establishment of Tech Tycoon Digital Solution LLP in 2025, dedicated to making cutting-edge AI marketing tools and strategies accessible to everyone.
            </motion.p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                </div>
              </motion.div>

              <div className="space-y-4">
                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                >
                  Starting as a freelance consultant in 2018, our journey toward <span className="text-primary-500 dark:text-primary-400 font-semibold">Tech Tycoon</span> began with a vision to make AI marketing tools accessible to everyone.
                </motion.p>

                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                >
                  We noticed that small and medium businesses were being left behind due to the complexity and cost of AI implementation, which inspired our growth from basic marketing services to comprehensive AI solutions.
                </motion.p>

                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                >
                  Through years of evolution, our team has created comprehensive courses and services that break down complex AI concepts into practical strategies any business can implement, all leading to our 2025 vision of formally establishing Tech Tycoon.
                </motion.p>
              </div>
            </div>

            {/* Our Journey in Training Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 mt-24">
              <div className="space-y-4">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                >
                  Our Journey in Training
                </motion.h3>

                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                >
                  Since 2021, we've been passionate about democratizing AI education through comprehensive workshops and training programs. Our mission is to bridge the gap between complex AI technology and everyday business applications.
                </motion.p>

                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                >
                  Starting with small groups and individual consultations, we've now trained <span className="text-primary-500 dark:text-primary-400 font-semibold">thousands of professionals</span> through both online and offline workshops. Our courses cover everything from AI fundamentals to advanced applications in business, marketing, and automation.
                </motion.p>

                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                >
                  Each workshop is designed with practical, hands-on learning experiences that participants can immediately apply to their work. From unlocking AI secrets to mastering PowerBI, digital marketing, and business automation, our training programs are crafted to deliver real-world value at an accessible price point of just ₹99 per session.
                </motion.p>
              </div>

              <motion.div
                className="relative order-first md:order-last"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Training and Workshop"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl blur-2xl -z-10"></div>
              </motion.div>
            </div>

            {/* Timeline - Simplified with fewer animations */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>

              {[
                {
                  year: "2021",
                  title: "Started with Marketing and courses",
                  description: "Started with digital marketing and online courses as a freelance consultant."
                },
                {
                  year: "2022",
                  title: "client grew with our services",
                  description: "Expanded client base significantly and began developing specialized training programs."
                },
                {
                  year: "2023",
                  title: "Offline & Online Training",
                  description: "Launched comprehensive training programs in both offline and online formats, reaching hundreds of businesses."
                },
                {
                  year: "2024",
                  title: "AI-Powered Solutions",
                  description: "Integrated AI-powered tools to enhance marketing services and delivery capabilities."
                },
                {
                  year: "2025",
                  title: "Tech Tycoon Digital Solution LLP Founded",
                  description: "Officially established Tech Tycoon Digital Solution LLP as a company offering multiple AI-powered digital services."
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.4,
                        delay: index > 2 ? 0.1 : 0, // Only delay the first few items
                      }
                    }
                  }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className={`bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-md`}>
                      <div className="text-lg font-bold text-primary-500 dark:text-primary-400 mb-1">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="w-8 flex-shrink-0 relative flex items-center justify-center">
                    <div className="absolute w-8 h-8 rounded-full bg-white border-4 border-blue-500 z-10 flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement - Lazy loaded */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <MissionStatement />
      </Suspense>

      {/* Core Values - Lazy loaded */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <CoreValues />
      </Suspense>

      {/* CTA Section - Simplified */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl">
              <div className="text-center">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4 }}
                >
                  Join the AI Marketing Revolution
                </motion.h2>

                <motion.p
                  className="text-lg text-white/90 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  Our comprehensive courses make AI marketing accessible to everyone.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 backdrop-blur-sm transition-colors border-white"
              >
                Contact us
              </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Lazy loaded */}
      <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Get In Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about our AI marketing solutions? Fill out the form below.
            </p>
          </motion.div>

          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading contact form...</div>}>
            <ContactForm
              formRef={formRef}
              formData={formData}
              formStatus={formStatus}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default About; 