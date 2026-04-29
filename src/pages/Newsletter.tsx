import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import GetInTouchModal from '../components/GetInTouchModal';
import { createPortal } from 'react-dom';

// Import images from the Newsletter folder
import rathinamImg1 from '../assets/Newsletter/Rathinam College/IMG-20250113-WA0001.jpg';
import rathinamImg2 from '../assets/Newsletter/Rathinam College/IMG-20250113-WA0002.jpg';
import rathinamImg3 from '../assets/Newsletter/Rathinam College/IMG-20250113-WA0003.jpg';

import simpsonImg1 from '../assets/Newsletter/Simpson/WhatsApp Image 2025-04-29 at 23.09.28_4c0913f7.jpg';
import simpsonImg2 from '../assets/Newsletter/Simpson/WhatsApp Image 2025-04-29 at 23.09.29_79ed8a98.jpg';
import simpsonImg3 from '../assets/Newsletter/Simpson/WhatsApp Image 2025-04-29 at 23.09.30_1530f658.jpg';

import tagroeImg1 from '../assets/Newsletter/Tagroe Medical College/IMG-20250321-WA0004.jpg';
import tagroeImg2 from '../assets/Newsletter/Tagroe Medical College/IMG-20250321-WA0008.jpg';
import tagroeImg3 from '../assets/Newsletter/Tagroe Medical College/IMG-20250321-WA0010.jpg';

import torreyImg1 from '../assets/Newsletter/torrey a japanese company/WhatsApp Image 2025-11-20 at 18.35.40_9c583a8c.jpg';
import krishnaImg1 from "../assets/Newsletter/krishna swamy women's college/WhatsApp Image 2025-07-04 at 10.13.33_f604e68e.jpg";
import vidyaImg1 from '../assets/Newsletter/FDP Program at Vidya Sagar/20250628_120434.jpg';
import keralaImg1 from '../assets/Newsletter/training at kerala/WhatsApp Image 2025-06-17 at 10.38.38_d4578834.jpg';
import mmaImg1 from '../assets/Newsletter/cofacilaor at MMA/WhatsApp Image 2025-05-23 at 18.50.22_0673c820.jpg';
import vitImg1 from '../assets/Newsletter/VIT/IMG_1252.jpg';
import periyarImg1 from '../assets/Newsletter/periyar college/IMG_3609.jpg';

interface CollegeActivity {
  id: number;
  college: string;
  title: string;
  date: string;
  description: React.ReactNode;
  images: string[];
  location: string;
  participants: string;
}

const collegeActivities: CollegeActivity[] = [
  {
    id: 10,
    college: "AON",
    title: "Metric Maven Digital Marketing Workshop",
    date: "November 20 & 21, 2025",
    description: (
      <>
        <p className="mb-4">
          AON successfully conducted a 2-day corporate training program titled “Metric Maven” on 20 & 21 November 2025 at the Bengaluru office. The workshop was delivered by Mr. Antony Praveen, Digital Marketing & AI Trainer, and brought together 60 enthusiastic participants from various teams.
          The objective of the program was to help employees strengthen their understanding of digital marketing metrics, customer behavior, and performance-driven strategies. The sessions covered key topics such as SEO, SEM, Social Media Marketing, Content Marketing, Email Marketing, Web Analytics (GA4), Lead Nurturing, and Sales Funnel Management. Participants also explored practical tools for analytics, automation, and campaign optimization.
        </p>
        <p className="mb-4">
          The training followed an engaging and interactive format with real-world examples, activities, case discussions, and tool demonstrations. Employees appreciated the practical approach and shared highly positive feedback, noting that the sessions were insightful, well-structured, and directly applicable to their work.
        </p>
        <p>
          Overall, the Metric Maven workshop successfully enhanced participants’ digital capabilities and equipped them with actionable strategies to implement in their ongoing business operations. AON continues to invest in upskilling its workforce, reinforcing its commitment to innovation, digital transformation, and continuous learning.
        </p>
      </>
    ),
    images: [torreyImg1],
    location: "AON, Bengaluru",
    participants: "60 enthusiastic participants"
  },
  {
    id: 9,
    college: "Krishna Swamy Women’s College",
    title: "AI Career Pathfinder Bootcamp",
    date: "July 4, 2025",
    description: (
      <>
        <p className="mb-4">
          We launched a women-in-tech pathway that helps final-year learners navigate AI-first roles. The session combined
          mentorship circles, live portfolio critiques, and a fast track on responsible AI practices for marketers and HR grads.
        </p>
        <p>
          Students left with action plans, curated toolkits, and project prompts they can showcase during campus placements.
        </p>
      </>
    ),
    images: [krishnaImg1],
    location: "Krishna Swamy Women’s College, Chennai",
    participants: "120 undergraduate learners"
  },
  {
    id: 8,
    college: "Vidya Sagar College",
    title: "Faculty Development Program on Generative AI",
    date: "June 28, 2025",
    description: (
      <>
        <p className="mb-4">
          This FDP empowered professors to embed GenAI workflows into their lesson plans. From rubric creation to lab
          simulations, we demonstrated how faculty can save prep time while keeping assessments authentic.
        </p>
        <p>
          The cohort co-created five AI-enabled course blueprints that will go live in the upcoming semester.
        </p>
      </>
    ),
    images: [vidyaImg1],
    location: "Vidya Sagar College, Chennai",
    participants: "42 faculty members"
  },
  {
    id: 7,
    college: "Kerala Technology Training",
    title: "AI Productivity Retreat",
    date: "June 17, 2025",
    description: (
      <>
        <p className="mb-4">
          Hosted in Kochi, this retreat focused on sustainability startups that want to modernize operations with AI copilots.
          Teams prototyped investor dashboards, auto-generated marketing assets, and co-built policy guardrails for data use.
        </p>
        <p>
          Every founder left with a personalized 30-60-90 adoption blueprint mapped to their product roadmap.
        </p>
      </>
    ),
    images: [keralaImg1],
    location: "Kochi, Kerala",
    participants: "25 climate-tech founders"
  },
  {
    id: 6,
    college: "MMA Cofacilitator Program",
    title: "Executive Communication with AI",
    date: "May 23, 2025",
    description: (
      <>
        <p className="mb-4">
          As part of MMA&apos;s leadership circle, we co-facilitated a lab on using AI to craft investor narratives, strategy
          briefs, and policy responses in minutes. Business heads practiced blending data storytelling with on-brand voice.
        </p>
        <p>
          The highlight was a rapid-fire simulation where each CXO deployed AI copilots to respond to market-moving scenarios.
        </p>
      </>
    ),
    images: [mmaImg1],
    location: "Madras Management Association, Chennai",
    participants: "30 CXOs and business heads"
  },
  {
    id: 5,
    college: "VIT University",
    title: "Future Skills Design Lab",
    date: "May 15, 2025",
    description: (
      <>
        <p className="mb-4">
          VIT invited us to run a design lab that stitches together AI, design thinking, and entrepreneurial finance.
          Multidisciplinary teams reimagined campus services with AI copilots and pitched full-stack MVPs by the end of day.
        </p>
        <p>
          The winning squad built an AI concierge for the placement cell, now being piloted with the career services team.
        </p>
      </>
    ),
    images: [vitImg1],
    location: "VIT, Vellore",
    participants: "80 engineering & management students"
  },
  {
    id: 4,
    college: "Periyar College",
    title: "AI-Ready Curriculum Sprint",
    date: "May 5, 2025",
    description: (
      <>
        <p className="mb-4">
          Periyar College partnered with us to refresh their curriculum for the NEP-aligned academic year. We mapped every
          department&apos;s outcomes to AI use-cases and co-authored lab assignments that deliver measurable skill outcomes.
        </p>
        <p>
          Department heads received playbooks covering assessment rubrics, tooling stacks, and accreditation-friendly metrics.
        </p>
      </>
    ),
    images: [periyarImg1],
    location: "Periyar College of Arts & Science, Trichy",
    participants: "Heads of 12 departments"
  },
  {
    id: 3,
    college: "Rathinam College",
    title: "DM WITH AI: EMPOWERING FUTURE MARKETERS",
    date: "January 13, 2025",
    description: (
      <>
        <p className="mb-4">
          We are excited to share the successful completion of a five-day seminar on Digital Marketing with Artificial
          Intelligence (DM with AI), conducted for the enthusiastic students of Rathinam College, Coimbatore.
        </p>
        <p className="mb-4">
          The session welcomed over 60+ participants who were eager to explore the evolving landscape of digital marketing.
          While the original topic focused on digital marketing fundamentals, the program was thoughtfully upgraded to
          incorporate Artificial Intelligence (AI)—reflecting the current market trends and future demands of the industry.
        </p>
        <div className="mb-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🎓 What the Seminar Covered:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Foundations of Digital Marketing: SEO, social media, email marketing, and content strategy</li>
            <li>AI-Powered Tools and Trends: Smart automation, customer analytics, AI-generated content</li>
            <li>Real-World Applications: Case studies and examples of AI enhancing marketing strategies</li>
            <li>Hands-on Demonstrations: Practical exposure to tools that marketers use today</li>
          </ul>
        </div>
        <p>
          The engagement, energy, and curiosity of the students made it an awesome and memorable experience.
          Their openness to innovation and digital transformation was truly inspiring.
        </p>
      </>
    ),
    images: [rathinamImg1, rathinamImg2, rathinamImg3],
    location: "Rathinam College, Coimbatore",
    participants: "60+ marketing students"
  },
  {
    id: 2,
    college: "Simpson Company",
    title: "AI-POWERED ADVANCED POWERPOINT TRAINING",
    date: "April 29, 2025",
    description: (
      <>
        <p className="mb-4">
          We are thrilled to share the successful completion of an AI-Powered Advanced PowerPoint Training Session
          conducted for the dedicated employees of Simpson Sembiam Huzur Garden.
        </p>
        <p className="mb-4">
          Held as part of our corporate upskilling initiative, this hands-on training brought together 22 enthusiastic
          participants from multiple units within the organization. The session was carefully crafted to enhance
          productivity, boost creativity, and empower participants with smarter presentation skills.
        </p>
        <div className="mb-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🔍 Session Highlights:</h4>
          <p className="font-medium mb-1">Morning Session – Mastering Advanced PowerPoint Techniques:</p>
          <p className="mb-2">
            Participants explored a wide range of advanced PowerPoint features aimed at enhancing their presentation
            design and communication efficiency. From slide mastery to dynamic transitions, the session was packed
            with powerful tools and tips.
          </p>
          <p className="font-medium mb-1">Afternoon Session – Integrating AI & Smart Tools:</p>
          <p className="mb-2">
            The second half focused on incorporating AI tools, productivity add-ins, innovative websites, and
            time-saving hacks. These digital enhancements were introduced to help professionals streamline their
            workflow and deliver more impactful content effortlessly.
          </p>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🎤 Practical Application:</h4>
          <p>
            As a wrap-up activity, every participant was challenged to create and present a 3-minute presentation
            applying the skills they had just learned. The creativity, confidence, and practical application shown
            by the team were truly commendable and inspiring.
          </p>
        </div>
      </>
    ),
    images: [simpsonImg1, simpsonImg2, simpsonImg3],
    location: "Simpson Sembiam Huzur Garden, Chennai",
    participants: "22 professionals from multiple departments"
  },
  {
    id: 1,
    college: "Tagore Medical College",
    title: "DIGITAL DENTISTRY: TRANSFORMING THE FUTURE OF ORAL HEALTHCARE",
    date: "March 21, 2025",
    description: (
      <>
        <p className="mb-4">
          Tech Tycoon Digital Solution LLP was proud to deliver an insightful and future-focused session at
          Tagore Medical College, Chennai, for a vibrant group of 70 aspiring dental students. Originally
          planned as a session on "Computer Literacy," the session was rebranded to "Digital Dentistry" to
          better reflect the evolving needs of the dental industry in today's digital era.
        </p>
        <div className="mb-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🎯 Session Focus:</h4>
          <p className="mb-2">
            The one-hour interactive session explored the powerful intersection of Artificial Intelligence (AI)
            and Digital Media in dentistry. The aim was to equip future dentists with a forward-thinking
            perspective on how digital tools are reshaping oral healthcare.
          </p>
          <p className="mb-1">Key topics covered included:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>AI-Powered Diagnostic Tools: Enhancing precision in diagnosis and treatment planning</li>
            <li>3D Printing in Dentistry: Revolutionizing prosthetics and dental restoration</li>
            <li>Digital Patient Management Systems: Streamlining clinical operations</li>
            <li>Digital Marketing for Dentists: Strategies for building an online brand and attracting patients in the digital age</li>
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">💬 Interactive Engagement:</h4>
          <p>
            The session sparked active participation, with students engaging in thought-provoking discussions
            on the latest technological advancements and their real-world applications. Their curiosity and
            enthusiasm highlighted a growing awareness of the importance of digital integration in dentistry.
          </p>
        </div>
      </>
    ),
    images: [tagroeImg1, tagroeImg2, tagroeImg3],
    location: "Tagore Medical College, Chennai",
    participants: "70 dental students"
  }
];

interface ImageLightboxProps {
  image: string;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ image, onClose }) => {
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        className="relative w-[min(90vw,1100px)] max-h-[90vh] rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-white/20 dark:border-gray-800 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/90 hover:text-white transition-colors"
          aria-label="Close image preview"
        >
          <FaTimes size={26} />
        </button>

        <div className="p-4 sm:p-6">
          <img
            src={image}
            alt="Full size preview"
            className="w-full h-full max-h-[80vh] object-contain rounded-2xl"
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const Newsletter: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/10 rounded-full filter blur-3xl"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
            Tech Tycoon Digital Solution LLP Outreach
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            WorkShops at Colleges & Corporates
          </h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Empowering the next generation through educational workshops and training programs across colleges and corporates in India.
          </p>
        </motion.div>

        {/* College Activities */}
        <div className="space-y-20">
          {collegeActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Images Section */}
                <div
                  className="relative h-80 lg:h-auto overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(activity.images[0])}
                >
                  <img
                    src={activity.images[0]}
                    alt={`${activity.college}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent pointer-events-none"></div>
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                      {activity.college}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activity.title}</h2>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-2">{activity.date}</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="text-gray-600 dark:text-gray-300 prose prose-blue dark:prose-invert">
                      {activity.description}
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{activity.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{activity.participants}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-blue-600 dark:text-blue-400 font-medium italic">
                      "At Tech Tycoon Digital Solution LLP, we believe in bridging education with real-world innovation.
                      This initiative reflects our mission to prepare the next generation with future-ready skills."
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                      – Antony Praveen, Founder
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Decorative shapes */}
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-xl"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <h2 className="text-3xl font-bold mb-4">Bring AI education to your institution and Corporate</h2>
              <p className="text-white/90 mb-6">
                We offer specialized workshops, seminars, and training programs tailored to various academic disciplines. Contact us to organize an AI workshop at your college or university.
              </p>
              <button
                onClick={() => setShowContactModal(true)}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Contact Us for Our Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <div className="hidden md:block">
              <img
                src={rathinamImg1}
                alt="College Workshop"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ height: "300px" }}
              />
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
          )}
        </AnimatePresence>

        {/* Get In Touch Modal */}
        <AnimatePresence>
          {showContactModal && (
            <GetInTouchModal onClose={() => setShowContactModal(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Newsletter;