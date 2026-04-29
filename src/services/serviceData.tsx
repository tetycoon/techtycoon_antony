import React from 'react';
import WhatsAppMarketing from '../assets/whatsappmark.jpeg';
import VideoEditing from '../assets/videoedi.jpeg';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image: string;
  benefits: string[];
  slug: string;
}

// First row services
export const firstRowServices: Service[] = [
  {
    title: "SEO Optimization",
    description: "Leverage AI to analyze search patterns, optimize content, and improve your website's visibility across search engines.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: "from-blue-400 to-blue-600",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2574&auto=format&fit=crop",
    benefits: [
      "Improved organic search rankings",
      "Data-driven keyword optimization",
      "AI-powered content recommendations"
    ],
    slug: "seo-optimization"
  },
  {
    title: "Social Media Marketing",
    description: "Use AI tools to create engaging content, schedule posts intelligently, and analyze performance to maximize social media impact.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    color: "from-purple-400 to-purple-600",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop",
    benefits: [
      "Automated content scheduling",
      "AI-generated post optimization",
      "Detailed performance analytics"
    ],
    slug: "social-media-marketing"
  },
  {
    title: "WhatsApp Marketing",
    description: "Harness AI-powered WhatsApp marketing campaigns to engage customers with personalized messaging and automated responses.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: "from-green-400 to-green-600",
    image: WhatsAppMarketing,
    benefits: [
      "Automated customer interactions",
      "Personalized messaging at scale",
      "Chatbot integration for 24/7 support"
    ],
    slug: "whatsapp-marketing"
  },
  {
    title: "Social Media Optimization",
    description: "Optimize your social media presence to increase engagement, drive traffic, and improve conversion rates with data-driven strategies.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    color: "from-amber-400 to-amber-600",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2670&auto=format&fit=crop",
    benefits: [
      "Platform-specific optimization",
      "Engagement rate improvement",
      "Cross-platform content strategy"
    ],
    slug: "social-media-optimization"
  }
];

// Remaining services
export const remainingServices: Service[] = [
  {
    title: "Content Marketing",
    description: "Generate high-quality, SEO-optimized content with AI assistance that resonates with your target audience and drives conversions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: "from-indigo-400 to-indigo-600",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2670&auto=format&fit=crop",
    benefits: [
      "AI-written content creation",
      "Topic and trend detection",
      "Content performance tracking"
    ],
    slug: "content-marketing"
  },
  {
    title: "Email Campaigns",
    description: "Implement AI-driven email marketing strategies with personalized content, optimal send times, and predictive analytics.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-yellow-400 to-yellow-600",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
    benefits: [
      "Smart audience segmentation",
      "Dynamic content personalization",
      "Optimized send-time scheduling"
    ],
    slug: "email-campaigns"
  },
  {
    title: "Predictive Analytics",
    description: "Harness the power of AI to analyze customer data, predict trends, and make data-driven marketing decisions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-red-400 to-red-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    benefits: [
      "Customer behavior prediction",
      "Trend forecasting",
      "ROI optimization models"
    ],
    slug: "predictive-analytics"
  },
  {
    title: "Conversion Optimization",
    description: "Use AI to analyze user behavior, A/B test landing pages, and optimize conversion funnels for maximum results.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "from-pink-400 to-pink-600",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2670&auto=format&fit=crop",
    benefits: [
      "AI-powered A/B testing",
      "User journey optimization",
      "Funnel analysis and improvement"
    ],
    slug: "conversion-optimization"
  },
  {
    title: "Website Development",
    description: "Create stunning, responsive websites with modern technologies that provide exceptional user experiences and drive conversions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-cyan-400 to-cyan-600",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
    benefits: [
      "Custom, responsive designs",
      "Performance optimization",
      "SEO-friendly architecture"
    ],
    slug: "website-development"
  },
  {
    title: "Video Editing",
    description: "Transform raw footage into compelling visual stories with professional video editing that captures your audience's attention.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-orange-400 to-orange-600",
    image: VideoEditing,
    benefits: [
      "Professional color grading",
      "Seamless transitions",
      "Engaging special effects"
    ],
    slug: "video-editing"
  },
  {
    title: "Poster Designing",
    description: "Create eye-catching posters and visual assets that communicate your message effectively and leave a lasting impression.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-lime-400 to-lime-600",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2664&auto=format&fit=crop",
    benefits: [
      "Striking visual hierarchy",
      "Brand-aligned aesthetics",
      "High-resolution deliverables"
    ],
    slug: "poster-designing"
  },
  {
    title: "Profile/Resume Building",
    description: "Craft compelling professional profiles and resumes that highlight your strengths and help you stand out to potential employers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: "from-teal-400 to-teal-600",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop",
    benefits: [
      "ATS-optimized formatting",
      "Achievement-focused content",
      "Industry-tailored designs"
    ],
    slug: "profile-resume-building"
  },
  {
    title: "Branding",
    description: "Develop a cohesive brand identity that resonates with your target audience and sets you apart in a competitive marketplace.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    color: "from-fuchsia-400 to-fuchsia-600",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2670&auto=format&fit=crop",
    benefits: [
      "Comprehensive visual identity",
      "Consistent brand messaging",
      "Strategic brand positioning"
    ],
    slug: "branding"
  },
  {
    title: "Influencer Marketing",
    description: "Connect with relevant influencers to amplify your brand message and reach new audiences through authentic partnerships.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "from-violet-400 to-violet-600",
    image: "https://images.unsplash.com/photo-1579869847514-7c1a19d2d2ad?q=80&w=2671&auto=format&fit=crop",
    benefits: [
      "Strategic influencer selection",
      "Authentic content collaboration",
      "Performance-based campaigns"
    ],
    slug: "influencer-marketing"
  }
];

// Combine all services
export const allServices = [...firstRowServices, ...remainingServices]; 