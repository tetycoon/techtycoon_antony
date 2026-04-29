import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/20/solid';

type PricingPeriod = 'monthly' | 'annual';

const Pricing: React.FC = () => {
  const [period, setPeriod] = useState<PricingPeriod>('monthly');

  const plans = [
    {
      name: 'Basic',
      desc: 'Perfect for students and beginners',
      price: period === 'monthly' ? 49 : 470,
      features: [
        'Full access to course content',
        'Community forum access',
        'Basic AI tools integration',
        'Certificate of completion',
        '3 practice projects'
      ],
      cta: 'Start Learning',
      highlighted: false
    },
    {
      name: 'Professional',
      desc: 'For serious marketers and small teams',
      price: period === 'monthly' ? 99 : 950,
      features: [
        'All Basic features',
        'Advanced AI marketing tools',
        'Personal mentor sessions (2/month)',
        'Real-world case studies access',
        'AI campaign templates',
        'Priority support'
      ],
      cta: 'Go Professional',
      highlighted: true
    },
    {
      name: 'Enterprise',
      desc: 'For marketing teams and agencies',
      price: period === 'monthly' ? 199 : 1990,
      features: [
        'All Professional features',
        'Team collaboration tools',
        'Weekly expert coaching calls',
        'Custom AI strategy development',
        'White-label AI marketing tools',
        'API access for custom integration',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Flexible Pricing for Every Marketing Professional
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose the plan that works best for your goals and budget.
            Save up to 20% with annual billing.
          </motion.p>
          
          <div className="mt-8 inline-flex items-center justify-center p-1 bg-gray-200 dark:bg-gray-700 rounded-full">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                period === 'monthly'
                  ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                period === 'annual'
                  ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setPeriod('annual')}
            >
              Annual <span className="text-primary dark:text-primary-400">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden shadow-lg ${
                plan.highlighted 
                  ? 'border-2 border-primary dark:border-primary-400' 
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 w-full text-center py-2 bg-primary dark:bg-primary-400 text-white text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`p-8 bg-white dark:bg-gray-800 ${plan.highlighted ? 'pt-12' : ''}`}>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-300">/{period === 'monthly' ? 'month' : 'year'}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start"
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={featureVariants}
                    >
                      <CheckIcon className="h-5 w-5 text-primary dark:text-primary-400 flex-shrink-0 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-primary hover:bg-primary-dark dark:bg-primary-400 dark:hover:bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-3xl mx-auto">
            All plans include access to our community forum, regular content updates, and basic email support.
            For enterprise solutions with custom needs, please <a href="#contact" className="text-primary dark:text-primary-400 hover:underline">contact our sales team</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 