import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  // State to track which mobile sections are expanded
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    quickLinks: false,
    services: false,
    contactInfo: false
  });

  // Toggle section expansion for mobile view
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer id="footer" className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-20 pb-10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]"></div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-2 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-sm">
                  <img
                    src={logo}
                    alt="Tech Tycoon Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap pr-3">Tech Tycoon</span>
                <span className="text-xs text-gray-400 whitespace-nowrap pr-2">Digital Solutions</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm max-w-xs">
              AI-DRIVEN. HUMAN-CENTERED.
            </p>
            <div className="flex flex-wrap space-x-3 mb-6">
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors p-2.5 sm:p-2.5 rounded-full bg-gray-800/50 hover:bg-blue-500/20 backdrop-blur-sm border border-gray-700/50 mb-2"
                  whileHover={{ y: -3, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="w-5 h-5 sm:w-4 sm:h-4">
                    {item.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links - With mobile accordion */}
          <div>
            <button
              onClick={() => toggleSection('quickLinks')}
              className="text-lg font-semibold mb-4 sm:mb-6 relative inline-flex items-center sm:block w-full sm:w-auto"
            >
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap pr-3">Quick Links</span>
              <motion.span
                className="hidden sm:block absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '3rem' }}
                transition={{ delay: 0.2, duration: 0.5 }}
              ></motion.span>

              {/* Mobile dropdown indicator */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-auto text-gray-400 sm:hidden transition-transform duration-300"
                style={{ transform: expandedSections.quickLinks ? 'rotate(180deg)' : 'rotate(0deg)' }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <AnimatePresence>
              <motion.ul
                className={`space-y-3 ${expandedSections.quickLinks ? '' : 'hidden sm:block'}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  display: 'block'
                }}
                transition={{ duration: 0.3 }}
              >
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="whitespace-nowrap pr-2">{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          {/* Services - With mobile accordion */}
          <div>
            <button
              onClick={() => toggleSection('services')}
              className="text-lg font-semibold mb-4 sm:mb-6 relative inline-flex items-center sm:block w-full sm:w-auto"
            >
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap pr-3">Our Services</span>
              <motion.span
                className="hidden sm:block absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '3rem' }}
                transition={{ delay: 0.3, duration: 0.5 }}
              ></motion.span>

              {/* Mobile dropdown indicator */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-auto text-gray-400 sm:hidden transition-transform duration-300"
                style={{ transform: expandedSections.services ? 'rotate(180deg)' : 'rotate(0deg)' }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <AnimatePresence>
              <motion.ul
                className={`space-y-3 ${expandedSections.services ? '' : 'hidden sm:block'}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  display: 'block'
                }}
                transition={{ duration: 0.3 }}
              >
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.4 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link to={service.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="whitespace-nowrap pr-2">{service.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          {/* Contact Info - With mobile accordion */}
          <div>
            <button
              onClick={() => toggleSection('contactInfo')}
              className="text-lg font-semibold mb-4 sm:mb-6 relative inline-flex items-center sm:block w-full sm:w-auto"
            >
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap pr-3">Contact Us</span>
              <motion.span
                className="hidden sm:block absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '3rem' }}
                transition={{ delay: 0.4, duration: 0.5 }}
              ></motion.span>

              {/* Mobile dropdown indicator */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-auto text-gray-400 sm:hidden transition-transform duration-300"
                style={{ transform: expandedSections.contactInfo ? 'rotate(180deg)' : 'rotate(0deg)' }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <AnimatePresence>
              <motion.ul
                className={`space-y-4 ${expandedSections.contactInfo ? '' : 'hidden sm:block'}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  display: 'block'
                }}
                transition={{ duration: 0.3 }}
              >
                {contactInfo.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 p-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-lg text-blue-400">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      {item.label && <div className="text-xs text-gray-500 mb-0.5 whitespace-nowrap pr-2">{item.label}</div>}
                      <a href={item.href} className="text-gray-400 hover:text-white transition-colors text-sm break-words pr-2">
                        {item.value}
                      </a>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800/50 text-center text-gray-500 text-sm">
          <p className="whitespace-nowrap">© {currentYear} Tech Tycoon. All rights reserved.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social media links data
const socialLinks = [
  {
    href: "https://www.facebook.com/share/1BuHNrPi6j/",
    label: "Facebook",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
      </svg>
    )
  },
  {
    href: "https://x.com/techtycoon_3?t=ofDeo-cv11F9rNxgwCBihw&s=09",
    label: "X (formerly Twitter)",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
      </svg>
    )
  },
  {
    href: "https://www.instagram.com/techtycoon_digitalsolutions?igsh=MWM4bXVmdnhyY210cA==",
    label: "Instagram",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
      </svg>
    )
  },
  {
    href: "https://www.linkedin.com/company/tech-tycoon-digital-solutions/?viewAsMember=true",
    label: "LinkedIn",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
      </svg>
    )
  },
  {
    href: "https://youtube.com/@techtycoon_digitalsolutions?si=XqY4uc2cMkbgw0Ik",
    label: "YouTube",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
      </svg>
    )
  },
  {
    href: "https://whatsapp.com/channel/0029VbABrzBH5JM0FIG97q2b",
    label: "WhatsApp Channel",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
      </svg>
    )
  }
];

// Quick links data
const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/courses", label: "Courses" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" }
];

// Services data
const services = [
  { href: "/services/content-marketing", label: "Content Marketing" },
  { href: "/services/social-media-marketing", label: "Social Media Marketing" },
  { href: "/services/seo-optimization", label: "SEO Optimization" },
  { href: "/services/website-development", label: "Website Development" },
  { href: "/services/video-editing", label: "Video Editing" }
];

// Contact info data
const contactInfo = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    label: "Address",
    value: "Meenakshi flat, Ground floor, Sivasubramaniam Street, Ramalingam Nagar, Madipakkam, Chennai - 600091",
    href: "https://goo.gl/maps/YrpzJcGcnjXa9d4W6"
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
      </svg>
    ),
    label: "Phone",
    value: "+917558133039",
    href: "tel:+917558133039"
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    label: "Email",
    value: "techtycoondigitalsolutions@gmail.com",
    href: "mailto:techtycoondigitalsolutions@gmail.com"
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    label: "Business Hours",
    value: "Mon - Sat: 9:00 AM - 7:00 PM",
    href: "#"
  }
];

export default Footer; 