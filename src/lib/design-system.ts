/**
 * Design System
 * 
 * Centralized export for all UI components, ensuring consistent usage across the app.
 * This eliminates confusion between basic and enhanced components by providing 
 * a single import source.
 */

// Enhanced UI Components (preferred)
export { Button, buttonVariants } from '../components/ui-enhanced/Button';
export { Card, CardHeader, CardContent, CardFooter } from '../components/ui-enhanced/Card';
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from '../components/ui-enhanced/Dialog';
export { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui-enhanced/Tabs';
export { PricingCard } from '../components/ui-enhanced/PricingCard';
export { Form, FormField, FormInput, FormLabel, FormMessage } from '../components/ui-enhanced/Form';

// Core UI Components 
export { ThemeToggle } from '../components/ui/ThemeToggle';
export { default as AcrylicBackground } from '../components/ui/AcrylicBackground';

// Layout Components
export { default as Layout } from '../components/Layout';

// A11y Helper Functions
export const a11yProps = (id: string) => ({
  role: 'tabpanel',
  id: `tabpanel-${id}`,
  'aria-labelledby': `tab-${id}`,
});

export const srOnly = 'sr-only';

// Animation presets
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.3 }
};

// Design tokens
export const tokens = {
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  elevation: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }
}; 