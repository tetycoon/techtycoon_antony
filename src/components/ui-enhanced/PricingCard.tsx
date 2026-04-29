import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './Card';
import { Button } from './Button';
import { CheckIcon } from '@heroicons/react/24/outline';

interface Feature {
  text: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: Feature[];
  ctaText: string;
  ctaAction?: () => void;
  headerColor?: string;
  popular?: boolean;
  className?: string;
}

export const PricingCard = ({ 
  title, 
  description, 
  price, 
  originalPrice,
  features, 
  ctaText, 
  ctaAction,
  headerColor = "bg-blue-600",
  popular = false,
  className
}: PricingCardProps) => {
  return (
    <Card 
      className={cn(
        "flex flex-col h-full", 
        popular ? "border-blue-500 shadow-lg shadow-blue-100 dark:shadow-none" : "border-gray-200",
        className
      )}
      radius="lg"
    >
      <div className={cn(
        "rounded-t-lg p-5 text-white", 
        headerColor
      )}>
        <CardTitle className="text-white text-xl mb-1">{title}</CardTitle>
        <CardDescription className="text-white/90">{description}</CardDescription>
      </div>
      
      <CardContent className="flex flex-col gap-5 pt-5 flex-grow">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{price}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm">{originalPrice}</span>
          )}
        </div>
        
        <ul className="space-y-3 flex-grow">
          {features.map((feature, index) => (
            <motion.li 
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CheckIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">{feature.text}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pb-5">
        <Button
          className="w-full"
          variant={popular ? "default" : "outline"}
          size="lg"
          onClick={ctaAction}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const PricingSection = () => {
  const pricingCards = [
    {
      title: "Unlock AI Secrets",
      description: "CERTIFIED SESSION",
      price: "Rs. 99/-",
      originalPrice: "Rs. 399/-",
      headerColor: "bg-blue-600",
      features: [
        { text: "The History, future and the Massive Influence of AI" },
        { text: "50 plus Hidden AI Tools" },
        { text: "AI Prompts (Prompt Engineering)" },
        { text: "Secret tips to mastering the use of AI" },
        { text: "Certified session" }
      ],
      ctaText: "Enroll Now",
      popular: false
    },
    {
      title: "Summer Special AI Bootcamp",
      description: "Future-Ready Skill",
      price: "",
      headerColor: "bg-blue-600",
      features: [
        { text: "For: Ages 13 years and above" },
        { text: "Ideal for: School and College going students" },
        { text: "Language: English only" },
        { text: "Date: 1st May 2025 - 31st May 2025" },
        { text: "Time: 9:00 AM to 11:00 AM (Monday to Friday)" },
        { text: "Venue: Online – Live Session" }
      ],
      ctaText: "Enroll Now",
      popular: true
    },
    {
      title: "AI Tycoon Community",
      description: "Continuous learning and growth",
      price: "NOW 4,999/-",
      originalPrice: "11,999/-",
      headerColor: "bg-blue-600",
      features: [
        { text: "Everyday 15-20 minutes Lives session introducing one AI Tool" },
        { text: "Sharing one Technology related News" },
        { text: "50% offer on all sessions conducted in the Future" },
        { text: "Secret way to get Canva Pro for Free" },
        { text: "Life time Membership to be part of our AI Tycoon Community" },
        { text: "Access to recordings if you miss the session for the day" },
        { text: "AI Related Materials for Free" }
      ],
      ctaText: "Enroll Now",
      popular: false
    }
  ];

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingCard
                title={card.title}
                description={card.description}
                price={card.price}
                originalPrice={card.originalPrice}
                features={card.features}
                ctaText={card.ctaText}
                headerColor={card.headerColor}
                popular={card.popular}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}; 