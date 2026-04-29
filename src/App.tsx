import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import logo from './assets/logo.png';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import applyPerformanceOptimizations from './performance';

// Components
import Layout from './components/Layout';
import ThemeProvider, { useTheme } from './components/ThemeProvider';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import PricingDemo from './pages/PricingDemo';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import FaqPage from './pages/Faq';
import PaymentTest from './pages/PaymentTest';
import ServiceDetail from './pages/ServiceDetail';
import Newsletter from './pages/Newsletter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Premium Loading Animation

const LoadingFallback = () => (
  <div className="fixed inset-0 bg-white dark:bg-gray-950 z-50 flex flex-col items-center justify-center overflow-hidden">
    {/* Abstract Background Shapes */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>

    <div className="relative z-10 flex flex-col items-center">
      {/* Logo Container with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-8 p-8 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <motion.img
          src={logo}
          alt="Tech Tycoon"
          className="w-20 h-20 object-contain"
          animate={{
            rotate: 360,
            filter: ["drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))", "drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))", "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))"]
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>

      {/* Text Reveal */}
      <div className="flex flex-col items-center gap-3">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Tech Tycoon
        </motion.h2>

        {/* Modern Pill Loader */}
        <div className="w-48 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

// Lazy load page components
const HomeLazy = lazy(() => import('./pages/Home'));
const AboutLazy = lazy(() => import('./pages/About'));
const ServicesLazy = lazy(() => import('./pages/Services'));
const ServiceDetailLazy = lazy(() => import('./pages/ServiceDetail'));
const CoursesLazy = lazy(() => import('./pages/Courses'));
const CourseDetailsLazy = lazy(() => import('./pages/CourseDetails'));
const NewsletterLazy = lazy(() => import('./pages/Newsletter'));

// Custom component to conditionally render WhatsAppButton
const ConditionalWhatsAppButton = () => {
  const location = useLocation();
  const path = location.pathname;

  // Don't show WhatsApp button on courses or course details pages
  if (path === '/courses' || path.startsWith('/courses/')) {
    return null;
  }

  return <WhatsAppButton />;
};

// Main App wrapper that handles all routes
function AppContent() {
  const { resolvedTheme } = useTheme();

  // Update meta theme color based on current theme
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', resolvedTheme === 'dark' ? '#172554' : '#eff6ff'); // Dark blue-950 : Blue-50
    }
  }, [resolvedTheme]);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <main className="flex-grow">
            <Routes>
              {/* Home page - special case with no footer */}
              <Route path="/" element={
                <Layout includeFooter={false}>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <HomeLazy />
                  </motion.div>
                </Layout>
              } />

              {/* Standard pages with shared layout */}
              <Route path="/services" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <ServicesLazy />
                  </motion.div>
                </Layout>
              } />

              {/* Service Detail Page */}
              <Route path="/services/:serviceSlug" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <ServiceDetailLazy />
                  </motion.div>
                </Layout>
              } />

              <Route path="/about" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <AboutLazy />
                  </motion.div>
                </Layout>
              } />

              {/* PricingDemo has its own layout */}
              <Route path="/pricing-demo" element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <PricingDemo />
                </motion.div>
              } />

              {/* Courses page */}
              <Route path="/courses" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <CoursesLazy />
                  </motion.div>
                </Layout>
              } />

              {/* Course Details page */}
              <Route path="/courses/:courseId" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <CourseDetailsLazy />
                  </motion.div>
                </Layout>
              } />

              {/* FAQ page */}
              <Route path="/faq" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <FaqPage />
                  </motion.div>
                </Layout>
              } />

              {/* Newsletter page */}
              <Route path="/newsletter" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <NewsletterLazy />
                  </motion.div>
                </Layout>
              } />

              {/* Payment Test page */}
              <Route path="/payment-test" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <PaymentTest />
                  </motion.div>
                </Layout>
              } />

              {/* Privacy Policy page */}
              <Route path="/privacy-policy" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <PrivacyPolicy />
                  </motion.div>
                </Layout>
              } />

              {/* Terms of Service page */}
              <Route path="/terms-of-service" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <TermsOfService />
                  </motion.div>
                </Layout>
              } />

              {/* Cookie Policy page */}
              <Route path="/cookie-policy" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <CookiePolicy />
                  </motion.div>
                </Layout>
              } />

              {/* Catch-all 404 route */}
              <Route path="*" element={
                <Layout>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    className="pt-28 pb-16 text-center min-h-[80vh] flex items-center justify-center"
                  >
                    <div className="glass-card max-w-xl mx-auto">
                      <div className="relative mb-8">
                        <h1 className="text-6xl font-bold text-blue-600/20 animate-pulse-slow">404</h1>
                        <h2 className="text-3xl font-bold mb-4 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          Page Not Found
                        </h2>
                      </div>
                      <p className="text-blue-800 dark:text-blue-200 mb-6">
                        Sorry, we couldn't find the page you're looking for.
                      </p>
                      <motion.a
                        href="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-full inline-block transition-colors duration-300 btn-hover-effect"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Go Home
                      </motion.a>
                    </div>
                  </motion.div>
                </Layout>
              } />
            </Routes>
          </main>
        </Suspense>
      </div>

      {/* WhatsApp button visible on all pages */}
      <ConditionalWhatsAppButton />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// Apply performance optimizations
if (typeof window !== 'undefined') {
  applyPerformanceOptimizations();
}

export default App;
