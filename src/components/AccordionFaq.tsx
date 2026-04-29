import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { fadeIn, slideUp } from '../lib/design-system';

// FAQ item type
interface FaqItem {
  question: string;
  answer: React.ReactNode;
  id: string;
}

// Individual accordion item component
const AccordionItem: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ item, isOpen, onToggle, index }) => {
  // Animation variants
  const iconVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 }
  };

  return (
    <motion.div 
      className={cn(
        "border-b border-gray-200 dark:border-gray-800 last:border-0",
        "transition-colors duration-200"
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between py-5 px-1 text-left transition-all",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "hover:text-blue-600 dark:hover:text-blue-400"
        )}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${item.id}`}
        id={`faq-button-${item.id}`}
      >
        <h3 className="text-lg font-medium pr-8">{item.question}</h3>
        <motion.div
          variants={iconVariants}
          animate={isOpen ? "open" : "closed"}
          className="flex-shrink-0 h-6 w-6 text-blue-500 dark:text-blue-400"
          aria-hidden="true"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-content-${item.id}`}
            aria-labelledby={`faq-button-${item.id}`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 px-1 text-gray-600 dark:text-gray-300 leading-relaxed">
              {typeof item.answer === 'string' ? (
                <p>{item.answer}</p>
              ) : (
                item.answer
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface AccordionFaqProps {
  items: FaqItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

const AccordionFaq: React.FC<AccordionFaqProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(id) ? [] : [id]
      );
    }
  };

  return (
    <div 
      className={cn("w-full max-w-3xl mx-auto", className)}
      aria-label="Frequently Asked Questions"
    >
      <div className="divide-y divide-gray-200 dark:divide-gray-800 rounded-lg bg-white dark:bg-gray-800/50 shadow-md">
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openItems.includes(item.id)}
            onToggle={() => handleToggle(item.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default AccordionFaq; 