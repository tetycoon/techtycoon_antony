import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import service data
import { allServices } from '../services/serviceData';

const ServiceDetail: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);

    // Find the service by slug
    const foundService = allServices.find(s =>
      s.slug === serviceSlug
    );

    setService(foundService || null);
    setLoading(false);
  }, [serviceSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Service Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the service you're looking for.</p>
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-90 z-0`}></div>

        {/* Abstract background shapes */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Link
                to="/services"
                className="inline-flex items-center text-white hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Services
              </Link>
            </motion.div>

            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                {service.icon}
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {service.title}
            </motion.h1>

            <motion.p
              className="text-xl text-white mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {service.description}
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Key Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's how our {service.title.toLowerCase()} service can benefit your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {service.benefits.map((benefit: string, index: number) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r ${service.color} text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit}</h3>
                <p className="text-gray-600">
                  Our expert team leverages cutting-edge technology to deliver exceptional results in this area.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven methodology for delivering exceptional {service.title.toLowerCase()} services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                title: "Discovery & Assessment",
                description: "We begin with a thorough assessment of your current situation and specific needs related to " + service.title.toLowerCase() + "."
              },
              {
                title: "Strategy Development",
                description: "Our experts create a customized strategy tailored to your goals and business requirements."
              },
              {
                title: "Implementation",
                description: "We implement the solutions using cutting-edge technologies and industry best practices."
              },
              {
                title: "Monitoring & Optimization",
                description: "Continuous monitoring ensures optimal performance and results from your " + service.title.toLowerCase() + " investment."
              },
              {
                title: "Reporting & Analysis",
                description: "Comprehensive reporting provides clear insights into performance and return on investment."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex mb-8 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {index < 4 && (
                  <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200 z-0"></div>
                )}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${service.color} text-white font-bold text-lg z-10 flex-shrink-0`}>
                  {index + 1}
                </div>
                <div className="ml-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Get started with our professional {service.title.toLowerCase()} services today and see the difference it can make for your business.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/services"
                  className="py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-shadow"
                >
                  Explore Other Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;