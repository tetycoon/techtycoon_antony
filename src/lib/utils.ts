import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs));
} 